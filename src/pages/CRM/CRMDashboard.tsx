import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Phone, 
  Mail, 
  Calendar,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { faker } from '@faker-js/faker';

const CRMDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate mock data
  const leads = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    status: faker.helpers.arrayElement(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']),
    source: faker.helpers.arrayElement(['website', 'whatsapp', 'referral', 'cold_call']),
    value: faker.number.int({ min: 50000, max: 2000000 }),
    createdAt: faker.date.recent({ days: 30 }),
    lastContact: faker.date.recent({ days: 7 })
  }));

  const customers = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    totalValue: faker.number.int({ min: 100000, max: 5000000 }),
    lastPurchase: faker.date.recent({ days: 60 }),
    status: 'active'
  }));

  const stats = [
    {
      title: 'Total de Leads',
      value: leads.length.toString(),
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Leads Qualificados',
      value: leads.filter(l => l.status === 'qualified').length.toString(),
      change: '+8%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Taxa de Conversão',
      value: '24%',
      change: '+3%',
      icon: UserPlus,
      color: 'yellow'
    },
    {
      title: 'Valor Pipeline',
      value: `${(leads.reduce((acc, l) => acc + l.value, 0) / 1000000).toFixed(1)}M AOA`,
      change: '+15%',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      proposal: 'bg-purple-100 text-purple-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      new: 'Novo',
      contacted: 'Contactado',
      qualified: 'Qualificado',
      proposal: 'Proposta',
      won: 'Ganho',
      lost: 'Perdido'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getSourceLabel = (source: string) => {
    const labels = {
      website: 'Website',
      whatsapp: 'WhatsApp',
      referral: 'Indicação',
      cold_call: 'Cold Call'
    };
    return labels[source as keyof typeof labels] || source;
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">CRM</h1>
          <p className="text-gray-600 mt-1">Gerencie seus clientes e leads</p>
        </div>
        <button className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <UserPlus size={20} />
          <span>Novo Lead</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Icon size={24} className="text-blue-600" />
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

      {/* Tabs and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'leads'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'customers'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Clientes ({customers.length})
            </button>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Leads Table */}
        {activeTab === 'leads' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-600">Nome</th>
                  <th className="text-left py-3 font-medium text-gray-600">Empresa</th>
                  <th className="text-left py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 font-medium text-gray-600">Fonte</th>
                  <th className="text-right py-3 font-medium text-gray-600">Valor</th>
                  <th className="text-left py-3 font-medium text-gray-600">Último Contato</th>
                  <th className="text-center py-3 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-gray-800">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                        <div className="text-xs text-gray-500">{lead.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{lead.company}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">{getSourceLabel(lead.source)}</td>
                    <td className="py-4 text-right font-medium text-gray-800">
                      {(lead.value / 1000).toFixed(0)}K AOA
                    </td>
                    <td className="py-4 text-gray-600">
                      {lead.lastContact.toLocaleDateString('pt-AO')}
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                          <Phone size={16} />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors">
                          <Mail size={16} />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Customers Table */}
        {activeTab === 'customers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-600">Nome</th>
                  <th className="text-left py-3 font-medium text-gray-600">Empresa</th>
                  <th className="text-right py-3 font-medium text-gray-600">Valor Total</th>
                  <th className="text-left py-3 font-medium text-gray-600">Última Compra</th>
                  <th className="text-center py-3 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-gray-800">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.email}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{customer.company}</td>
                    <td className="py-4 text-right font-medium text-gray-800">
                      {(customer.totalValue / 1000).toFixed(0)}K AOA
                    </td>
                    <td className="py-4 text-gray-600">
                      {customer.lastPurchase.toLocaleDateString('pt-AO')}
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                          <Phone size={16} />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors">
                          <Mail size={16} />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMDashboard;
