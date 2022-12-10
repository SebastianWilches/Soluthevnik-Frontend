import React, { useState, useEffect } from 'react'
import './formOrderRawMaterial.css';
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

export default function FormOrderRawMaterial({ itemMaterial, supplier }) {


    let [formMaterial, setFormMaterial] = useState([]);
    const [ID_MaterialOrder, setID_MaterialOrder] = useState(null);

    useEffect(() => {
        GETRawMaterialOrder();
    }, [])
    

    //                      Form

    //Init valores form
    itemMaterial.map(item => {
        if (formMaterial.length < itemMaterial.length) {
            formMaterial = [...formMaterial, {
                raw_material_id: item.k_id, //Prop
                // n_name: item.n_name, //Prop
                q_quantity: 0,  //La cambia el  usuario
                v_unit_price: 100 //Default
            }];
        }
    });


    const handleFormChange = (index, event) => {
        let data = [...formMaterial];
        data[index][event.target.name] = event.target.value;
        setFormMaterial(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        eventBuyMaterialOrder();
    }


    //Proveedores
    const itemSupplier = [];
    supplier.map(item => {
        itemSupplier.push(item.n_name)
    })


    //                          POST raw_material_order
    const POSTRawMaterialOrder = async (object) => {
        const response = await fetch('http://localhost:8081/raw_material_order/save',
            {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data = await response.json();
        console.log(data);
    }
    const GETRawMaterialOrder = async () => {
        const response = await fetch(`http://localhost:8081/raw_material_order/findAll`);
        const data = await response.json();
        setID_MaterialOrder(data.length+1);
    }

    const eventBuyMaterialOrder = () => {
        

        let object = {
            raw_material_order:{
                k_id: ID_MaterialOrder,
                supplier_id:12345, //Pendiente
                admin_id:789456123, //Modulo Daniel
                v_total_price:0.0 //Pendiente
            },
            raw_material_order_items:formMaterial
        }

        POSTRawMaterialOrder(object);
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
                                <input
                                    type="text"
                                    name="raw_material_id"
                                    value={item.k_id}
                                    disabled={true}
                                    onChange={event => { handleFormChange(index, event) }}>
                                </input>
                                <input
                                    type="text"
                                    name="n_name"
                                    value={item.n_name}
                                    disabled={true}>
                                </input>
                                <input
                                    type="number"
                                    name="q_quantity"
                                    min={0}
                                    value={formMaterial.q_quantity}
                                    onChange={event => { handleFormChange(index, event) }}>
                                </input>
                                <input
                                    type="text"
                                    name="v_unit_price"
                                    value={100}
                                    disabled={true}>
                                </input>
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
