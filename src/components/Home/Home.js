import React, { useState, useEffect } from 'react';
import ImageSection from '../ImageSection/ImageSection';
import AudioSection from '../AudioSection/AudioSection';
import PdfSection from '../PdfSection/PdfSection';
import CalculatorSection from '../CalculatorSection/CalculatorSection';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './styles.css'; 

function Home() {
  const [activeSection, setActiveSection] = useState('imageSection');
  const [darkMode, setDarkMode] = useState(true); 

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
    <div style={{width: "100%", height: "100%", borderWidth: 1, borderColor: 'green'}}>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <h1>AdvTools</h1>
          </div>
          <button onClick={() => showSection('imageSection')}>Imagens</button>
          <button onClick={() => showSection('audioSection')}>Áudio</button>
          <button onClick={() => showSection('pdfSection')}>PDFs</button>
          <button onClick={() => showSection('calculatorSection')}>Calculadoras</button>
      </div>

        {/* <button onClick={() => redirecionar to login page>Login</button> */}
        <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
    </div>
      
      <div className="sections-container">
        {activeSection === 'imageSection' && <ImageSection />}
        {activeSection === 'audioSection' && <AudioSection />}
        {activeSection === 'pdfSection' && <PdfSection />}
        {activeSection === 'calculatorSection' && <CalculatorSection />}
      </div>
    </div>
  );
}

export default Home;