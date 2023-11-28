// Unidades.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Unidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [newUnidad, setNewUnidad] = useState({
    piso: 0,
    numeroUnidad: 0,
    habitada: false,
    alquilada: false,
    edificio_id: 2, // Set the appropriate edificio ID
    usuario_id: 1, // Set the appropriate usuario ID
  });

  // Fetch all units
  useEffect(() => {
    axios.get('http://localhost:8080/sistema/unidades')
      .then(response => setUnidades(response.data))
      .catch(error => console.error('Error fetching units:', error));
  }, []);

  // Save a new unit
  const saveUnidad = () => {
    axios.post('http://localhost:8080/sistema/unidades', newUnidad)
      .then(response => {
        setUnidades([...unidades, response.data]);
        setNewUnidad({
          piso: 0,
          numeroUnidad: 0,
          habitada: false,
          alquilada: false,
          edificio_id: 2, 
          usuario_id: 1, 
        });
      })
      .catch(error => console.error('Error saving unit:', error));
  };

  // Delete a unit
  const deleteUnidad = (id) => {
    axios.delete(`http://localhost:8080/sistema/unidades/${id}/borrar`)
      .then(() => setUnidades(unidades.filter(u => u.id !== id)))
      .catch(error => console.error('Error deleting unit:', error));
  };

  return (
    
      <section className="container mt-4">
        <div className="container mt-4">
          <h1 className="display-4">Unidades</h1>
          <ul className="list-group">
            {unidades.map((unidad) => (
              <li key={unidad.id} className="list-group-item d-flex justify-content-between align-items-center">
                {`${unidad.piso}, ${unidad.numeroUnidad} - ${unidad.habitada ? 'Habitada' : 'No habitada'}, ${unidad.alquilada ? 'Alquilada' : 'No alquilada'}`}
                <button className="btn btn-danger" onClick={() => deleteUnidad(unidad.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
       
        <h2 className="display-4 mb-4">Agregar Nueva Unidad</h2>
        <div className="mb-3">
          <label className="form-label">Piso:</label>
          <input
            className="form-control"
            type="number"
            value={newUnidad.piso}
            onChange={(e) => setNewUnidad({ ...newUnidad, piso: e.target.value })}
          />
        </div>

          <div className="mb-3">
            <label className="form-label">Número de Unidad:</label>
            <input
              className="form-control"
              type="number"
              value={newUnidad.numeroUnidad}
              onChange={(e) => setNewUnidad({ ...newUnidad, numeroUnidad: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Habitada:</label>
            <input
              className="form-control"
              type="checkbox"
              checked={newUnidad.habitada}
              onChange={(e) => setNewUnidad({ ...newUnidad, habitada: e.target.checked })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Alquilada:</label>
            <input
              className="form-control"
              type="checkbox"
              checked={newUnidad.alquilada}
              onChange={(e) => setNewUnidad({ ...newUnidad, alquilada: e.target.checked })}
            />
          </div>

          <button className="btn btn-primary" onClick={saveUnidad}>
            Guardar
          </button>
      </section>


      


      
    
  );
};

export default Unidades;
