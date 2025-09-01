import React from "react";
import * as d3 from "d3";
import Skeleton from "../../components/ui/Skeleton";

type Node = { id: string; group: number };
type Link = { source: string; target: string; risk: number };

const sampleNodes: Node[] = [
  { id: "Gateway", group: 1 },
  { id: "DMZ", group: 1 },
  { id: "Web", group: 2 },
  { id: "DB", group: 3 },
  { id: "Internal", group: 2 },
  { id: "Endpoint-A", group: 4 },
  { id: "Endpoint-B", group: 4 },
];

const sampleLinks: Link[] = [
  { source: "Gateway", target: "DMZ", risk: 0.3 },
  { source: "DMZ", target: "Web", risk: 0.6 },
  { source: "Web", target: "DB", risk: 0.8 },
  { source: "Web", target: "Internal", risk: 0.5 },
  { source: "Internal", target: "Endpoint-A", risk: 0.4 },
  { source: "Internal", target: "Endpoint-B", risk: 0.2 },
];

export default function GraphGeneration(): JSX.Element {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth || 600;
    const height = 420;

    const svg = d3
      .select(ref.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    const color = (g: number) => {
      const colors = [
        "rgb(var(--color-primary))",
        "rgb(var(--color-secondary))",
        "rgb(var(--color-accent))",
        "#22d3ee",
      ];
      return colors[g % colors.length];
    };

    const simulation = d3
      .forceSimulation(sampleNodes as any)
      .force(
        "link",
        d3.forceLink(sampleLinks as any).id((d: any) => d.id).distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-280))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(sampleLinks)
      .enter()
      .append("line")
      .attr("stroke", (d) =>
        d.risk > 0.7 ? "rgb(var(--color-danger))" : "rgb(var(--color-border))"
      )
      .attr("stroke-width", (d) => 1 + d.risk * 3)
      .attr("opacity", 0.8);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(sampleNodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => color(d.group))
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            (d as any).fx = d.x;
            (d as any).fy = d.y;
          })
          .on("drag", (event, d) => {
            (d as any).fx = event.x;
            (d as any).fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            (d as any).fx = null;
            (d as any).fy = null;
          })
      );

    const label = svg
      .append("g")
      .selectAll("text")
      .data(sampleNodes)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("fill", "rgb(var(--color-foreground))")
      .attr("font-size", 12)
      .attr("dx", 12)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Network & Attack Path Graph</h3>
          <button className="btn btn-primary" onClick={() => setLoading(true)}>
            Generate Graph
          </button>
        </div>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>
        ) : (
          <svg ref={ref} />
        )}
      </div>
      <div className="space-y-4">
        <div className="card p-4">
          <h3 className="font-medium mb-2">Legend</h3>
          <ul className="text-sm text-muted list-disc pl-5 space-y-1">
            <li>Node color indicates subnet or asset group</li>
            <li>Edge thickness signals risk of traversal</li>
            <li>Drag nodes to explore clusters</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-medium mb-2">Summary</h3>
          <p className="text-sm text-muted">
            Sample layout shows potential attack vectors from DMZ to DB via Web services.
          </p>
        </div>
      </div>
    </div>
  );
}
