import React, { useState } from 'react'
import './formOrderRawMaterial.css';
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

export default function FormOrderRawMaterial({ itemMaterial, supplier }) {

    const itemSupplier = [];
    supplier.map(item =>{
        itemSupplier.push(item.n_name)
    })

    const [formMaterial, setFormMaterial] = useState({
    });

    // itemMaterial.map(campo =>{
    //     return (campo.n_name:"");
    // })

    return (
        <div className='containerForm'>
            <h1>Realizar pedido de materia prima</h1>
            <hr></hr>

            <form>
                {
                    itemMaterial.map(item => {
                        return (
                            <div className='itemOrderRawMaterial'>
                                <h3>{item.n_name}</h3>
                                <div className='cantidadMaterial'>
                                    <p>Cantidad:</p>
                                    <input
                                        type="number"
                                        name={item.n_name}

                                    ></input>
                                </div>
                            </div>
                        );
                    })
                }

                <div className='footerItemMaterial'>
                    <div className='flex spaceBet'>
                        <h3 className='proveedor'>Proveedor:</h3>
                        <Combobox
                            defaultValue=""
                            data={itemSupplier}
                        />
                    </div>
                    <button>Comprar</button>
                </div>
            </form>
        </div>
    )
}
