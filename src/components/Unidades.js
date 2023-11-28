// Unidades.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Unidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [newUnidad, setNewUnidad] = useState({
    piso: 0,
    numeroUnidad: 0,
    habitada: false,
    alquilada: false,
    edificio1: 0, // ID del edificio
    usuario1: 0, // ID del usuario
  });

  useEffect(() => {
    // Obtener todas las unidades al cargar el componente
    axios.get('http://localhost:8080/sistema/unidades')
      .then(response => {
        setUnidades(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las unidades:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnidad({
      ...newUnidad,
      [name]: value,
    });
  };

  const handleGuardarUnidad = () => {
    axios.post('http://localhost:8080/sistema/unidades', newUnidad)
      .then(response => {
        setUnidades([...unidades, response.data]);
        // Limpiar el formulario después de guardar
        setNewUnidad({
          piso: 0,
          numeroUnidad: 0,
          habitada: false,
          alquilada: false,
          edificio1: 0,
          usuario1: 0,
        });
      })
      .catch(error => {
        console.error('Error al guardar la unidad:', error);
      });
  };

  const handleBorrarUnidad = (id) => {
    axios.delete(`http://localhost:8080/sistema/unidades/${id}/borrar`)
      .then(() => {
        setUnidades(unidades.filter(unidad => unidad.id !== id));
      })
      .catch(error => {
        console.error('Error al borrar la unidad:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Unidades</h1>
      <ul>
        {unidades.map(unidad => (
          <li key={unidad.id}>
            {unidad.piso} - {unidad.numeroUnidad}
            <button onClick={() => handleBorrarUnidad(unidad.id)}>Borrar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Nueva Unidad</h2>
      <div>
        <label>Piso: </label>
        <input type="number" name="piso" value={newUnidad.piso} onChange={handleInputChange} />
      </div>
      <div>
        <label>Número de Unidad: </label>
        <input type="number" name="numeroUnidad" value={newUnidad.numeroUnidad} onChange={handleInputChange} />
      </div>
      <div>
        <label>Habitada: </label>
        <input type="checkbox" name="habitada" checked={newUnidad.habitada} onChange={handleInputChange} />
      </div>
      <div>
        <label>Alquilada: </label>
        <input type="checkbox" name="alquilada" checked={newUnidad.alquilada} onChange={handleInputChange} />
      </div>
      <div>
        <label>Edificio ID: </label>
        <input type="number" name="edificio1" value={newUnidad.edificio1} onChange={handleInputChange} />
      </div>
      <div>
        <label>Usuario ID: </label>
        <input type="number" name="usuario1" value={newUnidad.usuario1} onChange={handleInputChange} />
      </div>
      <button onClick={handleGuardarUnidad}>Guardar Unidad</button>
    </div>
  );
};

export default Unidades;
