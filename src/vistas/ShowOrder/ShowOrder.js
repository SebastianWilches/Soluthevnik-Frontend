import React, { useState, useEffect } from "react";
import "./ShowOrder.css";
import "react-widgets/styles.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Order from '../../componentes/Order/Order'

export default function ShowOrder() {
    const {state} = useLocation();
    const idAdmin = state;
    const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  const [Orders, setOrders] = useState({});
  const getOrders = async () => {
    const response = await fetch(
      `http://localhost:8081/raw_material_order_item/findAll`
    );
    const data = await response.json();

    setOrders(data);
  };

  const handleVolver = () =>{
    navigate('/createOrder', {state: {id: idAdmin}});
  }

  return (
    <div className="containerOrders">
      <h1>Histórico de Ordenes de materia prima</h1>
      <hr></hr>
      {Object.entries(Orders).map(([key, value]) => {
        return <Order Info={value} />;
      })}
      <div className="containerBoton">
      <button className="btn-volver" onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}
