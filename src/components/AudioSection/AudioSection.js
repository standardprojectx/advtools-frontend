import React from 'react';
import './styles.css'; 

const AudioSection = () => {
  const convertFiles = async () => {
    const files = document.getElementById('audioInput').files;
    const conversionType = document.getElementById('audioConversionSelect').value;

    if (files.length === 0 || !conversionType) {
      alert('Por favor, selecione pelo menos um arquivo e um tipo de conversão.');
      return;
    }

    const formData = new FormData();
    formData.append('conversionType', conversionType);
    Array.from(files).forEach(file => formData.append('files', file));

    try {
      const response = await fetch('http://localhost:3001/convert', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(`Conversão realizada: ${result.message}`);
    } catch (error) {
      console.error('Erro ao converter arquivos:', error);
    }
  };

  const clearResults = () => {
    document.getElementById('audioInput').value = '';
    document.getElementById('audioConversionSelect').value = '';
  };

  return (
    <div className="section">
      <h2>Áudio</h2>
      <input type="file" id="audioInput" multiple accept="audio/*" />
      <select id="audioConversionSelect">
        <option value="" disabled selected>Selecione uma conversão</option>
        <option value="opusToOgg">Converter OPUS para OGG</option>
        <option value="webmToOgg">Converter WEBM para OGG</option>
      </select>
      <button className="convert" onClick={convertFiles}>Converter Áudio</button>
      <button className="convert" onClick={clearResults}>Limpar</button>
    </div>
  );
};

export default AudioSection;
