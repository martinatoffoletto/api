import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reclamos = () => {
  const [reclamos, setReclamos] = useState([]);
  const [newReclamo, setNewReclamo] = useState({
    numero:"",
    id_unidad:"", 
    descripcion:"", 
    estado:"", 
    usuario_id:"",
    medidas_tomadas:""
  
   
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
      const response = await axios.post('http://localhost:8080/sistema/reclamos', {
        areaComun: newReclamo.id_unidad,
        descripcion: newReclamo.descripcion,
        estado: newReclamo.estado,
        usuario: newReclamo.usuario_id,
        // Add other properties as needed
      });
  
      setReclamos([...reclamos, response.data]);
      setNewReclamo({
        numero: "",
        id_unidad: "",
        descripcion: "",
        estado: "",
        usuario_id: "",
        medidas_tomadas: "",
      });
    } catch (error) {
      console.error('Error saving reclamo:', error);
    }
  };

  const deleteReclamo = async (id) => {
    try {
      // Adjust the URL according to your API
      await axios.delete(`http://localhost:8080/sistema/reclamos/${id}`);
      // Update the state by removing the deleted reclamo
      setReclamos(reclamos.filter((reclamo) => reclamo.id !== id));
    } catch (error) {
      console.error('Error deleting reclamo:', error);
    }
  };

  return (
    <div>
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
      </section>

      <div>
      <input
 type="text"
 placeholder="Numero"
 value={newReclamo.numero}
 onChange={(e) => setNewReclamo({ ...newReclamo, numero: e.target.value })}
/>
<input
 type="text"
 placeholder="Id Unidad"
 value={newReclamo.id_unidad}
 onChange={(e) => setNewReclamo({ ...newReclamo, id_unidad: e.target.value })}
/>
<input
 type="text"
 placeholder="Descripcion"
 value={newReclamo.descripcion}
 onChange={(e) => setNewReclamo({ ...newReclamo, descripcion: e.target.value })}
/>
<input
 type="text"
 placeholder="Estado"
 value={newReclamo.estado}
 onChange={(e) => setNewReclamo({ ...newReclamo, estado: e.target.value })}
/>
<input
  type="text"
  placeholder="Usuario"
  value={newReclamo.usuario_id}  // Corrected to use `usuario_id`
  onChange={(e) => setNewReclamo({ ...newReclamo, usuario_id: e.target.value })}
/>

<input
 type="text"
 placeholder="Medidas Tomadas"
 value={newReclamo.medidas_tomadas}
 onChange={(e) => setNewReclamo({ ...newReclamo, medidas_tomadas: e.target.value })}
/>
        <button onClick={saveReclamo}>Save Reclamo</button>
      </div>
    </div>
  );
};

export default Reclamos;
