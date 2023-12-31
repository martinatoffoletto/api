import React, { useState } from 'react';
import axios from 'axios';
import SwitchAdmin from './SwitchAdmin';
import ClienteTemplate from '../templates/clientetemp'



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/sistema/login', {
        nombreUsuario: username,
        contrasenia: password,
      });
  
      if (response.status === 200) {
        const userResponse = await axios.get(`http://localhost:8080/sistema/usuarios/nombre/${username}`);
        setIsLoggedIn(true);
        setUserData(userResponse.data);  
      }
    } catch (error) {
      setMessage('Usuario Inexistente');
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage('');
    setUserData(null);
  };

  return (
    <section className="container">
        {!isLoggedIn && (
        <form id="login-form" onSubmit={handleLogin}>
          <h2 className="form-label">Inicio de Sesión</h2>
          <div className="mb-3">
            <label htmlFor="nombreUsuario" className="form-label">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreUsuario"
              name="nombreUsuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasenia" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasenia"
              name="contrasenia"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
          {message && <p>{message}</p>}
        </form>
      )}
      
      {isLoggedIn && (
        <div>
          <div className="d-grid gap-2 mb-3">
            <button
              type="button "
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
          <br/>
          {userData && (
            <div>
              <h3>Tipo Usuario</h3>
              <p>{userData.tipo_usuario}</p>
              {/* Conditionally render components based on user type */}
              {userData.tipo_usuario === 'ADMINISTRADOR' ? (
                <SwitchAdmin />
              ) : (
                <ClienteTemplate />
              )}
            </div>
          )}
          
          
        </div>
      )}

    </section>
  );
};

export default LoginForm;