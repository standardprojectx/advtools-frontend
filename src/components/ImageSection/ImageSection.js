import React, { useState } from 'react';
import './styles.css';
import { FaUpload, FaFilePdf,FaRegFilePdf } from 'react-icons/fa'; 

const ImageSection = () => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null); 

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name).join(', ');
      setSelectedFiles(fileNames); 
    } else {
      setSelectedFiles(null); 
    }
  };

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
    setSelectedFiles(null);
    setDownloadUrl(null);
    setErrorMessage(null);
  };

  return (
    <div className="section-image">
      <div className='title-header-image'>
        <h2>Imagens</h2>
      </div>
      <div className='section-image-selection'>
        <label className="custom-file-upload">
          <input type="file" id="imageInput" multiple accept="image/*" onChange={handleFileChange} />
          <FaUpload size={32} />
          <div style={{marginTop: 10}}>
          {selectedFiles ? null : 'Escolher Arquivos'}
          </div>
        </label>
        <label style={{marginTop: 20}}>
          {selectedFiles ? `Selecionado(s): ${selectedFiles}` : null}
        </label>
      </div>
      <div className="buttons">
        <button className="convert-image-btn" onClick={convertFiles} disabled={isLoading}>
          {isLoading ? 'Convertendo...' : 'Converter'}
        </button>
        <button className="clean-image-btn" onClick={clearResults} disabled={isLoading}>
          Limpar
        </button>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {downloadUrl && (
        <div style={{marginTop: 20}}>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Baixar PDF Convertido
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageSection;
