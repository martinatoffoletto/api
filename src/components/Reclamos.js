import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reclamos = () => {
  const [reclamos, setReclamos] = useState([]);
  const [newReclamo, setNewReclamo] = useState({
    unidad:3,
    descripcion:"reclamo agua corriente",
    estado:"ABIERTO",
    usuario:1
  });

  useEffect(() => {
    // Fetch all reclamos on component mount
    getReclamos();
  }, []);

  const getReclamos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sistema/reclamos');
      setReclamos(response.data);
    } catch (error) {
      console.error('Error fetching reclamos:', error);
    }
  };

  

  const saveReclamo = async () => {
    try {
      const response= await axios.post('http://localhost:8080/sistema/reclamos',newReclamo)
      console.log(response.data)
      /*const response = await axios.post('http://localhost:8080/sistema/reclamos', {
        numero: newReclamo.numero,
        areaComun: newReclamo.id_unidad,
        descripcion: newReclamo.descripcion,
        estado: newReclamo.estado,
        usuario: newReclamo.usuario_id,
        medidas_tomadas: newReclamo.medidas_tomadas
      });
      
  
      setReclamos([...reclamos, response.data]);
      setNewReclamo({
        numero:"12",
        id_unidad:"1", 
        descripcion:"", 
        estado:"TERMINADO", 
        usuario_id:"",
        medidas_tomadas:""
      });
      */
    } catch (error) {
      console.log(JSON.stringify(newReclamo))
      console.error('Error saving reclamo:', error);
    }
    
  };

  const deleteReclamo = async (id) => {
    try {
      
      await axios.delete(`http://localhost:8080/sistema/reclamos/${id}`);
      // Update the state by removing the deleted reclamo
      setReclamos(reclamos.filter((reclamo) => reclamo.id !== id));
    } catch (error) {
      console.error('Error deleting reclamo:', error);
    }
  };

  return (
    
      <section className="container mt-4">
        <div className="container mt-4">
          <h1 className="display-4">Reclamos</h1>
          <ul className="list-group">
            {reclamos.map((reclamo) => (
              <li key={reclamo.id} className="list-group-item d-flex justify-content-between align-items-center">
                {`${reclamo.descripcion} - ${reclamo.estado}`}
                <button className="btn btn-danger" onClick={() => deleteReclamo(reclamo.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
  <section className="container">
    <h2 className="display-4 mb-4">Agregar Nuevo Reclamo</h2>

    <div className="mb-3">
      <label className="form-label">Numero:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Numero"
        value={newReclamo.numero}
        onChange={(e) => setNewReclamo({ ...newReclamo, numero: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Id Unidad:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Id Unidad"
        value={newReclamo.id_unidad}
        onChange={(e) => setNewReclamo({ ...newReclamo, id_unidad: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Descripcion:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Descripcion"
        value={newReclamo.descripcion}
        onChange={(e) => setNewReclamo({ ...newReclamo, descripcion: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Estado:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Estado"
        value={newReclamo.estado}
        onChange={(e) => setNewReclamo({ ...newReclamo, estado: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Usuario:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Usuario"
        value={newReclamo.usuario_id}
        onChange={(e) => setNewReclamo({ ...newReclamo, usuario_id: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Medidas Tomadas:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Medidas Tomadas"
        value={newReclamo.medidas_tomadas}
        onChange={(e) => setNewReclamo({ ...newReclamo, medidas_tomadas: e.target.value })}
      />
    </div>

    <button className="btn btn-primary" onClick={saveReclamo}>
      Guardar Reclamo
    </button>
  </section>
</div>

      </section>
    
    
  );
};

export default Reclamos;
