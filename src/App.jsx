import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuantumAboutPage from './components/Index/QuantumAboutPage.jsx';
import AdvancedBusinessWebsite from './components/Index/AdvancedBusinessWebsite.jsx';
import QuantumFeaturesPage from './components/Index/QuantumFeaturesPage';
import QuantumContactPage from './components/Index/QuantumContactPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdvancedBusinessWebsite />} />
        <Route path="/features" element={<QuantumFeaturesPage />} />
        <Route path="/about" element={<QuantumAboutPage />} />
        <Route path="/contact" element={<QuantumContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
