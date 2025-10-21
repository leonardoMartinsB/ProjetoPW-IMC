import React from 'react';
import { Heart, Utensils, Activity, Moon, AlertCircle } from 'lucide-react';

const Recommendations = ({ classification }) => {
  const generalRecommendations = [
    {
      icon: Utensils,
      title: 'Alimentação Balanceada',
      tips: [
        'Consuma frutas e vegetais variados',
        'Prefira grãos integrais',
        'Reduza alimentos processados',
        'Mantenha hidratação adequada'
      ]
    },
    {
      icon: Activity,
      title: 'Atividade Física',
      tips: [
        '150 minutos de exercícios moderados por semana',
        'Inclua treino de força 2x por semana',
        'Evite longos períodos sedentários',
        'Encontre atividades que goste'
      ]
    },
    {
      icon: Moon,
      title: 'Qualidade do Sono',
      tips: [
        '7-9 horas de sono por noite',
        'Mantenha horário regular',
        'Ambiente escuro e silencioso',
        'Evite telas antes de dormir'
      ]
    }
  ];

  const specificRecommendations = {
    underweight: {
      icon: AlertCircle,
      color: 'text-health-underweight',
      bgColor: 'bg-health-underweight/10',
      recommendations: [
        'Consulte um nutricionista para plano alimentar',
        'Foque em alimentos nutritivos e calóricos',
        'Pratique exercícios de força',
        'Estabeleça rotina alimentar regular'
      ]
    },
    normal: {
      icon: Heart,
      color: 'text-health-normal',
      bgColor: 'bg-health-normal/10',
      recommendations: [
        'Mantenha hábitos saudáveis atuais',
        'Continue com atividade física regular',
        'Faça check-ups anuais',
        'Mantenha alimentação equilibrada'
      ]
    },
    overweight: {
      icon: AlertCircle,
      color: 'text-health-overweight',
      bgColor: 'bg-health-overweight/10',
      recommendations: [
        'Busque orientação nutricional',
        'Aumente gradualmente atividade física',
        'Estabeleça metas realistas',
        'Monitore progresso regularmente'
      ]
    },
    obese1: {
      icon: AlertCircle,
      color: 'text-health-obese1',
      bgColor: 'bg-health-obese1/10',
      recommendations: [
        'Procure acompanhamento médico',
        'Considere programa de perda de peso',
        'Combine dieta e exercício',
        'Participe de grupos de apoio'
      ]
    },
    obese2: {
      icon: AlertCircle,
      color: 'text-health-obese2',
      bgColor: 'bg-health-obese2/10',
      recommendations: [
        'Acompanhamento médico essencial',
        'Avaliação de comorbidades',
        'Plano de tratamento estruturado',
        'Possível intervenção medicamentosa'
      ]
    },
    obese3: {
      icon: AlertCircle,
      color: 'text-health-obese3',
      bgColor: 'bg-health-obese3/10',
      recommendations: [
        'Atenção médica urgente',
        'Avaliação para cirurgia bariátrica',
        'Tratamento multidisciplinar',
        'Monitoramento constante'
      ]
    }
  };

  const specific = specificRecommendations[classification.severity];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Recomendações Personalizadas
      </h3>

      {/* Recomendações Específicas */}
      <div className={`p-4 rounded-lg mb-6 ${specific.bgColor}`}>
        <div className="flex items-center space-x-2 mb-3">
          <specific.icon className={`h-5 w-5 ${specific.color}`} />
          <h4 className={`font-semibold ${specific.color}`}>
            Para {classification.category}
          </h4>
        </div>
        <ul className="space-y-2">
          {specific.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <div className="w-1 h-1 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recomendações Gerais */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Recomendações Gerais de Saúde</h4>
        {generalRecommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className="h-4 w-4 text-primary-600" />
                <h5 className="font-medium text-gray-900">{rec.title}</h5>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                {rec.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <span className="text-primary-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          <strong>Importante:</strong> Estas são recomendações gerais. Consulte sempre um profissional de saúde para orientação personalizada.
        </p>
      </div>
    </div>
  );
};

export default Recommendations;