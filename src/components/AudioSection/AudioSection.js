import React, { useState } from 'react';
import './styles.css';

const AudioSection = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');

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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/convert/audio`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const { downloadUrl } = result;


        setDownloadUrl(`${process.env.REACT_APP_BACKEND_URL}${downloadUrl}`);
        setFileName(getFileNameFromUrl(downloadUrl));

        alert('Conversão concluída! Clique no botão de download para baixar o arquivo.');
      } else {
        const result = await response.json();
        alert(`Erro na conversão: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao converter arquivos:', error);
      alert('Ocorreu um erro ao converter os arquivos.');
    }
  };

  const getFileNameFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const clearResults = () => {
    document.getElementById('audioInput').value = '';
    document.getElementById('audioConversionSelect').value = '';
    setDownloadUrl('');
    setFileName('');
  };

  return (
    <div className="section">
      <h2>Áudio</h2>
      <input type="file" id="audioInput" multiple accept="audio/*" />
      <select id="audioConversionSelect" defaultValue="">
        <option value="" disabled>
          Selecione uma conversão
        </option>
        <option value="opusToOgg">Converter OPUS para OGG</option>
        <option value="webmToOgg">Converter WEBM para OGG</option>
        <option value="mp4ToWebm">Converter MP4 para WEBM</option>
      </select>
      <button className="convert" onClick={convertFiles}>
        Converter Áudio
      </button>
      <button className="convert" onClick={clearResults}>
        Limpar
      </button>

      {downloadUrl && (
        <div className="download-section">
          <p>Conversão concluída!</p>
          <a href={downloadUrl} download={fileName}>
            <button className="download-button">Baixar Arquivo Convertido</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioSection;
