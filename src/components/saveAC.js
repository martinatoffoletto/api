import React, { useState } from 'react';
import axios from 'axios';

const GuardarAreaComunComponent = () => {
  const [nombre, setNombre] = useState('');
  const [edificioId, setEdificioId] = useState('');

  const handleGuardar = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/sistema/areasComunes',
        { nombre, edificio: edificioId }
      );
      console.log('Area Comun guardada:', response.data);
    } catch (error) {
      console.error('Error al guardar el área común:', error);
    }
  };

  return (
    <div>
      <h1>Guardar Area Comun</h1>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <label>Edificio ID:</label>
      <input type="text" value={edificioId} onChange={(e) => setEdificioId(e.target.value)} />
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

export default GuardarAreaComunComponent;
