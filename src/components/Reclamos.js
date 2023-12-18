import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reclamo = () => {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:8080/sistema/reclamos')
      .then(response => {
        setReclamos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de reclamos:', error);
      });
  }, []);

  const eliminarReclamo = (id) => {
    
    axios.delete(`http://localhost:8080/sistema/reclamos/${id}/borrar`)
      .then(response => {
        
        setReclamos(reclamos.filter(reclamo => reclamo.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el reclamo:', error);
      });
  };

  return (
    <section className='container mt-4'>
      <div className="mb-4">
        <h2 className="display-4">Reclamos</h2>
        <ul className="list-group">
          {reclamos.map(reclamo => (
            <li key={reclamo.id} className="list-group-item d-flex justify-content-between align-items-center">
              <p>{reclamo.descripcion}</p>
              <button className="btn btn-danger"onClick={() => eliminarReclamo(reclamo.numero)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
    
  );
};

export default Reclamo;