import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/public/Home';

// Lazy-loaded Admin Components so they do NOT bloat the public bundle
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ContentCMS = lazy(() => import('./pages/admin/ContentCMS'));
const AppearanceCMS = lazy(() => import('./pages/admin/AppearanceCMS'));
const LeadsCRM = lazy(() => import('./pages/admin/LeadsCRM'));
const DatabaseSettings = lazy(() => import('./pages/admin/DatabaseSettings'));

function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#091A24] text-white flex items-center justify-center font-mono text-xs">
      <div className="animate-pulse flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF4A1C]" />
        Carregando painel de controle...
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Client-Facing Route */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Internal Admin Route with Code Splitting */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<AdminLoading />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="content" element={<ContentCMS />} />
        <Route path="appearance" element={<AppearanceCMS />} />
        <Route path="leads" element={<LeadsCRM />} />
        <Route path="database" element={<DatabaseSettings />} />
      </Route>

      {/* Fallback Catch-all: Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

