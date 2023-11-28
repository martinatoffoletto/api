import React from "react";
import GuardarAreaComunComponent from "../components/saveAC";
import AreasComunesComponent from "../components/showAC"

const ClienteTemplate = ()=> {
    return (
      <div>
          <GuardarAreaComunComponent/>
          <AreasComunesComponent/>

      </div>
      
    );
  };
  
  export default ClienteTemplate;