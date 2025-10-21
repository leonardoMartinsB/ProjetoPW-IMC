import React, { useState } from 'react';
import { useIMC } from '../hooks/useIMC';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Scale, 
  Ruler, 
  AlertCircle, 
  History, 
  Info,
  TrendingUp,
  Heart,
  Activity,
  Utensils,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const IMCCalculatorPage = () => {
  const { calculate, unitSystem, setUnitSystem, history } = useIMC();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validateInputs = () => {
    const newErrors = {};
    
    if (!weight || weight <= 0) {
      newErrors.weight = 'Peso inválido';
    }
    
    if (!height || height <= 0) {
      newErrors.height = 'Altura inválida';
    } else if (unitSystem === 'metric' && height > 3) {
      newErrors.height = 'Altura deve ser em metros (ex: 1.75)';
    } else if (unitSystem === 'imperial' && height > 100) {
      newErrors.height = 'Altura deve ser em polegadas (ex: 70)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (validateInputs()) {
      const calculationResult = calculate(parseFloat(weight), parseFloat(height));
      setResult(calculationResult);
    }
  };

  const getClassificationColor = (severity) => {
    const colors = {
      underweight: 'var(--underweight)',
      normal: 'var(--normal)',
      overweight: 'var(--overweight)',
      obese1: 'var(--obese1)',
      obese2: 'var(--obese2)',
      obese3: 'var(--obese3)'
    };
    return colors[severity] || 'var(--primary-color)';
  };

  const getClassificationDescription = (severity) => {
    const descriptions = {
      underweight: 'O IMC abaixo de 18.5 indica baixo peso. Isso pode estar relacionado a fatores genéticos, metabolismo acelerado ou condições de saúde que afetam a absorção de nutrientes. É importante investigar as causas e buscar orientação nutricional.',
      normal: 'Parabéns! Seu IMC está na faixa considerada saudável. Manter o peso dentro desta faixa está associado a menores riscos de doenças crônicas e melhor qualidade de vida. Continue com hábitos saudáveis!',
      overweight: 'O IMC entre 25 e 29.9 indica sobrepeso. Esta condição pode aumentar o risco de desenvolver doenças como diabetes tipo 2, hipertensão e problemas cardiovasculares. Recomenda-se adoção de hábitos mais saudáveis.',
      obese1: 'O IMC entre 30 e 34.9 caracteriza obesidade grau I. Esta condição requer atenção médica para prevenção de complicações metabólicas e melhora da qualidade de vida.',
      obese2: 'O IMC entre 35 e 39.9 caracteriza obesidade grau II. O risco de comorbidades é significativamente aumentado, necessitando intervenção profissional e acompanhamento multidisciplinar.',
      obese3: 'O IMC acima de 40 caracteriza obesidade grau III (obesidade mórbida). Esta condição requer acompanhamento médico urgente e tratamento especializado para redução de riscos à saúde.'
    };
    return descriptions[severity] || 'Classificação não disponível.';
  };

  const getRisksForClassification = (severity) => {
    const risks = {
      underweight: [
        { level: 'moderate', text: 'Deficiência nutricional' },
        { level: 'moderate', text: 'Osteoporose precoce' },
        { level: 'moderate', text: 'Sistema imunológico fragilizado' },
        { level: 'moderate', text: 'Problemas de crescimento' }
      ],
      normal: [
        { level: 'low', text: 'Risco baixo de doenças crônicas' },
        { level: 'low', text: 'Boa qualidade de vida' },
        { level: 'low', text: 'Expectativa de vida maior' },
        { level: 'low', text: 'Melhor disposição física' }
      ],
      overweight: [
        { level: 'moderate', text: 'Diabetes tipo 2' },
        { level: 'moderate', text: 'Hipertensão arterial' },
        { level: 'moderate', text: 'Doenças cardíacas' },
        { level: 'moderate', text: 'Problemas articulares' }
      ],
      obese1: [
        { level: 'high', text: 'Apneia do sono' },
        { level: 'high', text: 'Problemas articulares graves' },
        { level: 'high', text: 'Esteatose hepática' },
        { level: 'high', text: 'Infertilidade' }
      ],
      obese2: [
        { level: 'high', text: 'Doença coronariana' },
        { level: 'high', text: 'Acidente vascular cerebral' },
        { level: 'high', text: 'Alguns tipos de câncer' },
        { level: 'high', text: 'Insuficiência renal' }
      ],
      obese3: [
        { level: 'very-high', text: 'Insuficiência cardíaca' },
        { level: 'very-high', text: 'Diabetes descontrolada' },
        { level: 'very-high', text: 'Mortalidade prematura' },
        { level: 'very-high', text: 'Múltiplas comorbidades' }
      ]
    };
    return risks[severity] || [];
  };

  const getSeverityLevel = (severity) => {
    const levels = {
      underweight: 'moderate',
      normal: 'low',
      overweight: 'moderate',
      obese1: 'high',
      obese2: 'high',
      obese3: 'very-high'
    };
    return levels[severity] || 'low';
  };

  return (
    <div className="calculator-page">
      <div className="container">
        {/* Header */}
        <div className="calculator-header">
          <h1 className="calculator-main-title">Calculadora de IMC</h1>
          <p className="calculator-subtitle">
            Calcule seu Índice de Massa Corporal com precisão e receba orientações personalizadas para sua saúde
          </p>
        </div>

        <div className="calculator-layout">
          {/* Coluna da Esquerda - Calculadora */}
          <div className="calculator-card">
            <div className="calculator-title">
              <div className="calculator-icon">
                <Calculator size={24} />
              </div>
              Calculadora de IMC
            </div>
            <p className="calculator-description">
              Informe seu peso e altura para calcular seu IMC e receber uma análise completa da sua saúde
            </p>

            {/* Sistema de Unidades */}
            <div className="unit-system">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`unit-btn ${unitSystem === 'metric' ? 'active' : ''}`}
              >
                Métrico (kg/m)
              </button>
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`unit-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
              >
                Imperial (lb/in)
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleCalculate} className="calculator-form">
              {/* Peso */}
              <div className="input-group">
                <label className="input-label">
                  <Scale size={18} />
                  Peso ({unitSystem === 'metric' ? 'kg' : 'lb'})
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unitSystem === 'metric' ? 'Ex: 70.5' : 'Ex: 155'}
                    className={`calculator-input ${errors.weight ? 'error' : ''}`}
                  />
                  <span className="input-unit">{unitSystem === 'metric' ? 'kg' : 'lb'}</span>
                </div>
                {errors.weight && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {errors.weight}
                  </div>
                )}
              </div>

              {/* Altura */}
              <div className="input-group">
                <label className="input-label">
                  <Ruler size={18} />
                  Altura ({unitSystem === 'metric' ? 'metros' : 'polegadas'})
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    step="0.01"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unitSystem === 'metric' ? 'Ex: 1.75' : 'Ex: 70'}
                    className={`calculator-input ${errors.height ? 'error' : ''}`}
                  />
                  <span className="input-unit">{unitSystem === 'metric' ? 'm' : 'in'}</span>
                </div>
                {errors.height && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {errors.height}
                  </div>
                )}
                {unitSystem === 'imperial' && height && (
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '4px' }}>
                    {Math.floor(height / 12)}ft {height % 12}in
                  </div>
                )}
              </div>

              <button type="submit" className="calculate-btn">
                Calcular IMC
              </button>
            </form>

            {/* Ações Rápidas */}
            <div className="quick-actions">
              <Link to="/history" className="quick-action-btn">
                <History size={20} />
                Ver Histórico
              </Link>
              <Link to="/info" className="quick-action-btn">
                <Info size={20} />
                Informações sobre IMC
              </Link>
            </div>
          </div>

          {/* Coluna da Direita - Resultados */}
          <div className="results-area">
            {!result ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Calculator size={32} />
                </div>
                <h3 className="empty-title">Calcule seu IMC</h3>
                <p className="empty-description">
                  Preencha seus dados à esquerda para calcular seu Índice de Massa Corporal 
                  e receber uma análise completa da sua saúde com recomendações personalizadas.
                </p>
              </div>
            ) : (
              <>
                {/* Card de Resultado Principal */}
                <div className="result-card">
                  <div className="result-header">
                    <h3 className="result-title">Seu Resultado de IMC</h3>
                    <div className="result-risk">
                      <AlertCircle size={16} />
                      Nível de Risco: {result.classification.risk}
                    </div>
                  </div>
                  
                  <div className="result-main">
                    <div className="result-value">{result.imc}</div>
                    <div 
                      className="result-classification"
                      style={{ background: getClassificationColor(result.classification.severity) }}
                    >
                      <TrendingUp size={20} />
                      {result.classification.category}
                    </div>
                  </div>

                  {/* Informações Detalhadas da Classificação */}
                  <div className="classification-info">
                    <div className="classification-header">
                      <Info size={24} />
                      <h4 className="classification-title">Sobre esta Classificação</h4>
                    </div>
                    
                    <p className="classification-description">
                      {getClassificationDescription(result.classification.severity)}
                    </p>

                    <div className="risks-grid">
                      {getRisksForClassification(result.classification.severity).map((risk, index) => (
                        <div key={index} className={`risk-item ${risk.level}`}>
                          <div className="risk-icon">
                            <AlertTriangle size={16} />
                          </div>
                          <span className="risk-text">{risk.text}</span>
                        </div>
                      ))}
                    </div>

                    {result.classification.severity.includes('obese') && (
                      <div className="medical-alert">
                        <h4>⚠️ Acompanhamento Médico Recomendado</h4>
                        <p>
                          Esta classificação indica a necessidade de acompanhamento médico regular 
                          para prevenção e tratamento de condições relacionadas. Consulte um médico 
                          para avaliação completa.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dados Pessoais */}
                  <div className="personal-data">
                    <div className="data-card">
                      <div className="data-label">Peso Atual</div>
                      <div className="data-value">{result.weight}</div>
                      <div className="data-unit">{unitSystem === 'metric' ? 'quilogramas' : 'libras'}</div>
                    </div>
                    
                    <div className="data-card">
                      <div className="data-label">Altura</div>
                      <div className="data-value">{result.height}</div>
                      <div className="data-unit">{unitSystem === 'metric' ? 'metros' : 'polegadas'}</div>
                    </div>
                    
                    <div className="data-card">
                      <div className="data-label">Classificação</div>
                      <div className="data-value" style={{ color: getClassificationColor(result.classification.severity) }}>
                        {result.classification.category.split(' ')[0]}
                      </div>
                      <div className="data-unit">IMC</div>
                    </div>
                  </div>

                  {/* Faixa Saudável */}
                  <div className="healthy-range-card">
                    <div className="healthy-range-content">
                      <div className="healthy-range-title">Faixa de Peso Ideal</div>
                      <div className="healthy-range-value">
                        {result.healthyRange.min}kg - {result.healthyRange.max}kg
                      </div>
                      <div className="healthy-range-description">
                        Peso recomendado para sua altura de acordo com padrões internacionais de saúde
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gauge de Classificação */}
                <div className="gauge-container">
                  <h4 className="gauge-title">Escala de Classificação IMC</h4>
                  
                  <div className="gauge-wrapper">
                    <div className="gauge-scale">
                      <div 
                        className="gauge-needle"
                        style={{ 
                          left: `${Math.min(Math.max(((result.imc - 15) / (40 - 15)) * 100, 2), 98)}%` 
                        }}
                      />
                    </div>
                    
                    <div className="gauge-labels">
                      <div className="gauge-label">15<br/>Abaixo</div>
                      <div className="gauge-label">18.5<br/>Normal</div>
                      <div className="gauge-label">25<br/>Sobrepeso</div>
                      <div className="gauge-label">30<br/>Obesidade I</div>
                      <div className="gauge-label">35<br/>Obesidade II</div>
                      <div className="gauge-label">40+<br/>Obesidade III</div>
                    </div>
                  </div>

                  <div className="classification-legend">
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: 'var(--underweight)' }}></div>
                      <span className="legend-text">Abaixo do Peso</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: 'var(--normal)' }}></div>
                      <span className="legend-text">Peso Normal</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: 'var(--overweight)' }}></div>
                      <span className="legend-text">Sobrepeso</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: 'var(--obese1)' }}></div>
                      <span className="legend-text">Obesidade I</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: 'var(--obese2)' }}></div>
                      <span className="legend-text">Obesidade II</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color" style={{ background: 'var(--obese3)' }}></div>
                      <span className="legend-text">Obesidade III</span>
                    </div>
                  </div>
                </div>

                {/* Ações Recomendadas */}
                <div className="actions-grid">
                  <div className={`action-card ${getSeverityLevel(result.classification.severity) === 'very-high' ? 'urgent' : getSeverityLevel(result.classification.severity) === 'high' ? 'important' : 'recommended'}`}>
                    <div className="action-icon">
                      <Heart size={24} />
                    </div>
                    <h5 className="action-title">Acompanhamento Médico</h5>
                    <p className="action-description">
                      {result.classification.severity.includes('obese') 
                        ? 'Consulte um endocrinologista ou nutricionista para avaliação completa e plano de tratamento personalizado.'
                        : 'Mantenha consultas regulares com seu médico para monitoramento da saúde.'}
                    </p>
                  </div>
                  
                  <div className={`action-card ${getSeverityLevel(result.classification.severity) === 'very-high' ? 'urgent' : 'important'}`}>
                    <div className="action-icon">
                      <Activity size={24} />
                    </div>
                    <h5 className="action-title">Atividade Física</h5>
                    <p className="action-description">
                      {result.classification.severity.includes('obese') 
                        ? 'Inicie atividades físicas supervisionadas, focando em exercícios de baixo impacto e fortalecimento muscular.'
                        : 'Pratique pelo menos 150 minutos de atividade física moderada por semana.'}
                    </p>
                  </div>
                  
                  <div className={`action-card ${getSeverityLevel(result.classification.severity) === 'very-high' ? 'urgent' : 'important'}`}>
                    <div className="action-icon">
                      <Utensils size={24} />
                    </div>
                    <h5 className="action-title">Plano Alimentar</h5>
                    <p className="action-description">
                      {result.classification.severity === 'underweight'
                        ? 'Busque orientação nutricional para dieta com aumento calórico saudável e nutrientes essenciais.'
                        : result.classification.severity === 'normal'
                        ? 'Mantenha alimentação balanceada com frutas, vegetais e proteínas magras.'
                        : 'Busque orientação nutricional para dieta balanceada com déficit calórico controlado.'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IMCCalculatorPage;