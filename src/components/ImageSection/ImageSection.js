import React, { useState } from 'react';
import './styles.css';
import { FaUpload, FaPlus } from 'react-icons/fa'; 

const ImageSection = () => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
     
      const newFiles = files.filter(file => 
        !selectedFiles.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)
      );
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const convertFiles = async () => {
    if (selectedFiles.length === 0) {
      alert('Por favor, selecione pelo menos uma imagem.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

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
    setSelectedFiles([]);
    setDownloadUrl(null);
    setErrorMessage(null);
  };

  return (
    <div className="section-image">
      <div className='title-header-image'>
        <h2>Imagens</h2>
      </div>
      <hr style={{backgroundColor: 'red', borderColor: '#5C5470', borderWidth: 1}} />
      <div className='section-image-selection'>
        <label className="custom-file-upload">
          <input type="file" id="imageInput" multiple accept="image/*" onChange={handleFileChange} />

          <div className="upload-container">
            <div className="icon-container">
              {selectedFiles.length > 0 ? <FaPlus size={24} /> : <FaUpload size={24} />}
            </div>
            <span className="upload-text">
              {selectedFiles.length > 0 ? 'Adicionar mais arquivos' : 'Escolher Arquivos'}
            </span>
          </div>
        </label>
      </div>

      {/* Exibir os arquivos selecionados */}
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-chip">
              <span className="file-name">{file.name}</span>
              <button className="remove-btn" onClick={() => removeFile(index)} aria-label={`Remover ${file.name}`}>x</button>
            </div>
          ))}
        </div>
      )}

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
        <div className="download-section">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Baixar PDF Convertido
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageSection;
