import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Schools from './pages/schools';
import School from './pages/school';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Schools /> } />
        <Route path="/schools/:schoolId" element={ <School /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


