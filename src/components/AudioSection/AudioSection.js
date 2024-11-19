import React, { useState } from 'react';
import './styles.css';
import { FaUpload, FaPlus, FaSpinner } from 'react-icons/fa';

const AudioSection = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const MAX_FILES = 10;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFiles = files.filter(file => 
        !selectedFiles.some(existingFile => 
          existingFile.name === file.name && 
          existingFile.size === file.size &&
          existingFile.lastModified === file.lastModified
        )
      );

      const totalFiles = selectedFiles.length + newFiles.length;
      if (totalFiles > MAX_FILES) {
        alert(`Você pode selecionar no máximo ${MAX_FILES} arquivos.`);
        newFiles.splice(MAX_FILES - selectedFiles.length);
      }

      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const convertFiles = async () => {
    const conversionType = document.getElementById('audioConversionSelect').value;

    if (selectedFiles.length === 0 || !conversionType) {
      alert('Por favor, selecione pelo menos um arquivo e um tipo de conversão.');
      return;
    }

    const formData = new FormData();
    formData.append('conversionType', conversionType);
    selectedFiles.forEach(file => formData.append('files', file));

    try {
      setIsLoading(true); 
      setErrorMessage(null); 

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
        setErrorMessage(`Erro na conversão: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao converter arquivos:', error);
      setErrorMessage('Ocorreu um erro ao converter os arquivos.');
    } finally {
      setIsLoading(false); 
    }
  };

  const getFileNameFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const clearResults = () => {
    document.getElementById('audioInput').value = '';
    document.getElementById('audioConversionSelect').value = '';
    setSelectedFiles([]);
    setDownloadUrl('');
    setFileName('');
    setErrorMessage(null);
  };

  return (
    <div className="section-audio">
      <div className="title-header-audio">
        <h2>Áudio</h2>
      </div>
      <hr style={{backgroundColor: 'red', borderColor: '#5C5470', borderWidth: 1}} />
      <div className="section-audio-selection">
        <label className="custom-file-upload">
          <input
            type="file"
            id="audioInput"
            multiple
            accept="audio/*"
            onChange={handleFileChange}
          />

          <div className="upload-container">
            <div className="icon-container">
              {selectedFiles.length > 0 ? <FaPlus size={24} /> : <FaUpload size={24} />}
            </div>
            <span className="upload-text">
              {selectedFiles.length > 0 ? 'Adicionar mais arquivos' : 'Escolher Arquivos'}
            </span>
          </div>
        </label>

       
        <select id="audioConversionSelect" className="custom-select" defaultValue="">
          <option value="" disabled>
            Selecione uma conversão
          </option>
          <option value="opusToOgg">Converter OPUS para OGG</option>
          <option value="webmToOgg">Converter WEBM para OGG</option>
          <option value="mp4ToWebm">Converter MP4 para WEBM</option>
        </select>
      </div>

   
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-chip">
              <span className="file-name">{file.name}</span>
              <button 
                className="remove-btn" 
                onClick={() => removeFile(index)} 
                aria-label={`Remover ${file.name}`}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="buttons">
        <button 
          className="convert-audio-btn" 
          onClick={convertFiles} 
          disabled={isLoading}
          aria-label="Converter arquivos selecionados"
        >
          {isLoading ? <FaSpinner className="spinner" /> : 'Converter'}
        </button>
        <button 
          className="clean-audio-btn" 
          onClick={clearResults} 
          disabled={isLoading}
          aria-label="Limpar todos os arquivos selecionados"
        >
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
