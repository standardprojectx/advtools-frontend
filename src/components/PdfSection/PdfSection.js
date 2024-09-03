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
      const response = await fetch('https://advtools-backend.vercel.app/convert', {
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
