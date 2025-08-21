import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  CreditCard, 
  BarChart3,
  Shield,
  Database,
  Webhook,
  UserCog,
  Building2,
  Phone
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const superAdminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/tenants', icon: Building2, label: 'Empresas' },
    { to: '/admin/plans', icon: CreditCard, label: 'Planos' },
    { to: '/admin/chat-monitor', icon: MessageSquare, label: 'Monitor Chat Ana' },
    { to: '/admin/webhooks', icon: Webhook, label: 'Webhooks' },
    { to: '/admin/system', icon: Settings, label: 'Sistema' },
    { to: '/admin/logs', icon: Database, label: 'Logs' },
    { to: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
  ];

  const tenantLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/crm', icon: Users, label: 'CRM' },
    { to: '/invoicing', icon: FileText, label: 'Faturação' },
    { to: '/whatsapp', icon: Phone, label: 'WhatsApp' },
    { to: '/reports', icon: BarChart3, label: 'Relatórios' },
    { to: '/settings', icon: Settings, label: 'Configurações' },
  ];

  const managerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/crm', icon: Users, label: 'CRM' },
    { to: '/invoicing', icon: FileText, label: 'Faturação' },
    { to: '/reports', icon: BarChart3, label: 'Relatórios' },
  ];

  const salesLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/crm/leads', icon: Users, label: 'Leads' },
    { to: '/invoicing/proforma', icon: FileText, label: 'Proformas' },
  ];

  const getLinksForRole = () => {
    switch (user?.role) {
      case 'super_admin':
        return superAdminLinks;
      case 'tenant_owner':
        return tenantLinks;
      case 'manager':
        return managerLinks;
      case 'sales':
        return salesLinks;
      default:
        return [];
    }
  };

  const links = getLinksForRole();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Mídia 360</h1>
        <p className="text-gray-400 text-sm">
          {user?.role === 'super_admin' ? 'Super Admin' : 'Plataforma SaaS'}
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {user?.role !== 'super_admin' && (
        <div className="mt-8 p-4 bg-blue-900 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare size={20} />
            <span className="font-medium">Assistente Ana</span>
          </div>
          <p className="text-sm text-blue-200 mb-3">
            Precisa de ajuda? Fale com nossa assistente virtual!
          </p>
          <Link
            to="/chat"
            className="block w-full text-center bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-sm transition-colors"
          >
            Iniciar Chat
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
