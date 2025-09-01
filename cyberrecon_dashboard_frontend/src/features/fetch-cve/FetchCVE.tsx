import React from "react";
import { useForm } from "react-hook-form";
import { useFetchCVE } from "../../lib/api";
import { useUIStore, CVEItem } from "../../state/store";
import Skeleton from "../../components/ui/Skeleton";
import { motion } from "framer-motion";
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, Tooltip, Scatter, ZAxis } from "recharts";

type FormValues = {
  query: string;
  severity: "ALL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
};

function severityColor(sev: CVEItem["severity"]) {
  switch (sev) {
    case "LOW":
      return "badge bg-zinc-700 text-zinc-200";
    case "MEDIUM":
      return "badge bg-warning/30 text-warning";
    case "HIGH":
      return "badge bg-info/30 text-info";
    case "CRITICAL":
      return "badge bg-danger/30 text-danger";
  }
}

function RiskMatrix({ data }: { data: CVEItem[] }) {
  const points = data.map((d) => ({
    x: d.score,
    y: ["LOW", "MEDIUM", "HIGH", "CRITICAL"].indexOf(d.severity) + 1,
    z: Math.max(1, Math.min(5, Math.round(d.score / 2))),
    id: d.id
  }));
  return (
    <div className="card p-4">
      <h3 className="font-medium mb-2">Threat Matrix</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis type="number" dataKey="x" name="CVSS" domain={[0, 10]} />
            <YAxis type="number" dataKey="y" name="Severity" ticks={[1,2,3,4]} tickFormatter={(v)=>["LOW","MEDIUM","HIGH","CRITICAL"][v-1]} domain={[0.5,4.5]} />
            <ZAxis type="number" dataKey="z" range={[60,180]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: any, name: any, props: any)=>[props.payload.id, name]} />
            <Scatter data={points} fill="rgb(var(--color-accent))" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function FetchCVE(): JSX.Element {
  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: { query: "", severity: "ALL" },
  });
  const query = watch("query");
  const severity = watch("severity");
  const { data, isLoading } = useFetchCVE(query);
  const setCVEs = useUIStore((s) => s.setCVEs);

  const filtered = (data ?? []).filter((c) => severity === "ALL" || c.severity === severity);

  const onSubmit = (values: FormValues) => {
    // in a real app, you might refetch or trigger param change
    setCVEs(filtered);
    console.log("Submitted", values);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
      <div className="space-y-4">
        <div className="card p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3">
            <input
              {...register("query")}
              placeholder="Search CVE, CWE, product..."
              className="input flex-1"
            />
            <select {...register("severity")} className="input">
              <option value="ALL">All severities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <button type="submit" className="btn btn-primary">Fetch</button>
          </form>
        </div>

        <div className="card p-4">
          <h3 className="font-medium mb-3">Results</h3>
          <div className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </>
            ) : filtered.length === 0 ? (
              <p className="text-muted text-sm">No results found.</p>
            ) : (
              filtered.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border rounded-lg p-3 bg-zinc-900/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-mono text-sm">{c.id}</span>
                      <span className="text-xs text-muted">{c.published}</span>
                    </div>
                    <span className={severityColor(c.severity)}>{c.severity}</span>
                  </div>
                  <p className="mt-2 text-sm">{c.description}</p>
                  <div className="mt-2 text-xs text-muted">
                    <span className="mr-3">Score: {c.score}</span>
                    {c.cwe && <span className="mr-3">CWE: {c.cwe}</span>}
                    {c.product && <span>Product: {c.product}</span>}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <RiskMatrix data={filtered} />
        <div className="card p-4">
          <h3 className="font-medium mb-2">Data Reception</h3>
          <p className="text-sm text-muted mb-2">Live progress of CVE fetch pipeline</p>
          <AutoProgress />
        </div>
      </div>
    </div>
  );
}

function AutoProgress() {
  const [val, setVal] = React.useState(5);
  React.useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 5 : v + 7)), 500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
      <motion.div
        className="h-full"
        style={{ backgroundColor: "rgb(var(--color-secondary))" }}
        animate={{ width: `${val}%` }}
        transition={{ type: "tween", duration: 0.45 }}
      />
    </div>
  );
}
