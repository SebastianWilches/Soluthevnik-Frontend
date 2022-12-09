import React, { useState, useEffect } from 'react'
import './formOrderRawMaterial.css';
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

export default function FormOrderRawMaterial({ itemMaterial, supplier }) {

    const itemSupplier = [];
    supplier.map(item => {
        itemSupplier.push(item.n_name)
    })

    const [formMaterial, setFormMaterial] = useState({});

    useEffect(() => {
        itemMaterial.map(campo => { //Campos dinamicos form
            formMaterial[campo.n_name] = 0;
        })
    }, [])



    const handleChange = (e) => {
        setFormMaterial({
            ...formMaterial,
            [e.target.name]: e.target.value,
        });
        // console.log(e.target.name, e.target.value);
    }

    const  handleSubmit = (e) => {
        e.preventDefault();
        const test = formMaterial;
        console.log(test);
    }


    return (
        <div className='containerForm'>
            <h1>Realizar pedido de materia prima</h1>
            <hr></hr>

            <form onSubmit={handleSubmit}>
                {
                    itemMaterial.map((item, index) => {
                        return (
                            <div className='itemOrderRawMaterial' key={index}>
                                <h3>{item.n_name}</h3>
                                <div className='cantidadMaterial'>
                                    <p>Cantidad:</p>
                                    <input
                                        type="number"
                                        name={item.n_name}
                                        min="0"
                                        value={formMaterial[item.n_name]}
                                        onChange={handleChange}
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
