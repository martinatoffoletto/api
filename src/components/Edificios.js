import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Edificios = () => {
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    // Fetch all edificios when the component mounts
    getAllEdificios();
  }, []);

  const getAllEdificios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sistema/edificiosTodos');
      setEdificios(response.data);
    } catch (error) {
      console.error('Error fetching edificios:', error);
    }
  };

  const deleteEdificio = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/sistema/edificios/${id}`);
      // Update the state after successful deletion
      setEdificios(edificios.filter(edificio => edificio.id !== id));
    } catch (error) {
      console.error('Error deleting edificio:', error);
    }
  };

  const updateEdificio = async (id, updatedEdificio) => {
    try {
      const response = await axios.put(`http://localhost:8080/sistema/edificios/${id}`, updatedEdificio);
      // Update the state with the updated edificio
      setEdificios(edificios.map(edificio => (edificio.id === id ? response.data : edificio)));
    } catch (error) {
      console.error('Error updating edificio:', error);
    }
  };

  return (
    <div>
      <h2>List of Edificios</h2>
      <ul>
        {edificios.map(edificio => (
          <li key={edificio.id}>
            {edificio.direccion}
            <button onClick={() => deleteEdificio(edificio.id)}>Delete</button>
            <button onClick={() => updateEdificio(edificio.id, { direccion: 'New Address' })}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Edificios;
