import React from 'react';
import './styles.css'; 

const ImageSection = () => {
  const convertFiles = async () => {
    const files = document.getElementById('imageInput').files;
    if (files.length === 0) {
      alert('Por favor, selecione pelo menos uma imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('conversionType', 'imageToPdf');
    Array.from(files).forEach(file => formData.append('files', file));

    try {
      const response = await fetch('http://localhost:3001/convert', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(`Conversão realizada: ${result.message}`);
    } catch (error) {
      console.error('Erro ao converter arquivos:', error);
    }
  };

  const clearResults = () => {
    document.getElementById('imageInput').value = '';
  };

  return (
    <div className="section">
      <h2>Imagens</h2>
      <input type="file" id="imageInput" multiple accept="image/*" />
      <button className="convert" onClick={convertFiles}>Converter Imagens para PDF</button>
      <button className="convert" onClick={clearResults}>Limpar</button>
    </div>
  );
};

export default ImageSection;
