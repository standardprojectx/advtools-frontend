import React, { useState, useEffect } from 'react';
import ImageSection from '../ImageSection/ImageSection';
import AudioSection from '../AudioSection/AudioSection';
import VideoSection from '../VideoSection/VideoSection';
import PdfSection from '../PdfSection/PdfSection';
import PercentageSection from '../PercentageSection/PercentageSection';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './styles.css'; 

function Home() {
  const [activeSection, setActiveSection] = useState('imageSection');
  const [darkMode, setDarkMode] = useState(true); // Modo noturno como padrão

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
      <h1>AdvTools</h1>
      <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className="menu">
        <button onClick={() => showSection('imageSection')}>Imagens</button>
        <button onClick={() => showSection('audioSection')}>Áudio</button>
        <button onClick={() => showSection('videoSection')}>Vídeo</button>
        <button onClick={() => showSection('pdfSection')}>PDFs</button>
        <button onClick={() => showSection('percentageSection')}>Porcentagem</button>
      </div>
      <div className="sections-container">
        {activeSection === 'imageSection' && <ImageSection />}
        {activeSection === 'audioSection' && <AudioSection />}
        {activeSection === 'videoSection' && <VideoSection />}
        {activeSection === 'pdfSection' && <PdfSection />}
        {activeSection === 'percentageSection' && <PercentageSection />}
      </div>
    </div>
  );
}

export default Home;