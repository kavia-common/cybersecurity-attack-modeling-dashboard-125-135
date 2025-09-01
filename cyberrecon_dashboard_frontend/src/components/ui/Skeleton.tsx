import React from "react";

interface Props {
  className?: string;
}

export default function Skeleton({ className = "" }: Props): JSX.Element {
  return (
    <div className={`animate-pulse rounded-md bg-zinc-700/40 ${className}`} />
  );
}
