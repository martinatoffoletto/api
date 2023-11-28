import React, { useState }from "react";
import AreaComun from "./AreaComun"

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
  
    return (
      <div>
        <button onClick={mostrarComponenteB}>Areas Comunes</button>
        <button onClick={mostrarComponenteC}>Unidades</button>
        <button onClick={mostrarComponenteD}>Edificios</button>

  
        {mostrarComponente === 'B'  && <AreaComun/>}
        {mostrarComponente === 'C' && "ComponentC"}
        {mostrarComponente === 'D' && "ComponentD"}
      </div>
    );
  };
  
  export default ComponentA;