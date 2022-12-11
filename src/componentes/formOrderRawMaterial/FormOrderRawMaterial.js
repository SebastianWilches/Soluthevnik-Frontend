import React, { useState, useEffect } from 'react'
import './formOrderRawMaterial.css';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import {useLocation,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

export default function FormOrderRawMaterial({ itemMaterial, supplier }) {
    const {state} = useLocation();
    const admin_id_Prop = state;
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(admin_id_Prop.id)
    const navigate = useNavigate();

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
        console.log("AQUI ESTA EL OBJETOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        console.log(object);
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
   
        
        let items = []   
        items = formMaterial.filter(item => item.q_quantity.toString() !== '0');

        let object = {
            raw_material_order: {
                k_id: ID_MaterialOrder,
                supplier_id: Proveedor,
                admin_id: admin_id_Prop.id,//789456123, //Modulo Daniel
                v_total_price: 0.0 //Pendiente
            },
            raw_material_order_items: items
        }

        POSTRawMaterialOrder(object);
    }

    const successOrder = () =>{
        Swal.fire({
            title: "¡Compra registrada!",
            icon: "success",
            button: "Aww yiss!",
          });
    }

    const handleShowOrders =() =>{
        navigate('/ListOrders', {state: {id: admin_id_Prop.id}});
    }

    


    return (
        <div className='containerForm'>
            <h1>Realizar pedido de materia prima
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck-delivery" width="35" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#D9560B" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
            <line x1="3" y1="9" x2="7" y2="9" />
            </svg>
            </h1>
            <hr></hr>

            <form onSubmit={handleSubmit}>
                <div className='grid'>

                    <h3>ID Material</h3>
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
                    <button onClick={successOrder}>Comprar</button>
                    <button id="btn-Historico" onClick={handleShowOrders}>Mostrar Histórico</button>
                </div>
            </form>
        </div>
    )
}
