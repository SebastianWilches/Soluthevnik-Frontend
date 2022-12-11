import React from "react";
import './Order.css';

function Order ( {Info}) {
    return(
        <div className='order-container' >
            <div className='order'>
                <p>Orden#{Info.rawMaterialOrderItemPK.rawMaterialOrder.k_id}</p>
                <p>{Info.rawMaterialOrderItemPK.rawMaterial.n_name}</p>
                <p>Cantidad: {Info.q_quantity} </p>
                <p>Proveedor: {Info.rawMaterialOrderItemPK.rawMaterialOrder.supplier.n_name} </p>
                <p>Realizado por: {Info.rawMaterialOrderItemPK.rawMaterialOrder.admin.n_name} {Info.rawMaterialOrderItemPK.rawMaterialOrder.admin.n_lastname}</p>
                <p>Valor Orden: {Info.rawMaterialOrderItemPK.rawMaterialOrder.v_total_price}</p>
            </div>
      </div>
    )
}

export default Order