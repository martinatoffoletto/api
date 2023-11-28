import React from 'react';
import AreaComun from "./components/AreaComun"
import InicioTemplate from "./templates/iniciotemp";
import Edificios from './components/Edificios';
import Unidades from './components/Unidades';
import Usuarios from './components/Usuarios';



const App = () => {
  return (
    <div>
      <InicioTemplate/>
      <AreaComun/>
      <Edificios/>
      <Unidades/>
      <Usuarios/>
    </div>
  );
};

export default App;
