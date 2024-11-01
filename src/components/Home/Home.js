import React, { useState, useEffect } from 'react';
import ImageSection from '../ImageSection/ImageSection';
import AudioSection from '../AudioSection/AudioSection';
import PdfSection from '../PdfSection/PdfSection';
import CalculatorSection from '../CalculatorSection/CalculatorSection';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './styles.css';

function Home() {
  const [activeSection, setActiveSection] = useState('imageSection');
  const [fade, setFade] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const showSection = (sectionId) => {
    setFade(true); 
    setTimeout(() => {
      setActiveSection(sectionId); 
      setFade(false); 
    }, 200); 
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'green' }}>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <h1>AdvTools</h1>
          </div>
          <button
            onClick={() => showSection('imageSection')}
            className={activeSection === 'imageSection' ? 'active' : ''}
          >
            Imagens
          </button>
          <button
            onClick={() => showSection('audioSection')}
            className={activeSection === 'audioSection' ? 'active' : ''}
          >
            Áudio
          </button>
          <button
            onClick={() => showSection('pdfSection')}
            className={activeSection === 'pdfSection' ? 'active' : ''}
          >
            PDFs
          </button>
          <button
            onClick={() => showSection('calculatorSection')}
            className={activeSection === 'calculatorSection' ? 'active' : ''}
          >
            Calculadoras
          </button>
        </div>

        <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
      </div>

      <div className={`sections-container ${fade ? 'fade-out' : 'fade-in'}`}>
        {activeSection === 'imageSection' && <ImageSection />}
        {activeSection === 'audioSection' && <AudioSection />}
        {activeSection === 'pdfSection' && <PdfSection />}
        {activeSection === 'calculatorSection' && <CalculatorSection />}
      </div>
    </div>
  );
}

export default Home;
