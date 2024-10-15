import React, { useState } from 'react';
import './styles.css'; 

const ImageSection = () => {

  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null);

  const convertFiles = async () => {
    const files = document.getElementById('imageInput').files;
    if (files.length === 0) {
      alert('Por favor, selecione pelo menos uma imagem.');
      return;
    }

    const formData = new FormData();

    Array.from(files).forEach(file => formData.append('files', file));

    try {
      setIsLoading(true); 
      setErrorMessage(null); 

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/convert/image`, { 
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
       
        const fullDownloadUrl = `${process.env.REACT_APP_BACKEND_URL}${result.downloadUrl}`;
        setDownloadUrl(fullDownloadUrl);
      } else {
        const result = await response.json();
        setErrorMessage(`Erro na conversão: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao converter arquivos:', error);
      setErrorMessage('Ocorreu um erro inesperado durante a conversão.');
    } finally {
      setIsLoading(false); 
    }
  };

  const clearResults = () => {
    document.getElementById('imageInput').value = '';
    setDownloadUrl(null);
    setErrorMessage(null);
  };

  return (
    <div className="section">
      <h2>Imagens</h2>
      <input type="file" id="imageInput" multiple accept="image/*" />
      <div className="buttons">
        <button className="convert" onClick={convertFiles} disabled={isLoading}>
          {isLoading ? 'Convertendo...' : 'Converter Imagens para PDF'}
        </button>
        <button className="convert" onClick={clearResults} disabled={isLoading}>
          Limpar
        </button>
      </div>
      

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {downloadUrl && (
        <div className="download-link">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Baixar PDF Convertido
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageSection;
