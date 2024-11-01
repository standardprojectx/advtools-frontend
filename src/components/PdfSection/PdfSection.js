import React, { useState } from 'react';
import './styles.css';
import { FaUpload } from 'react-icons/fa'; // Ícone de upload

const PdfSection = () => {
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

  const convertPdf = async () => {
    const files = document.getElementById('pdfInput').files;
    const action = document.getElementById('pdfActionSelect').value;

    if (files.length === 0 || !action) {
      alert('Por favor, selecione pelo menos um arquivo e uma ação.');
      return;
    }

    const formData = new FormData();
    formData.append('conversionType', action);
    Array.from(files).forEach(file => formData.append('files', file));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/convert/pdf`, {
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
      console.error('Erro ao realizar a ação:', error);
    }
  };

  const clearResults = () => {
    document.getElementById('pdfInput').value = '';
    document.getElementById('pdfActionSelect').value = '';
    setSelectedFiles(null);
  };

  return (
    <div className="section-pdf">
      <div className="title-header">
        <h2>PDF's</h2>
      </div>
      <div className="section-pdf-selection">
        <label className="custom-file-upload">
          <input type="file" id="pdfInput" accept="application/pdf" onChange={handleFileChange} />
          <FaUpload size={24} />
          <span>{selectedFiles || 'Selecione os Arquivos'}</span>
        </label>
        <select id="pdfActionSelect" className="custom-select" defaultValue="">
          <option value="" disabled>Selecione uma ação</option>
          <option value="mergePdfs">Juntar PDFs</option>
          <option value="splitPdf">Separar PDF</option>
        </select>
      </div>
      <div className="buttons">
        <button className="convert-pdf-btn" onClick={convertPdf}>Converter</button>
        <button className="clear-pdf-btn" onClick={clearResults}>Limpar</button>
      </div>
    </div>
  );
};

export default PdfSection;
