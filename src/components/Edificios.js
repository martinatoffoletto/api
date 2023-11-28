import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Edificios = () => {
  const [edificios, setEdificios] = useState([]);
  const [newDireccion, setNewDireccion] = useState('');

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

  const saveEdificio = async () => {
    try {
      const response = await axios.post('http://localhost:8080/sistema/edificios', {
        direccion: newDireccion,
      });

      if (response.status === 201) {
        // Update the state with the new building
        setEdificios(prevEdificios => [...prevEdificios, response.data]);
        setNewDireccion('');
      } else {
        console.error('Error saving edificio. Unexpected status:', response.status);
      }
    } catch (error) {
      console.error('Error saving edificio:', error.message);
    }
  };
  
  

  return (
    <section className="container mt-4">
      <div className="mb-4">
        <h2 className="display-4">Lista de Edificios</h2>
        <ul className="list-group">
          {edificios.map(edificio => (
            <li key={edificio.id} className="list-group-item d-flex justify-content-between align-items-center">
              {edificio.direccion}
              <button className="btn btn-danger" onClick={() => deleteEdificio(edificio.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    
      <div className="mb-3">
        <h2 className="display-5">Agregar Edificio</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <input
              className="form-control"
              type="text"
              placeholder="Dirección"
              value={newDireccion}
              onChange={(e) => setNewDireccion(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={saveEdificio}>Guardar Edificio</button>
          </li>
        </ul>
      </div>
  </section>
  
  );
};

export default Edificios;
