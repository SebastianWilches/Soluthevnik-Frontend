import React, { useState } from 'react'
import './formOrderRawMaterial.css';

export default function FormOrderRawMaterial({ itemMaterial }) {

    const [formMaterial, setFormMaterial] = useState({
    });

    // itemMaterial.map(campo =>{
    //     return (campo.n_name:"");
    // })

    return (
        <div className='containerForm'>
            <h1>Realizar pedido de materia prima</h1>
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
                <button>Comprar</button>
            </form>
        </div>
    )
}
