import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reclamo = () => {
  const [updateReclamo, setUpdateReclamo] = useState({
    id: null,
    estado: ''
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [reclamos, setReclamos] = useState([]);
  const [nuevoReclamoA, setNuevoReclamoA] = useState({
    areaComun: '',
    descripcion: '',
    estado: '',
    usuario: '',
  });
  const [nuevoReclamoU, setNuevoReclamoU] = useState({
    unidad: '',
    descripcion: '',
    estado: '',
    usuario: '',
  });


  useEffect(() => {
    
    axios.get('http://localhost:8080/sistema/reclamos')
      .then(response => {
        setReclamos(response.data);
        console.log(reclamos.foto, 'uwu');
      })
      .catch(error => {
        console.error('Error al obtener la lista de reclamos:', error);
      });
  }, []);

 
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFotoFile(file);
  };

  const subirFoto = () => {
    const formData = new FormData();
    formData.append('foto', fotoFile);
  
    axios.put(`http://localhost:8080/sistema/reclamos/${updateReclamo.id}/foto`, formData)
      .then(response => {
        console.log('Foto uploaded successfully:', response.data);
        // You may want to update local state or show a success message
      })
      .catch(error => {
        console.error('Error uploading foto:', error);
      });
  };
    
  
  const updateReclamoFunc = () => {
    axios.put(`http://localhost:8080/sistema/reclamos/${updateReclamo.id}`, updateReclamo)
      .then(response => {
        // Handle success (maybe update local state or show a success message)
        
        console.log('Reclamo updated successfully:', response.data);
      })
      .catch(error => {
        // Handle error (maybe show an error message)
        console.error('Error updating reclamo:', error);
      });
  };
  
  const guardarReclamoA = () => {
    axios.post('http://localhost:8080/sistema/reclamos', nuevoReclamoA)
      .then(response => {
        setReclamos([...reclamos, response.data]);
        setNuevoReclamoA({
          areaComun: '',
          descripcion: '',
          foto:'',
          estado: '',
          usuario: '',
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
          unidad: '',
          descripcion: '',
          foto:'',
          estado: '',
          usuario: '',
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
        <br></br>
        <ul className="list-group">
          {reclamos.map(reclamo => (
            <li key={reclamo.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p>ID: {reclamo.numero}, Descripción: {reclamo.descripcion}, Estado: {reclamo.estado}</p>
                <img src={reclamo.foto} alt="Foto" />
              </div>
              <button className="btn btn-danger" onClick={() => eliminarReclamo(reclamo.numero)}>Eliminar</button>
            </li>
          ))}
        </ul>

      </div>
      <br></br>
      <div className="mb-4">
        <h2 className="display-4">Actualizar Reclamos</h2>
        <br></br>
        <label>ID Reclamo</label>
        <input
          className="form-control"
          type="number"
          value={updateReclamo.id}
          onChange={(e) => setUpdateReclamo({ ...updateReclamo, id: e.target.value })}
        />
        <label>Nuevo estado</label>
        <select
          className="form-control"
          value={updateReclamo.estado}
          onChange={(e) => setUpdateReclamo({ ...updateReclamo, estado: e.target.value })}
        >
          <option value="" disabled>Seleccionar Estado</option>
          <option value="NUEVO">NUEVO</option>
          <option value="TERMINADO">TERMINADO</option>
          <option value="EN_PROCESO">EN PROCESO</option>
          <option value="DESESTIMADO">DESESTIMADO</option>
          <option value="ANULADO">ANULADO</option>
          <option value="ABIERTO">ABIERTO</option>
        </select>
        <br></br>
        <button type="button" className="btn btn-primary" onClick={updateReclamoFunc}>
          Actualizar Reclamo
        </button>
      </div>
      <div className="mb-3">
        <h3 className="display-5" >Agregar reclamo para area comun</h3>
        <br></br>
        <ul className="list-group">
        <li className="list-group-item">
              <label>Área Común</label>
              <input className="form-control" type="number" value={nuevoReclamoA.areaComun} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, areaComun: e.target.value })} />
              <label>Descripción</label>
              <input className="form-control" type="text" value={nuevoReclamoA.descripcion} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, descripcion: e.target.value })} />
              <label>Estado</label>
              <input className="form-control" type="text" value={nuevoReclamoA.estado} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, estado: e.target.value })} />
              <label>Usuario</label>
              <input className="form-control" type="text" value={nuevoReclamoA.usuario} onChange={(e) => setNuevoReclamoA({ ...nuevoReclamoA, usuario: e.target.value })} />
            <button type="button" className="btn btn-primary" onClick={guardarReclamoA}>Guardar Reclamo</button>
        </li>  
        </ul>
      </div>
      <br></br>
      <div className="mb-3">
        <h3 className="display-5" >Agregar reclamo para unidad</h3>
        <br></br>
        <ul className="list-group">
          <li className="list-group-item">
              <label>Unidad</label>
              <input className="form-control" type="number" value={nuevoReclamoU.areaComun} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, unidad: e.target.value })} />
              <label>Descripción</label>
              <input className="form-control" type="text" value={nuevoReclamoU.descripcion} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, descripcion: e.target.value })} />
              <label>Estado</label>
              <input className="form-control" type="text" value={nuevoReclamoU.estado} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, estado: e.target.value })} />
              <label>Usuario</label>
              <input className="form-control" type="text" value={nuevoReclamoU.usuario} onChange={(e) => setNuevoReclamoU({ ...nuevoReclamoU, usuario: e.target.value })} />
            <button type="button" className="btn btn-primary" onClick={guardarReclamoU}>Guardar Reclamo</button>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="display-4">Agregar foto a reclamo</h3>
        <form>
          <label>ID Reclamo</label>
          <input
            className="form-control"
            type="number"
            value={updateReclamo.id}
            onChange={(e) => setUpdateReclamo({ ...updateReclamo, id: e.target.value })}
          />
          <label>Seleccionar Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
          />
          <button type="button" className="btn btn-primary" onClick={subirFoto}>
            Agregar Foto
          </button>
        </form>
      </div>
    </section>
    
  );
};

export default Reclamo;