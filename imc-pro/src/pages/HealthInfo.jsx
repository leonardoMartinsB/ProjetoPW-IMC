import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Scale, 
  Calculator, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Heart,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const HealthInfo = () => {
  const [activeTab, setActiveTab] = useState('what-is');

  const tabs = [
    { id: 'what-is', label: 'O que é IMC', icon: Info },
    { id: 'calculation', label: 'Cálculo', icon: Calculator },
    { id: 'classification', label: 'Classificação', icon: Scale },
    { id: 'limitations', label: 'Limitações', icon: AlertTriangle },
  ];

  const classifications = [
    { range: 'Abaixo de 18.5', category: 'Abaixo do peso', severity: 'underweight', risk: 'Moderado', color: 'var(--underweight)' },
    { range: '18.5 - 24.9', category: 'Peso normal', severity: 'normal', risk: 'Baixo', color: 'var(--normal)' },
    { range: '25 - 29.9', category: 'Sobrepeso', severity: 'overweight', risk: 'Aumentado', color: 'var(--overweight)' },
    { range: '30 - 34.9', category: 'Obesidade Grau I', severity: 'obese1', risk: 'Moderado', color: 'var(--obese1)' },
    { range: '35 - 39.9', category: 'Obesidade Grau II', severity: 'obese2', risk: 'Severo', color: 'var(--obese2)' },
    { range: '40 ou mais', category: 'Obesidade Grau III', severity: 'obese3', risk: 'Muito Severo', color: 'var(--obese3)' }
  ];

  return (
    <div className="info-page">
      <div className="container">
        {/* Header */}
        <div className="info-header">
          <h1 className="info-main-title">Informações sobre IMC</h1>
          <p className="info-subtitle">
            Conheça tudo sobre o Índice de Massa Corporal, sua importância para a saúde e como interpretar os resultados
          </p>
        </div>

        {/* Tabs */}
        <div className="info-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`info-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Conteúdo das Tabs */}
        <div className="info-content">
          {/* O que é IMC */}
          {activeTab === 'what-is' && (
            <div>
              <h2 className="info-section-title">O que é o Índice de Massa Corporal (IMC)?</h2>
              
              <div className="info-text">
                <p>
                  O <strong>Índice de Massa Corporal (IMC)</strong> é uma medida internacionalmente 
                  reconhecida utilizada para avaliar se uma pessoa está em um peso considerado saudável 
                  para sua altura. Desenvolvido pelo matemático e estatístico belga Lambert Adolphe 
                  Jacques Quételet no século XIX, o IMC é atualmente adotado pela 
                  <strong> Organização Mundial da Saúde (OMS)</strong> como principal referência 
                  para classificação das diferentes faixas de peso.
                </p>

                <p>
                  Embora seja amplamente utilizado por sua simplicidade e baixo custo, é importante 
                  entender que o IMC é uma <strong>ferramenta de triagem populacional</strong> e não 
                  um diagnóstico médico completo. Ele não mede diretamente a gordura corporal nem 
                  considera fatores individuais como composição corporal, distribuição de gordura, 
                  massa muscular, densidade óssea, idade e sexo.
                </p>
              </div>

              <div style={{ background: 'var(--blue-50)', padding: '24px', borderRadius: '16px', margin: '32px 0' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--blue-700)' }}>
                  <Info size={24} />
                  Importante Saber
                </h3>
                <p style={{ color: 'var(--blue-800)', margin: 0 }}>
                  O IMC é uma ferramenta útil para <strong>avaliação inicial</strong> do estado nutricional, 
                  mas deve ser <strong>complementado com outras avaliações</strong> para um diagnóstico 
                  completo da saúde.
                </p>
              </div>
            </div>
          )}

          {/* Cálculo */}
          {activeTab === 'calculation' && (
            <div>
              <h2 className="info-section-title">Como calcular o IMC</h2>
              
              <div className="info-text">
                <p>
                  O cálculo do IMC segue uma fórmula matemática simples que relaciona o peso 
                  e a altura de uma pessoa. Você pode usar nossa calculadora automática ou 
                  fazer o cálculo manualmente seguindo os passos abaixo.
                </p>
              </div>

              <div style={{ background: 'var(--primary-color)', color: 'white', padding: '32px', borderRadius: '20px', textAlign: 'center', margin: '32px 0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
                  Fórmula do IMC
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'monospace', marginBottom: '16px' }}>
                  IMC = peso (kg) ÷ altura² (m)
                </div>
                <div style={{ opacity: 0.9 }}>
                  Exemplo: 70kg ÷ (1.75m × 1.75m) = 22.86
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', margin: '32px 0' }}>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--gray-900)' }}>
                    <CheckCircle size={20} color="var(--green-500)" />
                    Passo a Passo
                  </h3>
                  <ol style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '600', flexShrink: 0 }}>1</div>
                      <span>Meça seu peso em quilogramas (kg) usando uma balança precisa</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '600', flexShrink: 0 }}>2</div>
                      <span>Meça sua altura em metros (m) com fita métrica ou estadiômetro</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '600', flexShrink: 0 }}>3</div>
                      <span>Multiplique a altura por ela mesma (altura × altura)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', background: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '600', flexShrink: 0 }}>4</div>
                      <span>Divida o peso pelo resultado do passo anterior</span>
                    </li>
                  </ol>
                </div>

                <div style={{ background: 'var(--yellow-50)', padding: '24px', borderRadius: '16px', border: '1px solid var(--yellow-200)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--yellow-700)' }}>
                    <AlertTriangle size={20} />
                    Dicas Importantes
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ color: 'var(--yellow-600)', marginTop: '2px' }}>•</div>
                      <span>Use pontos decimais (1.75) não vírgulas (1,75)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ color: 'var(--yellow-600)', marginTop: '2px' }}>•</div>
                      <span>Meça o peso pela manhã, em jejum</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ color: 'var(--yellow-600)', marginTop: '2px' }}>•</div>
                      <span>Meça a altura sem calçados, com postura ereta</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ color: 'var(--yellow-600)', marginTop: '2px' }}>•</div>
                      <span>Nossa calculadora faz conversões automaticamente</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Classificação */}
          {activeTab === 'classification' && (
            <div>
              <h2 className="info-section-title">Classificação do IMC</h2>
              
              <div className="info-text">
                <p>
                  A Organização Mundial da Saúde (OMS) estabelece faixas padronizadas para 
                  classificação do IMC. Estas categorias ajudam a identificar possíveis 
                  riscos à saúde associados ao peso corporal.
                </p>
              </div>

              <table className="classification-table">
                <thead>
                  <tr>
                    <th>Faixa de IMC</th>
                    <th>Classificação</th>
                    <th>Nível de Risco</th>
                  </tr>
                </thead>
                <tbody>
                  {classifications.map((classification, index) => (
                    <tr key={index}>
                      <td>
                        <span className="imc-range">{classification.range}</span>
                      </td>
                      <td>
                        <span 
                          className="imc-classification"
                          style={{ background: classification.color }}
                        >
                          {classification.category}
                        </span>
                      </td>
                      <td>
                        <span style={{ 
                          color: classification.risk === 'Baixo' ? 'var(--green-600)' : 
                                 classification.risk === 'Moderado' ? 'var(--yellow-600)' : 
                                 classification.risk === 'Aumentado' ? 'var(--orange-600)' : 
                                 classification.risk === 'Severo' ? 'var(--red-600)' : 'var(--red-700)',
                          fontWeight: '600'
                        }}>
                          {classification.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '32px' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--gray-900)' }}>Interpretação dos Resultados</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div style={{ background: 'var(--green-50)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--green-500)' }}>
                    <h4 style={{ color: 'var(--green-700)', marginBottom: '8px' }}>Peso Normal (18.5 - 24.9)</h4>
                    <p style={{ color: 'var(--green-800)', fontSize: '0.95rem', margin: 0 }}>
                      Associado a menores riscos de doenças crônicas. Mantenha hábitos saudáveis.
                    </p>
                  </div>
                  <div style={{ background: 'var(--yellow-50)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--yellow-500)' }}>
                    <h4 style={{ color: 'var(--yellow-700)', marginBottom: '8px' }}>Sobrepeso (25 - 29.9)</h4>
                    <p style={{ color: 'var(--yellow-800)', fontSize: '0.95rem', margin: 0 }}>
                      Aumento moderado de riscos. Recomenda-se mudanças no estilo de vida.
                    </p>
                  </div>
                  <div style={{ background: 'var(--red-50)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--red-500)' }}>
                    <h4 style={{ color: 'var(--red-700)', marginBottom: '8px' }}>Obesidade (≥ 30)</h4>
                    <p style={{ color: 'var(--red-800)', fontSize: '0.95rem', margin: 0 }}>
                      Riscos significativos à saúde. Acompanhamento médico essencial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Limitações */}
          {activeTab === 'limitations' && (
            <div>
              <h2 className="info-section-title">Limitações do IMC</h2>
              
              <div className="info-text">
                <p>
                  Embora seja uma ferramenta útil para triagem populacional, o IMC apresenta 
                  várias limitações importantes que devem ser consideradas na interpretação 
                  dos resultados.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '32px 0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', color: 'var(--gray-900)' }}>Não diferencia massa muscular e gordura</h3>
                    <p style={{ color: 'var(--gray-700)', margin: 0 }}>
                      Atletas e pessoas musculosas podem ter IMC alto devido à massa muscular, 
                      não à gordura corporal. Nestes casos, o IMC pode superestimar a gordura.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', color: 'var(--gray-900)' }}>Não considera distribuição de gordura</h3>
                    <p style={{ color: 'var(--gray-700)', margin: 0 }}>
                      A gordura abdominal é metabolicamente mais perigosa que a gordura 
                      subcutânea, mas o IMC não faz esta distinção.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', color: 'var(--gray-900)' }}>Não leva em conta idade e sexo</h3>
                    <p style={{ color: 'var(--gray-700)', margin: 0 }}>
                      A composição corporal varia naturalmente com a idade e entre homens 
                      e mulheres, mas o IMC usa os mesmos critérios para todos os adultos.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px', background: 'var(--gray-50)', borderRadius: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--primary-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '8px', color: 'var(--gray-900)' }}>Não considera densidade óssea</h3>
                    <p style={{ color: 'var(--gray-700)', margin: 0 }}>
                      Pessoas com ossos mais densos podem ter IMC mais alto sem necessariamente 
                      ter excesso de gordura.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--blue-50)', padding: '24px', borderRadius: '16px', textAlign: 'center', marginTop: '32px' }}>
                <h3 style={{ color: 'var(--blue-700)', marginBottom: '12px' }}>Conclusão Importante</h3>
                <p style={{ color: 'var(--blue-800)', margin: 0, fontWeight: '500' }}>
                  O IMC é uma <strong>ferramenta de triagem útil</strong>, mas não substitui 
                  uma avaliação médica completa. Consulte sempre um profissional de saúde 
                  para diagnóstico e orientação personalizada.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))', color: 'white', padding: '60px 40px', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>
              Pronto para calcular seu IMC?
            </h3>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Use nossa calculadora avançada e receba uma análise completa da sua saúde 
              com recomendações personalizadas
            </p>
            <Link to="/imc" className="btn btn-primary btn-lg">
              <Calculator size={20} />
              Calcular Meu IMC
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInfo;