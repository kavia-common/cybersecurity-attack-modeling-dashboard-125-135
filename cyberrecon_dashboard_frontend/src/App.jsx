import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import FetchCVE from './pages/FetchCVE';
import GraphGeneration from './pages/GraphGeneration';
import AttackDefense from './pages/AttackDefense';
import PathAnalyzer from './pages/PathAnalyzer';
import { useAppStore, TABS } from './state/store';

function useSyncTabWithRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  React.useEffect(() => {
    // derive tab from route
    const path = location.pathname.replace('/', '') || TABS.FETCH_CVE;
    if (Object.values(TABS).includes(path)) {
      if (activeTab !== path) setActiveTab(path);
    }
  }, [location.pathname]);

  const onTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return { activeTab, onTabChange };
}

export default function App() {
  const { activeTab, onTabChange } = useSyncTabWithRoute();
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <Header />
      <div className="h-full grid" style={{ gridTemplateColumns: sidebarOpen ? '260px 1fr' : '0px 1fr' }}>
        <Sidebar />
        <main className="overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-10 py-6 space-y-6">
            <Tabs activeTab={activeTab} onTabChange={onTabChange} />
            <div className="container-card p-4 sm:p-6">
              <Routes>
                <Route path="/" element={<Navigate to={`/${TABS.FETCH_CVE}`} replace />} />
                <Route path={`/${TABS.FETCH_CVE}`} element={<FetchCVE />} />
                <Route path={`/${TABS.GRAPH_GEN}`} element={<GraphGeneration />} />
                <Route path={`/${TABS.ATTACK_DEF}`} element={<AttackDefense />} />
                <Route path={`/${TABS.PATH_ANALYZER}`} element={<PathAnalyzer />} />
                <Route path="*" element={<Navigate to={`/${TABS.FETCH_CVE}`} replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
