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

  const handleDelete = async (areaId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/sistema/areasComunes/${areaId}`);
      console.log(response.data);
      // After deletion, update the state to reflect the changes
      setAreasComunes(areasComunes.filter((area) => area.id !== areaId));
    } catch (error) {
      console.error('Error deleting Area Comun:', error);
    }
  };

  return (
    <section className="container mt-4">
    <div className="container mt-4">
      <h1 className="display-4">Áreas Comunes</h1>
      <ul className="list-group">
        {areasComunes.map((area) => (
          <li key={area.id} className="list-group-item d-flex justify-content-between align-items-center">
            {area.nombre}  -- {area.descripcion}
            
            <button className="btn btn-danger" onClick={() => handleDelete(area.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
    </section>

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
    <div className="mb-3">
      <section className="container">
        <h2 className="display-4 mb-4">Guardar Área Común</h2>
        
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input className="form-control" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <input className="form-control" type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Edificio ID:</label>
          <input className="form-control" type="text" value={edificioId} onChange={(e) => setEdificioId(e.target.value)} />
        </div>
        
        <button className="btn btn-primary" onClick={handleGuardar}>
          Guardar
        </button>
      </section>
    </div>

  );
};



const AreaComun = () => {
  return (
    <section className="container">
      <div className="mb-3">
        <AreasComunesComponent />
        <hr />
        <GuardarAreaComunComponent />
      </div>
    </section>
  );
};

export default AreaComun;
