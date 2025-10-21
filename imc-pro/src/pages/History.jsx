import React, { useState } from 'react';
import { useIMC } from '../hooks/useIMC';
import { 
  History, 
  Trash2, 
  Download, 
  Calendar, 
  BarChart3,
  FileText,
  Table,
  X,
  Filter,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Info
} from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const HistoryPage = () => {
  const { history, clearHistory, deleteFromHistory } = useIMC();
  const [filter, setFilter] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');

  // Função para exportar para CSV (Excel)
  const exportToCSV = () => {
    if (!history || history.length === 0) return;

    const headers = [
      'Data',
      'Hora', 
      'Peso',
      'Altura',
      'IMC',
      'Classificação',
      'Nível de Risco',
      'Faixa Saudável Mínima',
      'Faixa Saudável Máxima',
      'Sistema de Unidades'
    ];

    const csvData = history.map(entry => [
      format(parseISO(entry.timestamp), 'dd/MM/yyyy', { locale: ptBR }),
      format(parseISO(entry.timestamp), 'HH:mm', { locale: ptBR }),
      entry.weight.toString(),
      entry.height.toString(),
      entry.imc.toString(),
      entry.classification.category,
      entry.classification.risk,
      entry.healthyRange.min.toString(),
      entry.healthyRange.max.toString(),
      entry.unitSystem === 'metric' ? 'Métrico' : 'Imperial'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico_imc_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setShowExportModal(false);
  };

  // Função para exportar para PDF (versão simplificada)
  const exportToPDF = () => {
    if (!history || history.length === 0) return;

    const printContent = `
      <html>
        <head>
          <title>Histórico de IMC</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Histórico de IMC</h1>
            <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Peso</th>
                <th>Altura</th>
                <th>IMC</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody>
              ${history.map(entry => `
                <tr>
                  <td>${new Date(entry.timestamp).toLocaleDateString('pt-BR')}</td>
                  <td>${entry.weight} ${entry.unitSystem === 'metric' ? 'kg' : 'lb'}</td>
                  <td>${entry.height} ${entry.unitSystem === 'metric' ? 'm' : 'in'}</td>
                  <td><strong>${entry.imc}</strong></td>
                  <td>${entry.classification.category}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    setShowExportModal(false);
  };

  const handleExport = () => {
    if (exportFormat === 'excel') {
      exportToCSV();
    } else {
      exportToPDF();
    }
  };

  const getClassificationColor = (severity) => {
    const colors = {
      underweight: 'status-underweight',
      normal: 'status-normal',
      overweight: 'status-overweight',
      obese1: 'status-obese1',
      obese2: 'status-obese2',
      obese3: 'status-obese3'
    };
    return colors[severity] || 'status-normal';
  };

  const filteredHistory = history ? history.filter(entry => {
    if (filter === 'all') return true;
    return entry.classification.severity === filter;
  }) : [];

  const getStats = () => {
    if (!history || history.length === 0) return null;
    
    const latest = history[0];
    const oldest = history[history.length - 1];
    const imcChange = latest.imc - oldest.imc;
    
    const recentEntries = history.slice(0, Math.min(3, history.length));
    const trend = recentEntries.length > 1 
      ? recentEntries[0].imc - recentEntries[recentEntries.length - 1].imc 
      : 0;

    const distribution = {
      underweight: history.filter(e => e.classification.severity === 'underweight').length,
      normal: history.filter(e => e.classification.severity === 'normal').length,
      overweight: history.filter(e => e.classification.severity === 'overweight').length,
      obese1: history.filter(e => e.classification.severity === 'obese1').length,
      obese2: history.filter(e => e.classification.severity === 'obese2').length,
      obese3: history.filter(e => e.classification.severity === 'obese3').length
    };

    return {
      totalEntries: history.length,
      currentIMC: latest.imc,
      imcChange,
      trend,
      period: history.length > 1 ? 
        `${format(parseISO(oldest.timestamp), 'dd/MM/yy', { locale: ptBR })} - ${format(parseISO(latest.timestamp), 'dd/MM/yy', { locale: ptBR })}` : 
        format(parseISO(latest.timestamp), 'dd/MM/yy', { locale: ptBR }),
      latestClassification: latest.classification.category,
      distribution,
      daysTracked: differenceInDays(parseISO(latest.timestamp), parseISO(oldest.timestamp)) + 1
    };
  };

  const stats = getStats();

  const getTrendIcon = (trend) => {
    if (trend < -0.1) return { icon: ArrowDown, color: 'trend-down', text: 'Diminuindo' };
    if (trend > 0.1) return { icon: ArrowUp, color: 'trend-up', text: 'Aumentando' };
    return { icon: Minus, color: 'trend-stable', text: 'Estável' };
  };

  const trendInfo = stats ? getTrendIcon(stats.trend) : null;

  if (!history) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
          Histórico de IMC
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>
          Acompanhe sua evolução completa e exporte seus dados para análise
        </p>
      </div>

      {/* Stats e Actions */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
              <BarChart3 size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Estatísticas do Período
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>{stats.totalEntries}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Registros</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>{stats.currentIMC}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>IMC Atual</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  {trendInfo && (
                    <>
                      <trendInfo.icon size={16} style={{ color: trendInfo.color === 'trend-down' ? '#ef4444' : trendInfo.color === 'trend-up' ? '#10b981' : '#f59e0b' }} />
                      <span style={{ fontSize: '1rem', color: 'inherit' }}>{trendInfo.text}</span>
                    </>
                  )}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Tendência</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Ações</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => setShowExportModal(true)}
                disabled={history.length === 0}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                <Download size={18} />
                Exportar Dados
              </button>
              <button
                onClick={clearHistory}
                disabled={history.length === 0}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <History size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Nenhum histórico encontrado
            </h3>
            <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>
              Use a calculadora de IMC para começar a acompanhar sua evolução.
            </p>
          </div>
        ) : (
          <>
            {/* Filtros */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <Filter size={16} color="#6b7280" />
              <span style={{ fontWeight: '600', color: '#374151' }}>Filtrar:</span>
              <button
                onClick={() => setFilter('all')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  border: '1px solid #d1d5db', 
                  background: filter === 'all' ? '#3b82f6' : 'white', 
                  color: filter === 'all' ? 'white' : '#374151',
                  borderRadius: '6px', 
                  cursor: 'pointer' 
                }}
              >
                Todos ({history.length})
              </button>
              <button
                onClick={() => setFilter('normal')}
                style={{ 
                  padding: '0.5rem 1rem', 
                  border: '1px solid #d1d5db', 
                  background: filter === 'normal' ? '#27ae60' : 'white', 
                  color: filter === 'normal' ? 'white' : '#374151',
                  borderRadius: '6px', 
                  cursor: 'pointer' 
                }}
              >
                Normal ({stats.distribution.normal})
              </button>
            </div>

            {/* Tabela */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>Data e Hora</th>
                  <th style={{ padding: '1rem', textAlign: 'left', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>Peso</th>
                  <th style={{ padding: '1rem', textAlign: 'left', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>Altura</th>
                  <th style={{ padding: '1rem', textAlign: 'left', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>IMC</th>
                  <th style={{ padding: '1rem', textAlign: 'left', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>Classificação</th>
                  <th style={{ padding: '1rem', textAlign: 'left', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} color="#9ca3af" />
                        <div>
                          <div style={{ fontWeight: '600', color: '#111827' }}>
                            {format(parseISO(entry.timestamp), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            {format(parseISO(entry.timestamp), 'HH:mm', { locale: ptBR })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>
                      {entry.weight} {entry.unitSystem === 'metric' ? 'kg' : 'lb'}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>
                      {entry.height} {entry.unitSystem === 'metric' ? 'm' : 'in'}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#3b82f6', textAlign: 'center' }}>
                        {entry.imc}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        background: entry.classification.severity === 'normal' ? '#27ae60' : 
                                   entry.classification.severity === 'overweight' ? '#f39c12' : '#3498db',
                        color: 'white'
                      }}>
                        {entry.classification.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => deleteFromHistory(entry.id)}
                        style={{ 
                          padding: '0.5rem', 
                          background: '#fee2e2', 
                          color: '#ef4444', 
                          border: 'none', 
                          borderRadius: '6px', 
                          cursor: 'pointer' 
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal de Exportação */}
      {showExportModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            maxWidth: '500px', 
            width: '90%' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, color: '#111827' }}>Exportar Dados</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div 
                style={{ 
                  border: `2px solid ${exportFormat === 'excel' ? '#3b82f6' : '#e5e7eb'}`, 
                  borderRadius: '8px', 
                  padding: '1.5rem', 
                  cursor: 'pointer',
                  background: exportFormat === 'excel' ? '#dbeafe' : 'white',
                  textAlign: 'center'
                }}
                onClick={() => setExportFormat('excel')}
              >
                <Table size={24} style={{ color: exportFormat === 'excel' ? '#3b82f6' : '#6b7280', marginBottom: '1rem' }} />
                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>Excel (CSV)</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Para planilhas</div>
              </div>

              <div 
                style={{ 
                  border: `2px solid ${exportFormat === 'pdf' ? '#3b82f6' : '#e5e7eb'}`, 
                  borderRadius: '8px', 
                  padding: '1.5rem', 
                  cursor: 'pointer',
                  background: exportFormat === 'pdf' ? '#dbeafe' : 'white',
                  textAlign: 'center'
                }}
                onClick={() => setExportFormat('pdf')}
              >
                <FileText size={24} style={{ color: exportFormat === 'pdf' ? '#3b82f6' : '#6b7280', marginBottom: '1rem' }} />
                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>PDF</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Para impressão</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#e5e7eb',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#374151'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleExport}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                <Download size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Exportar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;