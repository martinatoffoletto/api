
import React, { useState } from 'react';
import axios from 'axios';  
//constde reclamo 


const ReclamoAreaComun = () => {

        const [newReclamo, setNewReclamo] = useState({});


        const saveReclamo = async () => {
            try {
            const response= await axios.post('http://localhost:8080/sistema/reclamos', newReclamo)
            console.log(response.data)
            } catch (error) {
            console.log(JSON.stringify(newReclamo))
            console.error('Error al guardar reclamo:', error);
            }
        };


        return (
            
            <section className="container mt-4">
            <h2 className="display-4 mb-4"> Nuevo Reclamo para Area Comun: </h2>

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
                <label className="form-label">Area Comun:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Area Comun"
                    value={newReclamo.area_comun}
                    onChange={(e) => setNewReclamo({ ...newReclamo, area_comun: e.target.value })}
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
        )
}; 

export default ReclamoAreaComun;
