import React, { useState, useEffect } from 'react'
import './formOrderRawMaterial.css';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import {useLocation} from 'react-router-dom'

export default function FormOrderRawMaterial({ itemMaterial, supplier }) {
    const {state} = useLocation();
    const admin_id_Prop = state;

    let [formMaterial, setFormMaterial] = useState([]);
    const [ID_MaterialOrder, setID_MaterialOrder] = useState(null);
    const [Proveedor, setProveedor] = useState();



    useEffect(() => {
        GETRawMaterialOrder();
        setProveedor(supplier);
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
        setID_MaterialOrder(data.length + 1);
    }

    const eventBuyMaterialOrder = () => {


        let object = {
            raw_material_order: {
                k_id: ID_MaterialOrder,
                supplier_id: Proveedor,
                admin_id: 789456123, //Modulo Daniel
                v_total_price: 0.0 //Pendiente
            },
            raw_material_order_items: formMaterial
        }

        POSTRawMaterialOrder(object);
    }


    return (
        <div className='containerForm'>
            <h1>Realizar pedido de materia prima</h1>
            <hr></hr>

            <form onSubmit={handleSubmit}>
                <div className='grid'>

                    <h3>{admin_id_Prop}</h3>
                    <h3>Material</h3>
                    <h3>Cantidad</h3>
                    <h3>Precio unitario</h3>
                    {
                        itemMaterial.map((item, index) => {
                            return (
                                <>
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
                                </>
                            );
                        })
                    }
                </div>

                <div className='footerItemMaterial'>
                    <div className='flex spaceBet'>
                        <h3 className='proveedor'>Proveedor:</h3>
                        <DropdownList
                            dataKey="k_id"
                            textField="n_name"
                            value={Proveedor}
                            onChange={(nextValue) => setProveedor(nextValue.k_id)}
                            data={supplier}
                        />
                    </div>
                    <button>Comprar</button>
                </div>
            </form>
        </div>
    )
}
