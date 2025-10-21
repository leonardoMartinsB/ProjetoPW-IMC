import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Funções de cálculo (caso não tenha o arquivo imcCalculations)
const calculateIMC = (weight, height, unitSystem) => {
  if (!weight || !height || weight <= 0 || height <= 0) return null;
  
  if (unitSystem === 'metric') {
    // kg e metros
    return weight / (height * height);
  } else {
    // lbs e polegadas
    return (weight / (height * height)) * 703;
  }
};

const classifyIMC = (imc) => {
  if (imc < 18.5) {
    return { 
      category: 'Abaixo do peso', 
      severity: 'underweight', 
      risk: 'Baixo' 
    };
  } else if (imc < 25) {
    return { 
      category: 'Peso normal', 
      severity: 'normal', 
      risk: 'Normal' 
    };
  } else if (imc < 30) {
    return { 
      category: 'Sobrepeso', 
      severity: 'overweight', 
      risk: 'Aumentado' 
    };
  } else if (imc < 35) {
    return { 
      category: 'Obesidade Grau I', 
      severity: 'obese1', 
      risk: 'Moderado' 
    };
  } else if (imc < 40) {
    return { 
      category: 'Obesidade Grau II', 
      severity: 'obese2', 
      risk: 'Severo' 
    };
  } else {
    return { 
      category: 'Obesidade Grau III', 
      severity: 'obese3', 
      risk: 'Muito severo' 
    };
  }
};

const calculateHealthyRange = (height, unitSystem) => {
  if (unitSystem === 'metric') {
    const min = 18.5 * (height * height);
    const max = 24.9 * (height * height);
    return { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10 };
  } else {
    // Para sistema imperial
    const min = (18.5 * (height * height)) / 703;
    const max = (24.9 * (height * height)) / 703;
    return { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10 };
  }
};

export const useIMC = () => {
  const [history, setHistory] = useLocalStorage('imcHistory', []);
  const [unitSystem, setUnitSystem] = useState('metric');
  
  const addToHistory = useCallback((calculation) => {
    const newEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...calculation
    };
    
    setHistory(prev => [newEntry, ...prev]);
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const deleteFromHistory = useCallback((id) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  }, [setHistory]);

  const calculate = useCallback((weight, height) => {
    const imc = calculateIMC(parseFloat(weight), parseFloat(height), unitSystem);
    if (!imc || isNaN(imc)) return null;

    const classification = classifyIMC(imc);
    const healthyRange = calculateHealthyRange(parseFloat(height), unitSystem);
    
    const result = {
      imc: Math.round(imc * 100) / 100, // 2 casas decimais
      weight: parseFloat(weight),
      height: parseFloat(height),
      unitSystem,
      classification,
      healthyRange
    };
    
    addToHistory(result);
    return result;
  }, [unitSystem, addToHistory]);

  return {
    history,
    calculate,
    clearHistory,
    deleteFromHistory,
    unitSystem,
    setUnitSystem
  };
};