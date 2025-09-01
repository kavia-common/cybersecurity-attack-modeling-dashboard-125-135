import React from "react";
import { motion } from "framer-motion";
import { useUIStore } from "./state/store";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Tabs from "./components/layout/Tabs";
import FetchCVE from "./features/fetch-cve/FetchCVE";
import GraphGeneration from "./features/graph/GraphGeneration";
import AttackDefense from "./features/defense/AttackDefense";
import PathAnalyzer from "./features/path/PathAnalyzer";

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /**
   * This is the root component that renders the application layout: Sidebar, Header,
   * and the tabbed content area. It reads currentTab from the global store.
   */
  const tab = useUIStore((s) => s.currentTab);

  const renderTab = () => {
    switch (tab) {
      case "fetch-cve":
        return <FetchCVE />;
      case "graph":
        return <GraphGeneration />;
      case "defense":
        return <AttackDefense />;
      case "path":
        return <PathAnalyzer />;
      default:
        return <FetchCVE />;
    }
  };

  return (
    <div className="min-h-full grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="p-4 lg:p-6 space-y-4">
          <Tabs />
          <motion.section
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-4"
          >
            {renderTab()}
          </motion.section>
        </main>
      </div>
    </div>
  );
}
