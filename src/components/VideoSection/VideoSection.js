import React from 'react';
import './styles.css'; 

const VideoSection = () => {
  const convertFiles = async () => {
    const files = document.getElementById('videoInput').files;
    const conversionType = document.getElementById('videoConversionSelect').value;

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
        const fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName; // Nome dinâmico do arquivo
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

  const clearResults = () => {
    document.getElementById('videoInput').value = '';
    document.getElementById('videoConversionSelect').value = '';
  };

  return (
    <div className="section">
      <h2>Vídeo</h2>
      <input type="file" id="videoInput" multiple accept="video/*" />
      <select id="videoConversionSelect">
        <option value="" disabled>Selecione uma conversão</option>
        <option value="mp4ToWebm">Converter MP4 para WEBM</option>
      </select>
      <button className="convert" onClick={convertFiles}>Converter Vídeo</button>
      <button className="convert" onClick={clearResults}>Limpar</button>
    </div>
  );
};

export default VideoSection;
