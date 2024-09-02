import React, { useState } from 'react';
import './styles.css'; 

const PercentageSection = () => {
  const [percentage, setPercentage] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);

  const calculatePercentage = () => {
    if (!percentage || !value) {
      alert('Por favor, insira valores válidos.');
      return;
    }
    setResult((percentage / 100) * value);
  };

  const clearResults = () => {
    setPercentage('');
    setValue('');
    setResult(null);
  };

  return (
    <div className="section">
      <h2>Cálculo de Porcentagem</h2>
      <input
        type="number"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        placeholder="Digite a porcentagem"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite o valor"
      />
      <button className="convert" onClick={calculatePercentage}>Calcular</button>
      {result !== null && <div id="percentageResult">Resultado: {result}</div>}
      <button className="convert" onClick={clearResults}>Limpar</button>
    </div>
  );
};

export default PercentageSection;
