import React, { useState } from 'react';
import axios from 'axios';
import SwitchAdmin from './SwitchAdmin';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/sistema/login', {
        nombreUsuario: username,
        contrasenia: password,
      });
  
      if (response.status === 200) {
        const userType = response.data;
  
        setMessage(`Bienvenido, ${username}!`);
        setIsLoggedIn(true);
  
        if (userType === 'ADMINISTRADOR') {
          setMessage('Bienvenido, Administrador!');
        } else if (userType === 'DUENIO') {
          setMessage('Bienvenido, Dueño!');
        } else if (userType === 'INQUILINO') {
          setMessage('Bienvenido, Inquilino!');
        } else {
          setMessage('No se encontró el tipo de usuario');
        }
      }
    } catch (error) {
      setMessage('Usuario Inexistente');
    }
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
      
      {isLoggedIn && <SwitchAdmin />}
    </section>
  );
};

export default LoginForm;