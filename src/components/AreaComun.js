import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AreasComunes = () => {
  const [areasComunes, setAreasComunes] = useState([]);
  const [nuevaAreaComun, setNuevaAreaComun] = useState({
    nombre: '',
    descripcion: '',
    edificio_id: '',
  });

  useEffect(() => {
    // Fetch areas comunes when the component mounts
    fetchAreasComunes();
  }, []);

  const fetchAreasComunes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sistema/areasComunes');
      setAreasComunes(response.data);
    } catch (error) {
      console.error('Error fetching areas comunes:', error);
    }
  };

  const guardarAreaComun = async () => {
    try {
      const response = await axios.post('http://localhost:8080/sistema/areasComunes', nuevaAreaComun);
      setAreasComunes([...areasComunes, response.data]);
      setNuevaAreaComun({
        nombre: '',
        descripcion: '',
        edificio_id: '',
      });
    } catch (error) {
      console.error('Error saving area comun:', error);
    }
  };

  const eliminarAreaComun = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/sistema/areasComunes/${id}`);
      setAreasComunes(areasComunes.filter((area) => area.id !== id));
    } catch (error) {
      console.error('Error deleting area comun:', error);
    }
  };

  return (
  <section className="container mt-4">
      <div className="mb-4">
        <h2 className="display-4">Áreas Comunes</h2>
        <ul className="list-group">
          {areasComunes.map(area => (
            <li key={area.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Nombre:</strong> {area.nombre} <br />
                <strong>Descripción:</strong> {area.descripcion} <br />
              </div>
              <button className="btn btn-danger" onClick={() => eliminarAreaComun(area.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h2 className="display-5">Agregar Área Común</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <label>Nombre:</label>
            <input
              className="form-control"
              type="text"
              value={nuevaAreaComun.nombre}
              onChange={(e) => setNuevaAreaComun({ ...nuevaAreaComun, nombre: e.target.value })}
            />
            <label>Descripción:</label>
            <input
              className="form-control"
              type="text"
              value={nuevaAreaComun.descripcion}
              onChange={(e) => setNuevaAreaComun({ ...nuevaAreaComun, descripcion: e.target.value })}
            />
            <label>Edificio:</label>
            <input
              className="form-control"
              type="text"
              value={nuevaAreaComun.edificio}
              onChange={(e) => setNuevaAreaComun({ ...nuevaAreaComun, edificio: e.target.value })}
            />
            <button className="btn btn-primary mt-3" onClick={guardarAreaComun}>Guardar Área Común</button>
          </li>
        </ul>
      </div>
  </section>

);
};

export default AreasComunes;
