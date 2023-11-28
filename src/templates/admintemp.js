import React from "react";
import SwitchAdmin from "../components/SwitchAdmin"


const AdminTemplate = ({ children }) => {
    return (
      <>
        <div>
          <SwitchAdmin/>
        </div>

      </>
    );
  };
  
  export default AdminTemplate;