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
    navigate('/createOrder', {state: {id: idAdmin.id}});
  }

  return (
    <div className="containerOrders">
      <h1>Histórico de Ordenes de materia prima
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-devices" width="36" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#D9560B" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="13" y="8" width="8" height="12" rx="1" />
      <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9" />
      <line x1="16" y1="9" x2="18" y2="9" />
     </svg>

      </h1>
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
