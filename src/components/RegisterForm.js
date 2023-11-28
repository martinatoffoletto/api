// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    apellido: '',
    dni: '',
    nombreUsuario: '',
    contrasenia: '',
    tipoUsuario: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/registro', formData);
      setMessage(`Registro exitoso! Token: ${response.data}`);
    } catch (error) {
      setMessage('Error: Usuario existente');
    }
  };

  return (
    <section class="container">
      <h2>Registro</h2>
      <form id="register-form" onSubmit={handleSubmit} >
        <div className="mb-3"> 
            <label  className="form-label">
              Nombre:
            </label>
            <input className="form-control" type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Apellido:
          </label>
          <input className="form-control" type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            DNI:
          </label>
          <input className="form-control" type="text" name="dni" value={formData.dni} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Nombre de Usuario:
          </label>
          <input className="form-control" type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Contraseña:
          </label>
          <input className="form-control" type="password" name="contrasenia" value={formData.contrasenia} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Tipo de Usuario:
          </label>
          <select className="form-select" name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange}>
              <option value="ADMIN">Administrador</option>
              <option value="DUENIO">Dueño</option>
              <option value="INQUILINO">Inquilino</option>
            </select>
        </div >
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" type="submit">Registrarse</button>
        </div>
        
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default RegistrationForm;
