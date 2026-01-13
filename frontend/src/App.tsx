import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProblemBrowser } from './pages/ProblemBrowser';
import { PracticeArena } from './pages/PracticeArena';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="problems" element={<ProblemBrowser />} />
          <Route path="practice/:problemId" element={<PracticeArena />} />
          <Route path="results/:sessionId" element={<Results />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
