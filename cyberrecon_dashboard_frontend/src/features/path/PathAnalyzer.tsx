import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type TreeNode = {
  name: string;
  risk: number;
  children?: TreeNode[];
};

const sampleTree: TreeNode = {
  name: "Gateway",
  risk: 0.2,
  children: [
    { name: "DMZ", risk: 0.4, children: [{ name: "Web", risk: 0.6, children: [{ name: "DB", risk: 0.85 }] }] },
    { name: "VPN", risk: 0.3, children: [{ name: "Internal", risk: 0.5, children: [{ name: "Endpoint", risk: 0.65 }] }] },
  ],
};

function Flatten(tree: TreeNode): { name: string; risk: number }[] {
  const res: { name: string; risk: number }[] = [];
  const dfs = (n: TreeNode) => {
    res.push({ name: n.name, risk: Math.round(n.risk * 100) });
    (n.children ?? []).forEach(dfs);
  };
  dfs(tree);
  return res;
}

function TreeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-muted w-10">{Math.round(node.risk * 100)}%</div>
        <div style={{ width: depth * 16 }} />
        <div className="px-2 py-1 rounded-md border border-border bg-zinc-900/40">
          {node.name}
        </div>
      </div>
      <div className="pl-6 border-l border-dashed border-border ml-12 mt-2">
        {(node.children ?? []).map((c) => (
          <div key={c.name} className="mt-2">
            <TreeView node={c} depth={(depth ?? 0) + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PathAnalyzer(): JSX.Element {
  const data = React.useMemo(() => Flatten(sampleTree), []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4">
      <div className="card p-4">
        <h3 className="font-medium mb-2">Attack Path Tree</h3>
        <TreeView node={sampleTree} />
      </div>
      <div className="card p-4">
        <h3 className="font-medium mb-2">Path Statistics</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip />
              <Bar dataKey="risk" fill="rgb(var(--color-primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
