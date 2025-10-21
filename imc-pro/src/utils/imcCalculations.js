export const calculateIMC = (weight, height, unitSystem = 'metric') => {
  if (!weight || !height || weight <= 0 || height <= 0) return null;
  
  let weightKg = weight;
  let heightM = height;
  
  if (unitSystem === 'imperial') {
    // Convert pounds to kg
    weightKg = weight * 0.453592;
    // Convert feet/inches to meters
    heightM = height * 0.0254;
  }
  
  const imc = weightKg / (heightM * heightM);
  return Math.round(imc * 10) / 10;
};

export const classifyIMC = (imc) => {
  if (imc < 18.5) return {
    category: 'Abaixo do peso',
    severity: 'underweight',
    color: '#3b82f6',
    risk: 'Moderado'
  };
  if (imc < 25) return {
    category: 'Peso normal',
    severity: 'normal',
    color: '#10b981',
    risk: 'Baixo'
  };
  if (imc < 30) return {
    category: 'Sobrepeso',
    severity: 'overweight',
    color: '#f59e0b',
    risk: 'Aumentado'
  };
  if (imc < 35) return {
    category: 'Obesidade Grau I',
    severity: 'obese1',
    color: '#f97316',
    risk: 'Moderado'
  };
  if (imc < 40) return {
    category: 'Obesidade Grau II',
    severity: 'obese2',
    color: '#ef4444',
    risk: 'Severo'
  };
  return {
    category: 'Obesidade Grau III',
    severity: 'obese3',
    color: '#dc2626',
    risk: 'Muito Severo'
  };
};

export const calculateHealthyRange = (height, unitSystem = 'metric') => {
  let heightM = height;
  if (unitSystem === 'imperial') {
    heightM = height * 0.0254;
  }
  
  const minWeight = 18.5 * (heightM * heightM);
  const maxWeight = 24.9 * (heightM * heightM);
  
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10
  };
};