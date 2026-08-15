import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Landmark, XCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { artifacts } from './data';
import './App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <Landmark size={24} color="#000" />
          <span>INDIAN ART THROUGH THE AGES</span>
        </div>
        <div className="nav-links">
          <a href="#timeline" className="nav-link">Timeline</a>
          <a href="#masterpieces" className="nav-link">Masterworks</a>
          <a href="#sources" className="nav-link">Sources &amp; References</a>
          <a href="#about" className="nav-link">About This Project</a>
          <a href="#masterpieces" className="explore-all-btn">Explore All 10</a>
        </div>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a href="#timeline" className="nav-link" onClick={() => setIsOpen(false)}>Timeline</a>
            <a href="#masterpieces" className="nav-link" onClick={() => setIsOpen(false)}>Masterworks</a>
            <a href="#sources" className="nav-link" onClick={() => setIsOpen(false)}>Sources</a>
            <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>About</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(intervalId);
    }, 100);
    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}<span className="cursor">|</span></span>;
};

const Hero = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovering) {
      timeoutRef.current = setTimeout(() => {
        setCurrentImgIndex((prev) => (prev + 1) % artifacts.length);
      }, 4000);
    }
    return () => resetTimeout();
  }, [currentImgIndex, isHovering]);

  const nextSlide = () => {
    setCurrentImgIndex((prev) => (prev + 1) % artifacts.length);
  };

  const prevSlide = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? artifacts.length - 1 : prev - 1));
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-left">
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="dot"></span> A CHRONOLOGICAL JOURNEY • C. 2500 BCE → 1935 CE
        </motion.div>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TypewriterText text="INDIAN ART THROUGH THE AGES" />
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ten authentic masterworks spanning four and a half millennia — from the bronze <em>Dancing Girl</em> of Mohenjo-daro to the modernist canvases of Amrita Sher-Gil. Every image on this page is a real photograph &amp; scan of the actual artifact, sourced from museums and institutional collections. No AI-generated artwork.
        </motion.p>
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#timeline" className="btn-primary">Walk the Timeline</a>
          <a href="#masterpieces" className="btn-secondary">View All Masterworks</a>
          <a href="#sources" className="btn-outline">Sources &amp; References</a>
        </motion.div>
      </div>
      
      <div 
        className="hero-right"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentImgIndex}
            className="hero-card"
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: -15 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <img src={artifacts[currentImgIndex].image} alt={artifacts[currentImgIndex].title} />
            <div className="hero-card-info">
              <div className="hero-card-header">
                <span className="hero-card-badge">{artifacts[currentImgIndex].eraLabel} • {artifacts[currentImgIndex].category}</span>
                <div className="slider-controls-inline">
                  <button onClick={prevSlide} className="slider-btn-small"><ChevronLeft size={18} /></button>
                  <button onClick={nextSlide} className="slider-btn-small"><ChevronRight size={18} /></button>
                </div>
              </div>
              <h3>{artifacts[currentImgIndex].title}</h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Timeline = ({ openModal }) => {
  return (
    <section id="timeline" className="timeline-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Interactive Timeline
      </motion.h2>
      
      <div className="timeline-container">
        {artifacts.map((art, index) => (
          <div className="timeline-item" key={art.id}>
            <div className="timeline-dot"></div>
            <motion.div 
              className="timeline-content"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="artifact-card" onClick={() => openModal(art)}>
                <img src={art.image} alt={art.title} className="artifact-img" />
                <div className="artifact-info">
                  <span className="artifact-era">{art.eraLabel}</span>
                  <h3 className="artifact-title">{art.title}</h3>
                  <span className="artifact-category">{art.category}</span>
                  <button className="view-record-btn">View Full Record &rarr;</button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Masterpieces = ({ openModal }) => {
  return (
    <section id="masterpieces" className="masterpieces-section">
      <div className="info-container">
        <h2 className="section-title">The 10 Masterworks</h2>
        <p className="section-subtitle">Curated Collection</p>
        <p className="sources-desc">One authentic, documented artifact from each great era of Indian art. Photographs are of the actual objects, from the collections named below each card.</p>
        
        <div className="masterpieces-grid">
          {artifacts.map((art) => (
            <motion.div 
              key={art.id}
              className="masterpiece-card"
              whileHover={{ y: -10 }}
              onClick={() => openModal(art)}
            >
              <div className="masterpiece-img-wrapper">
                <img src={art.image} alt={art.title} />
              </div>
              <div className="masterpiece-info">
                <h4>{art.title}</h4>
                <p className="masterpiece-era">{art.eraLabel} • {art.category}</p>
                <p className="masterpiece-collection">{art.collectionName}</p>
                <button className="view-record-btn" style={{ marginTop: '1rem' }}>View Full Record &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SourcesTable = () => {
  return (
    <section id="sources" className="info-section alternate-bg">
      <div className="info-container">
        <h2 className="section-title">Transparency &amp; Verification</h2>
        <p className="section-subtitle">Sources, Museums &amp; Image Licenses</p>
        <p className="sources-desc">Every image on this website is a real photograph of the actual artifact. Each entry below records the exact museum collection, the image source, its license, and a link to the source page so you can verify the image yourself.</p>
        
        <div className="table-responsive">
          <table className="sources-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Artifact / Artwork</th>
                <th>Collection / Museum</th>
                <th>Image Source</th>
                <th>License</th>
                <th>Source Page</th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((art, index) => (
                <tr key={art.id}>
                  <td>{index + 1}</td>
                  <td><strong>{art.title}</strong><br/><span>{art.eraLabel} · {art.category}</span></td>
                  <td>{art.collectionName}</td>
                  <td>{art.imageSource}</td>
                  <td>{art.license}</td>
                  <td><a href={art.sourceUrl} target="_blank" rel="noreferrer" className="source-link">View Source <ExternalLink size={14} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="info-section">
      <div className="info-container text-center">
        <h2 className="section-title">About This Project</h2>
        <div className="about-card">
          <p className="about-text">
            <strong>Indian Art Through the Ages</strong> is an academic project documenting ten landmark works of Indian art in chronological order — spanning sculpture, miniature painting, oil painting and modern art. The project follows the principle that we learn history best from the artefacts themselves: every image is an authentic photograph or scan of the real object from a museum, government or educational collection. No AI-generated images are used anywhere on this site.
          </p>
          <p className="about-text">
            A scholarly visual timeline of ten authentic Indian masterworks — preserving, documenting and celebrating five millennia of Indian artistic heritage.
          </p>
        </div>
      </div>
    </section>
  );
};

const ArtifactModal = ({ artifact, closeModal }) => {
  if (!artifact) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={closeModal}>
            <XCircle size={32} />
          </button>
          
          <div className="modal-image-col">
            <img src={artifact.image} alt={artifact.title} />
          </div>
          
          <div className="modal-text-col">
            <p className="modal-era">{artifact.eraLabel}</p>
            <h2 className="modal-title">{artifact.title}</h2>
            <p className="modal-desc">{artifact.description}</p>
            
            {artifact.historicalContext && (
              <div className="modal-section">
                <h3>Historical Context</h3>
                <p>{artifact.historicalContext}</p>
              </div>
            )}

            {artifact.culturalSignificance && (
              <div className="modal-section">
                <h3>Cultural Significance</h3>
                <p>{artifact.culturalSignificance}</p>
              </div>
            )}

            {artifact.materialsTechnique && (
              <div className="modal-section">
                <h3>Materials &amp; Technique</h3>
                <p>{artifact.materialsTechnique}</p>
              </div>
            )}
            
            <div className="modal-meta">
              <p><strong>Period:</strong> <span>{artifact.period}</span></p>
              <p><strong>Medium:</strong> <span>{artifact.category}</span></p>
              <p><strong>Collection:</strong> <span>{artifact.collectionName}</span></p>
              
              <div className="modal-attribution">
                <h3>Image Attribution &amp; Source</h3>
                <p><strong>Collection / Museum:</strong> {artifact.collectionName}</p>
                <p><strong>Image Source:</strong> {artifact.imageSource}</p>
                <p><strong>Image License:</strong> {artifact.license}</p>
                <a href={artifact.sourceUrl} target="_blank" rel="noreferrer" className="btn-outline">View Source Page <ExternalLink size={16}/></a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h4>Image Ethics Statement</h4>
        <p>This project uses no AI-generated images. All visuals are authentic photographs or scans of the actual artifacts, sourced from reputable museums and educational institutions, with full attribution provided for every image.</p>
        <p className="copyright">© 2026 Indian Art Through the Ages — Academic Project on the Cultural Heritage of India</p>
        <p className="footer-name">Created by Yuvan Vishnu Pandi</p>
      </div>
    </footer>
  );
};

function App() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Timeline openModal={setSelectedArtifact} />
      <Masterpieces openModal={setSelectedArtifact} />
      <SourcesTable />
      <About />
      <Footer />
      
      {selectedArtifact && (
        <ArtifactModal 
          artifact={selectedArtifact} 
          closeModal={() => setSelectedArtifact(null)} 
        />
      )}
    </div>
  );
}

export default App;
