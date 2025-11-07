import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServicesDashboard from './pages/ServicesDashboard';
import RecordsRequest from './pages/RecordsRequest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServicesDashboard />} />
        <Route path="/records" element={<RecordsRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
