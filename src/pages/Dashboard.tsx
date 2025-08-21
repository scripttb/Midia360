import React from 'react';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total de Clientes',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Faturas Emitidas',
      value: '856',
      change: '+8%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Receita Mensal',
      value: '2.540.000 AOA',
      change: '+23%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Leads Ativos',
      value: '143',
      change: '+5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'invoice',
      description: 'Nova fatura #INV-2025-001 criada para Empresa ABC',
      time: '5 minutos atrás',
      icon: FileText
    },
    {
      id: 2,
      type: 'lead',
      description: 'Novo lead adicionado: João Silva da Sonangol',
      time: '10 minutos atrás',
      icon: Users
    },
    {
      id: 3,
      type: 'whatsapp',
      description: 'Mensagem WhatsApp recebida de cliente Maria Santos',
      time: '15 minutos atrás',
      icon: Phone
    },
    {
      id: 4,
      type: 'payment',
      description: 'Pagamento de 450.000 AOA recebido',
      time: '1 hora atrás',
      icon: CheckCircle
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Enviar proposta para Petróleo de Luanda',
      dueDate: 'Hoje, 15:00',
      priority: 'high' as const
    },
    {
      id: 2,
      title: 'Follow-up com lead da Unitel',
      dueDate: 'Amanhã, 09:00',
      priority: 'medium' as const
    },
    {
      id: 3,
      title: 'Reunião com equipe de vendas',
      dueDate: 'Quinta, 14:00',
      priority: 'low' as const
    }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Olá, {user?.name}! 👋
            </h1>
            <p className="text-blue-100">
              Aqui está um resumo do seu negócio hoje.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Data de hoje</p>
            <p className="text-lg font-semibold">
              {new Date().toLocaleDateString('pt-AO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
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
                  {stat.change}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Atividades Recentes
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Próximas Tarefas
          </h2>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">
                    {task.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {task.dueDate}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
