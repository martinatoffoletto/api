import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AreasComunesComponent = () => {
  const [areasComunes, setAreasComunes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sistema/areasComunes');
        setAreasComunes(response.data);
      } catch (error) {
        console.error('Error fetching areas comunes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Áreas Comunes</h1>
      <ul>
        {areasComunes.map((area) => (
          <li key={area.id}>{area.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

const UpdateAreaComunComponent = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleUpdate = async () => {
    try {
      console.log('Updating Area Comun with ID:', id);
      console.log('New Nombre:', nombre);

      const response = await axios.put(
        `http://localhost:8080/sistema/areasComunes/${id}`,
        { nombre, descripcion }
      );

      console.log('Area Comun actualizada:', response.data);
    } catch (error) {
      console.error('Error al actualizar el área común:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Área Común</h2>
      <label>ID:</label>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <label>Nuevo Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <label>Nueva Descripción:</label>
      <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

const GuardarAreaComunComponent = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [edificioId, setEdificioId] = useState('');

  const handleGuardar = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/sistema/areasComunes',
        { nombre, descripcion, edificio: edificioId }
      );
      console.log('Area Comun guardada:', response.data);
    } catch (error) {
      console.error('Error al guardar el área común:', error);
    }
  };

  return (
    <div>
      <h2>Guardar Área Común</h2>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <label>Descripción:</label>
      <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <label>Edificio ID:</label>
      <input type="text" value={edificioId} onChange={(e) => setEdificioId(e.target.value)} />
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

const DeleteAreaComun = () => {
  const [areaComunId, setAreaComunId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/sistema/areasComunes/${areaComunId}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting Area Comun:', error);
    }
  };

  return (
    <div>
      <h2>Eliminar Área Común</h2>
      <label>Area Comun ID:</label>
      <input type="text" value={areaComunId} onChange={(e) => setAreaComunId(e.target.value)} />
      <button onClick={handleDelete}>Eliminar Área Común</button>
    </div>
  );
};

const AreaComun = () => {
  return (
    <div>
      <AreasComunesComponent />
      <hr />
      <UpdateAreaComunComponent />
      <hr />
      <GuardarAreaComunComponent />
      <hr />
      <DeleteAreaComun />
    </div>
  );
};

export default AreaComun;
