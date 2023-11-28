import React from 'react';
import GuardarAreaComunComponent from "./saveAC";
import AreasComunesComponent from "./showAC"
import UpdateAreaComunComponent from "./updateAC"


const AreaComun= () => {
  return (
    <div>
      <GuardarAreaComunComponent/>
      <AreasComunesComponent/>
      <UpdateAreaComunComponent/>

    </div>
  );
};

export default AreaComun;

