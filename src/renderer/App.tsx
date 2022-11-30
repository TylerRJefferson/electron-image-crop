import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Hello from './components/Hello';
import PhotoCrop from './components/PhotoCrop';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photo" element={<PhotoCrop />} />
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
};
