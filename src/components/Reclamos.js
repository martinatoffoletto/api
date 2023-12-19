import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reclamo = () => {
  const [reclamos, setReclamos] = useState([]);
  const [nuevoReclamoA, setNuevoReclamoA] = useState({
    areaComun: 0,
    descripcion: '',
    estado: '',
    usuario: 0,
  });
  const [nuevoReclamoU, setNuevoReclamoU] = useState({
    unidad: 0,
    descripcion: '',
    estado: '',
    usuario: 0,
  });


  useEffect(() => {
    
    axios.get('http://localhost:8080/sistema/reclamos')
      .then(response => {
        setReclamos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de reclamos:', error);
      });
  }, []);

  const guardarReclamoA = () => {
    axios.post('http://localhost:8080/sistema/reclamos', nuevoReclamoA)
      .then(response => {
        setReclamos([...reclamos, response.data]);
        setNuevoReclamoA({
          areaComun: 0,
          descripcion: '',
          foto:'',
          estado: '',
          usuario: 0,
        });
      })
      .catch(error => {
        console.error('Error al guardar el reclamo:', error);
      });
  };
  const guardarReclamoU = () => {
    axios.post('http://localhost:8080/sistema/reclamos', nuevoReclamoU)
      .then(response => {
        setReclamos([...reclamos, response.data]);
        setNuevoReclamoU({
          unidad: 0,
          descripcion: '',
          foto:'',
          estado: '',
          usuario: 0,
        });
      })
      .catch(error => {
        console.error('Error al guardar el reclamo:', error);
      });
  };

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
              <p>{reclamo.descripcion}{reclamo.foto}</p>
              <button className="btn btn-danger"onClick={() => eliminarReclamo(reclamo.numero)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3>Agregar Nuevo Reclamo Area Comun</h3>
        <form>
          <div className="form-group">
            <label>Área Común</label>
            <input type="number" value={nuevoReclamoA.areaComun} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, areaComun: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" value={nuevoReclamoA.descripcion} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, descripcion: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input type="text" value={nuevoReclamoA.estado} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, estado: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" value={nuevoReclamoA.usuario} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, usuario: e.target.value })} />
          </div>
          <button type="button" className="btn btn-primary" onClick={guardarReclamoA}>Guardar Reclamo</button>
        </form>
      </div>
      <div className="mb-4">
        <h3>Agregar  Reclamo Unidad</h3>
        <form>
          <div className="form-group">
            <label>Unidad</label>
            <input type="number" value={nuevoReclamoU.areaComun} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, unidad: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" value={nuevoReclamoU.descripcion} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, descripcion: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input type="text" value={nuevoReclamoU.estado} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, estado: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" value={nuevoReclamoU.usuario} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, usuario: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Foto</label>
            <input type="file" onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, foto: e.target.files[0] })} />
          </div>

          <button type="button" className="btn btn-primary" onClick={guardarReclamoU}>Guardar Reclamo</button>
        </form>
      </div>
    </section>
    
  );
};

export default Reclamo;