import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import { useAppStore, TABS } from './state/store';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load tab pages
const FetchCVE = React.lazy(() => import('./pages/FetchCVE'));
const GraphGeneration = React.lazy(() => import('./pages/GraphGeneration'));
const AttackDefense = React.lazy(() => import('./pages/AttackDefense'));
const PathAnalyzer = React.lazy(() => import('./pages/PathAnalyzer'));

function useSyncTabWithRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  React.useEffect(() => {
    const path = location.pathname.replace('/', '') || TABS.FETCH_CVE;
    if ((Object.values(TABS) as string[]).includes(path)) {
      if (activeTab !== path) setActiveTab(path as typeof activeTab);
    }
  }, [location.pathname]);

  const onTabChange = (tab: string) => {
    setActiveTab(tab as typeof activeTab);
    navigate(`/${tab}`);
  };

  return { activeTab, onTabChange };
}

export default function App(): JSX.Element {
  const { activeTab, onTabChange } = useSyncTabWithRoute();
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <Header />
      <div
        className="h-full grid transition-[grid-template-columns] duration-300"
        style={{ gridTemplateColumns: sidebarOpen ? '260px 1fr' : '0px 1fr' }}
      >
        <Sidebar />
        <main className="overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-10 py-6 space-y-6">
            <Tabs activeTab={activeTab} onTabChange={onTabChange} />
            <div className="container-card p-4 sm:p-6">
              <React.Suspense fallback={<div className="text-white/60">Loading...</div>}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Routes>
                      <Route path="/" element={<Navigate to={`/${TABS.FETCH_CVE}`} replace />} />
                      <Route path={`/${TABS.FETCH_CVE}`} element={<FetchCVE />} />
                      <Route path={`/${TABS.GRAPH_GEN}`} element={<GraphGeneration />} />
                      <Route path={`/${TABS.ATTACK_DEF}`} element={<AttackDefense />} />
                      <Route path={`/${TABS.PATH_ANALYZER}`} element={<PathAnalyzer />} />
                      <Route path="*" element={<Navigate to={`/${TABS.FETCH_CVE}`} replace />} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </React.Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
