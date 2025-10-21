import React from 'react';
import { classifyIMC } from '../../utils/imcCalculations';

const BMIGauge = ({ imc }) => {
  const classifications = [
    { max: 18.5, label: 'Abaixo', color: 'bg-health-underweight' },
    { max: 25, label: 'Normal', color: 'bg-health-normal' },
    { max: 30, label: 'Sobrepeso', color: 'bg-health-overweight' },
    { max: 35, label: 'Obesidade I', color: 'bg-health-obese1' },
    { max: 40, label: 'Obesidade II', color: 'bg-health-obese2' },
    { max: 100, label: 'Obesidade III', color: 'bg-health-obese3' },
  ];

  const currentClassification = classifyIMC(imc);
  const needlePosition = Math.min(Math.max(((imc - 15) / (40 - 15)) * 100, 0), 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Classificação IMC
      </h3>
      
      {/* Gauge Container */}
      <div className="relative h-48 mb-6">
        {/* Gauge Background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-health-underweight via-health-normal through-health-overweight to-health-obese3 rounded-t-full health-gradient"></div>
        
        {/* Needle */}
        <div
          className="absolute top-0 w-1 h-32 bg-gray-900 transform origin-bottom transition-all duration-1000 ease-out"
          style={{
            left: `${needlePosition}%`,
            transform: `rotate(${needlePosition * 1.8 - 90}deg)`,
          }}
        >
          <div className="w-3 h-3 bg-gray-900 rounded-full -ml-1 -mt-1"></div>
        </div>
        
        {/* Center circle */}
        <div className="absolute left-1/2 top-32 -ml-3 -mt-3 w-6 h-6 bg-gray-900 rounded-full border-4 border-white"></div>
        
        {/* Labels */}
        <div className="absolute top-36 left-0 right-0 flex justify-between text-xs text-gray-600">
          <span>15</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>35</span>
          <span>40</span>
        </div>
      </div>

      {/* Current IMC Display */}
      <div className="text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold ${currentClassification.severity === 'underweight' ? 'bg-health-underweight' : ''}${currentClassification.severity === 'normal' ? 'bg-health-normal' : ''}${currentClassification.severity === 'overweight' ? 'bg-health-overweight' : ''}${currentClassification.severity === 'obese1' ? 'bg-health-obese1' : ''}${currentClassification.severity === 'obese2' ? 'bg-health-obese2' : ''}${currentClassification.severity === 'obese3' ? 'bg-health-obese3' : ''}`}>
          <span className="text-2xl mr-2">{imc}</span>
          <span>{currentClassification.category}</span>
        </div>
      </div>

      {/* Classification Legend */}
      <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
        {classifications.map((classification, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded ${classification.color}`}></div>
            <span className="text-gray-600">{classification.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BMIGauge;