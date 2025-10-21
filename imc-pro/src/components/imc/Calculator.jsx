import React, { useState } from 'react';
import { Calculator, Scale, Ruler, AlertCircle } from 'lucide-react';
import { calculateIMC, classifyIMC } from '../../utils/imcCalculations';

const IMCCalculator = ({ onCalculate, unitSystem, onUnitChange }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState({});

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
      const result = {
        imc: calculateIMC(parseFloat(weight), parseFloat(height), unitSystem),
        weight: parseFloat(weight),
        height: parseFloat(height),
        unitSystem,
        classification: classifyIMC(calculateIMC(parseFloat(weight), parseFloat(height), unitSystem)),
        date: new Date().toLocaleDateString('pt-BR')
      };
      
      onCalculate(result);
    }
  };

  const handleUnitChange = (newUnit) => {
    onUnitChange(newUnit);
    setWeight('');
    setHeight('');
    setErrors({});
  };

  return (
    <div className="card card-hover max-w-md mx-auto p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Calculator className="h-6 w-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Calculadora de IMC</h2>
      </div>

      {/* Unit Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleUnitChange('metric')}
          className={`btn flex-1 ${unitSystem === 'metric' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Métrico (kg/m)
        </button>
        <button
          onClick={() => handleUnitChange('imperial')}
          className={`btn flex-1 ${unitSystem === 'imperial' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Imperial (lb/in)
        </button>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6">
        {/* Weight Input */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Scale className="h-4 w-4" />
            <span>Peso ({unitSystem === 'metric' ? 'kg' : 'lb'})</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unitSystem === 'metric' ? 'Ex: 70.5' : 'Ex: 155'}
            className={`input ${errors.weight ? 'input-error' : ''}`}
          />
          {errors.weight && (
            <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.weight}</span>
            </div>
          )}
        </div>

        {/* Height Input */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Ruler className="h-4 w-4" />
            <span>Altura ({unitSystem === 'metric' ? 'metros' : 'polegadas'})</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unitSystem === 'metric' ? 'Ex: 1.75' : 'Ex: 70'}
            className={`input ${errors.height ? 'input-error' : ''}`}
          />
          {errors.height && (
            <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.height}</span>
            </div>
          )}
          {unitSystem === 'imperial' && (
            <p className="text-xs text-gray-500 mt-1">
              {height ? `${Math.floor(height / 12)}ft ${height % 12}in` : 'Ex: 5ft 10in = 70in'}
            </p>
          )}
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg"
        >
          Calcular IMC
        </button>
      </form>
    </div>
  );
};

export default IMCCalculator;