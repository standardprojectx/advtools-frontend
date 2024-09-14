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
      const response = await fetch('https://advtools-backend.onrender.com/convert', {
        method: 'POST',
        body: formData,
      });
    
      if (response.ok) {
        const blob = await response.blob();
        const contentDisposition = response.headers.get('Content-Disposition');
        
        let fileName = 'downloaded-file'; 
        
        if (contentDisposition) {
          const originalFileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
          const fileExtension = getConvertedFileExtension(conversionType);
          const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
          fileName = `${baseName}-converted.${fileExtension}`;
        }
      
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName; 
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
          
      } else {
        const result = await response.json();
        alert(`Erro na conversão: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao converter arquivos:', error);
    }
  };

  const getConvertedFileExtension = (conversionType) => {
    switch (conversionType) {
      case 'opusToOgg':
        return 'ogg';
      case 'webmToOgg':
        return 'ogg';
      case 'mp4ToWebm':
        return 'webm';
      default:
        return '';
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
        <option value="" disabled>Selecione uma conversão</option>
        <option value="opusToOgg">Converter OPUS para OGG</option>
        <option value="webmToOgg">Converter WEBM para OGG</option>
        <option value="mp4ToWebm">Converter MP4 para WEBM</option>
      </select>
      <button className="convert" onClick={convertFiles}>Converter Áudio</button>
      <button className="convert" onClick={clearResults}>Limpar</button>
    </div>
  );
};

export default AudioSection;
