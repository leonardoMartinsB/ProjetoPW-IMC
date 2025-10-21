import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const ResultCard = ({ result }) => {
  const getIcon = () => {
    switch (result.classification.severity) {
      case 'normal':
        return <CheckCircle className="h-8 w-8 text-health-normal" />;
      case 'underweight':
      case 'overweight':
        return <Info className="h-8 w-8 text-health-overweight" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-health-obese3" />;
    }
  };

  const getMessage = () => {
    switch (result.classification.severity) {
      case 'underweight':
        return 'Recomenda-se acompanhamento nutricional para ganho de peso saudável.';
      case 'normal':
        return 'Parabéns! Seu IMC está na faixa considerada saudável.';
      case 'overweight':
        return 'Recomenda-se adoção de hábitos mais saudáveis e atividade física regular.';
      case 'obese1':
        return 'Recomenda-se acompanhamento médico e mudanças no estilo de vida.';
      case 'obese2':
        return 'É importante buscar orientação médica especializada.';
      case 'obese3':
        return 'Recomenda-se acompanhamento médico especializado urgente.';
      default:
        return 'Consulte um profissional de saúde para avaliação detalhada.';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover border-l-4" 
         style={{ borderLeftColor: result.classification.color }}>
      <div className="flex items-start space-x-4">
        {getIcon()}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              IMC: {result.imc}
            </h3>
            <span 
              className="px-3 py-1 rounded-full text-white font-semibold text-sm"
              style={{ backgroundColor: result.classification.color }}
            >
              {result.classification.category}
            </span>
          </div>
          
          <p className="text-gray-700 mb-4">
            {getMessage()}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600">Peso Atual</div>
              <div className="font-semibold text-gray-900">
                {result.weight} {result.unitSystem === 'metric' ? 'kg' : 'lb'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600">Altura</div>
              <div className="font-semibold text-gray-900">
                {result.height} {result.unitSystem === 'metric' ? 'm' : 'in'}
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <strong>Faixa de peso saudável:</strong> {result.healthyRange.min}kg - {result.healthyRange.max}kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;