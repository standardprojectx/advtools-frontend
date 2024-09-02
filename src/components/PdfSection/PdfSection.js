import React from 'react';
import './styles.css'; 

const PdfSection = () => {
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
      const response = await fetch('http://localhost:3001/convert', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(`Ação realizada: ${result.message}`);
    } catch (error) {
      console.error('Erro ao realizar a ação:', error);
    }
  };

  const clearResults = () => {
    document.getElementById('pdfInput').value = '';
    document.getElementById('pdfActionSelect').value = '';
  };

  return (
    <div className="section">
      <h2>PDFs</h2>
      <input type="file" id="pdfInput" accept="application/pdf" />
      <select id="pdfActionSelect">
        <option value="" disabled>Selecione uma ação</option>
        <option value="mergePdfs">Juntar PDFs</option>
        <option value="splitPdf">Separar PDF</option>
      </select>
      <button className="convert" onClick={convertPdf}>Converter</button>
      <button className="convert" onClick={clearResults}>Limpar</button>
    </div>
  );
};

export default PdfSection;
