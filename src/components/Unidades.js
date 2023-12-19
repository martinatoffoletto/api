// Unidades.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const Unidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [unitIdToAddInquilino, setUnitIdToAddInquilino] = useState("");
  const [inquilinoIdToAdd, setInquilinoIdToAdd] = useState("");
  const [unitIdToAddDuenio, setUnitIdToAddDuenio] = useState("");
  const [duenioIdToAdd, setDuenioIdToAdd] = useState("");
  const [edificios, setEdificios] = useState([]);
  const [newUnidad, setNewUnidad] = useState({
    piso: "",
    numeroUnidad: "",
    habitada: false,
    alquilada: false,
    edificio: "", 
    duenio: "0",
  });

  useEffect(() => {
    fetchEdificios();
    axios
      .get("http://localhost:8080/sistema/unidades")
      .then((response) => setUnidades(response.data))
      .catch((error) => console.error("Error fetching units:", error));
  }, []);

  const fetchEdificios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sistema/edificiosTodos');
      setEdificios(response.data);
    } catch (error) {
      console.error('Error fetching edificios:', error);
    }
  };

  const deleteUnidad = (id) => {
    axios
      .delete(`http://localhost:8080/sistema/unidades/${id}/borrar`)
      .then(() => setUnidades(unidades.filter((u) => u.id !== id)))
      .catch((error) => console.error("Error deleting unit:", error));
  };
  const saveUnidad = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/sistema/unidades",
        newUnidad
      );
      setUnidades([...unidades, response.data]);
      setNewUnidad({
        piso: "",
        numeroUnidad: "",
        habitada: false,
        alquilada: false,
        edificio: "",
        duenio: "0",
      });
    } catch (error) {
      console.error("Error saving area comun:", error);
    }
  };
  const addInquilino = async () => {
    try {
      await axios.put(
        `http://localhost:8080/sistema/unidades/${unitIdToAddInquilino}/inquilino/${inquilinoIdToAdd}`
      );
      // Optionally, update the state or perform any other actions on success
    } catch (error) {
      console.error("Error adding occupant:", error);
    }
  };

  const addDuenio = async () => {
    try {
      await axios.put(
        `http://localhost:8080/sistema/unidades/${unitIdToAddDuenio}/duenio/${duenioIdToAdd}`
      );
      // Optionally, update the state or perform any other actions on success
    } catch (error) {
      console.error("Error adding owner:", error);
    }
  };
  return (
    <section className="container mt-4">
      <div className="container mt-4">
        <h1 className="display-4">Unidades</h1>
        <ul className="list-group">
          {unidades.map((unidad) => (
            <li
              key={unidad.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {`Edificio: ${unidad.edificio.direccion}, ID unidad: ${unidad.id}, Piso: ${unidad.piso}, Unidad: ${unidad.numeroUnidad} - ${
                unidad.habitada ? "Habitada" : "No habitada"
              }, ${unidad.alquilada ? "Alquilada" : "No alquilada"}`}
              <button
                className="btn btn-danger"
                onClick={() => deleteUnidad(unidad.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <div />
        <br></br>
        <div className="mb-3">
          <h2 className="display-5">Agregar Unidad</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <label htmlFor="piso" className="form-label">
                Piso
              </label>
              <input
                type="text"
                className="form-control"
                id="piso"
                value={newUnidad.piso}
                onChange={(e) =>
                  setNewUnidad({ ...newUnidad, piso: e.target.value })
                }
                required
              />

              <label htmlFor="numeroUnidad" className="form-label">
                Número de Unidad
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroUnidad"
                value={newUnidad.numeroUnidad}
                onChange={(e) =>
                  setNewUnidad({ ...newUnidad, numeroUnidad: e.target.value })
                }
                required
              />

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="habitada"
                  checked={newUnidad.habitada}
                  onChange={(e) =>
                    setNewUnidad({ ...newUnidad, habitada: e.target.checked })
                  }
                />
                <label className="form-check-label" htmlFor="habitada">
                  Habitada
                </label>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="alquilada"
                  checked={newUnidad.alquilada}
                  onChange={(e) =>
                    setNewUnidad({ ...newUnidad, alquilada: e.target.checked })
                  }
                />
                <label className="form-check-label" htmlFor="alquilada">
                  Alquilada
                </label>
              </div>

              <label htmlFor="edif" className="form-label">
                Edificio ID
              </label>
              <select
              className="form-control"
              value={setNewUnidad.edificio}
              onChange={(e) => setNewUnidad({ ...newUnidad, edificio: e.target.value })}
               >
              <option value="">Seleccionar Edificio</option>
              {edificios.map((edificio) => (
                <option key={edificio.id} value={edificio.id}>
                  {edificio.direccion}
                </option>
              ))}
            </select>
              
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={saveUnidad}
              >
                Guardar Unidad
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-4">
        <br></br>
        <h2 className="display-5">Agregar Inquilino</h2>
        <label htmlFor="unitIdToAddInquilino" className="form-label">
          ID de Unidad
        </label>
        <input
          type="text"
          className="form-control"
          id="unitIdToAddInquilino"
          value={unitIdToAddInquilino}
          onChange={(e) => setUnitIdToAddInquilino(e.target.value)}
          required
        />

        <label htmlFor="inquilinoIdToAdd" className="form-label">
          ID de Inquilino
        </label>
        <input
          type="text"
          className="form-control"
          id="inquilinoIdToAdd"
          value={inquilinoIdToAdd}
          onChange={(e) => setInquilinoIdToAdd(e.target.value)}
          required
        />

        <button
          className="btn btn-primary mt-3"
          onClick={addInquilino}
        >
          Agregar Inquilino
        </button>
      </div>
      <br></br>
      <div className="container mt-4">
        <h2 className="display-5">Agregar Dueño</h2>
        <label htmlFor="unitIdToAddDuenio" className="form-label">
          ID de Unidad
        </label>
        <input
          type="text"
          className="form-control"
          id="unitIdToAddDuenio"
          value={unitIdToAddDuenio}
          onChange={(e) => setUnitIdToAddDuenio(e.target.value)}
          required
        />

        <label htmlFor="duenioIdToAdd" className="form-label">
          ID de Dueño
        </label>
        <input
          type="text"
          className="form-control"
          id="duenioIdToAdd"
          value={duenioIdToAdd}
          onChange={(e) => setDuenioIdToAdd(e.target.value)}
          required
        />

        <button
          className="btn btn-primary mt-3"
          onClick={addDuenio}
        >
          Agregar Dueño
        </button>
      </div>
    </section>
  );
};

export default Unidades;