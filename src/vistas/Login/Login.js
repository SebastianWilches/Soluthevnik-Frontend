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
    const response = await fetch(
      `https://crud-financial-products.herokuapp.com/person/login?id=${User.id}&password=${User.password}`
    );
    const data = await response.json();
    if (data) {
      navigate("/createOrder", { state: { id: user.id } });
    }
  };

  return (
    <div className="containerForm">
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
          type="text"
          placeholder="Escriba su contraseña"
          name="password"
          onChange={handleLogin}
        />
        <button className="login-boton">Ingresar</button>
      </form>
    </div>
  );
}
