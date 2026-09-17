import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/public/Home';
import Dashboard from './pages/admin/Dashboard';
import LeadsCRM from './pages/admin/LeadsCRM';
import ContentCMS from './pages/admin/ContentCMS';
import AppearanceCMS from './pages/admin/AppearanceCMS';
import DatabaseSettings from './pages/admin/DatabaseSettings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Client-Facing Route */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Admin Panel (Backoffice) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<LeadsCRM />} />
        <Route path="conteudo" element={<ContentCMS />} />
        <Route path="aparencia" element={<AppearanceCMS />} />
        <Route path="banco" element={<DatabaseSettings />} />

        {/* Aliases for quick access / backward compatibility */}
        <Route path="services" element={<Navigate to="/admin/conteudo" replace />} />
        <Route path="packages" element={<Navigate to="/admin/conteudo" replace />} />
        <Route path="settings" element={<Navigate to="/admin/banco" replace />} />
      </Route>

      {/* Fallback Catch-all: Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
