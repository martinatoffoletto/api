import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    apellido: '',
    dni: 0,
    nombreUsuario: '',
    contrasenia: '',
    tipoUsuario: '', // Set the appropriate default value for tipoUsuario
  });

  useEffect(() => {
    // Fetch all users when the component mounts
    axios.get('/sistema/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUsuario = () => {
    axios.post('/sistema/usuarios', newUsuario)
      .then(response => {
        setUsuarios([...usuarios, response.data]);
        setNewUsuario({
          nombre: '',
          apellido: '',
          dni: 0,
          nombreUsuario: '',
          contrasenia: '',
          tipoUsuario: '', // Set the appropriate default value for tipoUsuario
        });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteUsuario = (id) => {
    axios.delete(`/sistema/usuarios/${id}`)
      .then(() => setUsuarios(usuarios.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleUpdateUsuario = (id, updatedUsuario) => {
    axios.put(`/sistema/usuarios/${id}`, updatedUsuario)
      .then(response => {
        setUsuarios(usuarios.map(user => (user.id === id ? response.data : user)));
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nombre} {usuario.apellido} - {usuario.nombreUsuario}
            <button onClick={() => handleDeleteUsuario(usuario.id)}>Eliminar</button>
            {/* Add update functionality here */}
          </li>
        ))}
      </ul>
      <h3>Agregar Usuario</h3>
      <div>
        <label>Nombre: </label>
        <input type="text" value={newUsuario.nombre} onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })} />
        {/* Add other input fields */}
        <button onClick={handleAddUsuario}>Agregar</button>
      </div>
    </div>
  );
};

export default Usuarios;
