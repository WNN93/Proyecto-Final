import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    
    const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    if (sessionData) {
      setUser({ username: sessionData.username, role: sessionData.role });
      setSessionId(sessionData.sessionId);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({ username, role: data.role });
        setSessionId(data.sessionId);
        // Guarda la información de la sesión en el almacenamiento local
        sessionStorage.setItem('sessionData', JSON.stringify({ username, role: data.role, sessionId: data.sessionId }));
      } else {
        console.error('Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  const registerButtonClick = async () => {
    if (!sessionId) return;

    try {
      await fetch('/api/buttonClick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
    } catch (error) {
      console.error('Error al registrar clic:', error);
    }
  };

  return (
    <div className="App">
      {user && (
        <div>
          <h1>Bienvenido, {user.username} ({user.role})</h1>
          {user.role === 'admin' && (
            <button onClick={registerButtonClick}>Registrar clic</button>
          )}
        </div>
      )}

      <div>
        <h1>Landing Page</h1>
        <button onClick={registerButtonClick}>Botón 1</button>
        <button onClick={registerButtonClick}>Botón 2</button>
      </div>

      {!user && (
        <div>
          <h2>Iniciar Sesión</h2>
          <button onClick={() => login('admin', 'adminpassword')}>Iniciar sesión como admin</button>
          <button onClick={() => login('user1', 'user1password')}>Iniciar sesión como usuario regular</button>
        </div>
      )}
    </div>
  );
}

export default App;
