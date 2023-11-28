import React, { useState }from "react";
import AreaComun from "./AreaComun"
import Edificios from "./Edificios";
import Reclamos from "./Reclamos"
import Unidades from "./Unidades"
import Usuarios from "./Usuarios"

const ComponentA = () => {
    const [mostrarComponente, setMostrarComponente] = useState(null);
  
    const mostrarComponenteB = () => {
      setMostrarComponente('B');
    };
  
    const mostrarComponenteC = () => {
      setMostrarComponente('C');
    };
  
    const mostrarComponenteD = () => {
      setMostrarComponente('D');
    };

    const mostrarComponenteE = () => {
      setMostrarComponente('E');
    };

    const mostrarComponenteF = () => {
      setMostrarComponente('F');
    };
  
    return (
      <div>
        <div class="btn-group container" role="group" aria-label="Basic example">
          <button  className="btn btn-primary" onClick={mostrarComponenteB}>Areas Comunes</button>
          <button className="btn btn-primary" onClick={mostrarComponenteC}>Unidades</button>
          <button className="btn btn-primary" onClick={mostrarComponenteD}>Edificios</button>
          <button className="btn btn-primary" onClick={mostrarComponenteE}>Reclamos</button>
          <button className="btn btn-primary" onClick={mostrarComponenteF}>Usuarios</button>
        </div>

  
        {mostrarComponente === 'B'  && <AreaComun/>}
        {mostrarComponente === 'C' && <Unidades/>}
        {mostrarComponente === 'D' && <Edificios/>}
        {mostrarComponente === 'E' && <Reclamos/>}
        {mostrarComponente === 'F' && <Usuarios/>}
      </div>
    );
  };
  
  export default ComponentA;