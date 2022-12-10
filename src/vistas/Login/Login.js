import React, { useState } from "react";
import "./Login.css";
import "react-widgets/styles.css";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setInput] = useState({
    id: "",
    password: "",
  });

  const handleLogin = (e) => {
    setInput({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendLogin = (e) => {
    e.preventDefault();
    sendLogin(user);
  };

  const sendLogin = async (User) => {
    try{
        user.id = parseInt(user.id)
        const response = await fetch(`http://localhost:8081/admin/login?k_id=${User.id}&password=${User.password}`, {
          method: 'POST',
          body: JSON.stringify(User),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log(data)
        if(data == true){
            navigate('/createOrder', {state: {id: User.id}});
          }else{
            alert("Datos Incorrectos")
          }
    
      }catch (error){
        alert("Datos Incorrectos");
      }
      }

  return (
    <div className="containerFormLogin">
      <h1>Ingreso de administrador</h1>
      <hr></hr>
      <form className="formLogin" onSubmit={handleSendLogin}>
        <input
          className="login-input"
          type="text"
          placeholder="Ingrese su ID"
          name="id"
          onChange={handleLogin}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Escriba su contraseña"
          name="password"
          onChange={handleLogin}
        />
        <button className="login-boton">Ingresar</button>
      </form>
    </div>
  );
}
