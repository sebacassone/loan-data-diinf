import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
import NotFound from './components/NotFound';
import { useEffect, useState } from 'react';
import ProfesorView from './components/intranet/ProfesorView';
import AdministradorView from './components/intranet/AdministradorView';
import CatWithMoney from './components/loading/index';
import UserInterface from './interfaces/UserInterface';

function App() {
  const [userType, setUserType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: UserInterface = JSON.parse(storedUser);
      setUserType(user.roleUser);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <CatWithMoney />
      </div>
    );
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Rutas de Intranet según rol */}
          {userType === 'Profesor' && (
            <Route path="/intranet" element={<ProfesorView />} />
          )}
          {userType === 'Administrador' && (
            <Route path="/intranet" element={<AdministradorView />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
