import React, { useEffect, useState } from 'react';
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
      <h1>Areas Comunes</h1>
      <ul>
        {areasComunes.map((area) => (
          <li key={area.id}>{area.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default AreasComunesComponent;
