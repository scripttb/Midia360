import React from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar
} from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Empresas',
      value: '247',
      change: '+12',
      changeType: 'positive' as const,
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'Usuários Ativos',
      value: '1,543',
      change: '+89',
      changeType: 'positive' as const,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Receita Mensal',
      value: '128.450.000 AOA',
      change: '+23%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Chats Assistente Ana',
      value: '8,421',
      change: '+156',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const recentTenants = [
    {
      id: 1,
      name: 'Sonangol Holdings',
      plan: 'Premium',
      status: 'active',
      users: 45,
      revenue: '2.500.000 AOA',
      joinDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Unitel S.A.',
      plan: 'Avançado',
      status: 'trial',
      users: 12,
      revenue: '0 AOA',
      joinDate: '2025-01-14'
    },
    {
      id: 3,
      name: 'BFA Banco',
      plan: 'Básico',
      status: 'active',
      users: 8,
      revenue: '450.000 AOA',
      joinDate: '2025-01-13'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: '3 empresas com assinaturas expirando em 7 dias',
      time: '2 horas atrás'
    },
    {
      id: 2,
      type: 'info',
      message: 'Novo webhook configurado para Assistente Ana',
      time: '4 horas atrás'
    },
    {
      id: 3,
      type: 'success',
      message: 'Backup do sistema concluído com sucesso',
      time: '6 horas atrás'
    }
  ];

  const planDistribution = [
    { name: 'Trial', count: 89, percentage: 36 },
    { name: 'Básico', count: 76, percentage: 31 },
    { name: 'Avançado', count: 52, percentage: 21 },
    { name: 'Premium', count: 30, percentage: 12 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trial':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-600" />;
      default:
        return <AlertTriangle size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-800 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Painel Super Admin</h1>
        <p className="text-indigo-100">
          Gerencie todas as empresas e monitore a plataforma Mídia 360
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(stat.color)}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">
                  +{stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tenants */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Empresas Recentes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-600">Empresa</th>
                  <th className="text-left py-2 font-medium text-gray-600">Plano</th>
                  <th className="text-left py-2 font-medium text-gray-600">Status</th>
                  <th className="text-right py-2 font-medium text-gray-600">Usuários</th>
                  <th className="text-right py-2 font-medium text-gray-600">Receita</th>
                </tr>
              </thead>
              <tbody>
                {recentTenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-gray-100">
                    <td className="py-3">
                      <div>
                        <div className="font-medium text-gray-800">{tenant.name}</div>
                        <div className="text-xs text-gray-500">{tenant.joinDate}</div>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{tenant.plan}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.status)}`}>
                        {tenant.status === 'active' ? 'Ativo' : 'Trial'}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-600">{tenant.users}</td>
                    <td className="py-3 text-right font-medium text-gray-800">{tenant.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Alertas do Sistema
          </h2>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3">
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Distribuição de Planos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {planDistribution.map((plan, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <div className="text-2xl font-bold text-gray-800">{plan.count}</div>
                <div className="text-sm text-gray-600">{plan.name}</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${plan.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{plan.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
