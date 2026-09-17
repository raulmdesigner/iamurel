import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/public/Home';

// Admin Components
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ContentCMS from './pages/admin/ContentCMS';
import AppearanceCMS from './pages/admin/AppearanceCMS';
import LeadsCRM from './pages/admin/LeadsCRM';
import DatabaseSettings from './pages/admin/DatabaseSettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Client-Facing Route */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Internal Admin Route */}
      <Route path="/admin" element={<AdminLayout />}>
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

