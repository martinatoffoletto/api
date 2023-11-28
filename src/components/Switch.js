// SwitchButton.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const SwitchButton = () => {
  const [mostrarComponenteB, setMostrarComponenteB] = useState(true);

  const toggleComponente = () => {
    setMostrarComponenteB(!mostrarComponenteB);
  }

  return (
    <div className="d-grid gap-2 mb-3">
      <button  className="btn btn-secondary" onClick={toggleComponente}> Ir a {mostrarComponenteB ? 'Registro' : 'Log In'}</button>
      {mostrarComponenteB ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default SwitchButton;
