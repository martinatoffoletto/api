import React, { useState } from 'react';
import axios from 'axios';

const UpdateAreaComunComponent = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/sistema/areasComunes/${id}`,
        { nombre }
      );
      console.log('Area Comun actualizada:', response.data);
    } catch (error) {
      console.error('Error al actualizar el área común:', error);
    }
  };

  return (
    <div>
      <h1>Update Area Comun</h1>
      <label>ID:</label>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <label>Nuevo Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default UpdateAreaComunComponent;
