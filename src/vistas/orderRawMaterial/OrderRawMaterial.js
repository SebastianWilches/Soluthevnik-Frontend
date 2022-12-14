import React, { useState, useEffect } from 'react'
import FormOrderRawMaterial from '../../componentes/formOrderRawMaterial/FormOrderRawMaterial';
//import {useLocation, useNavigate} from 'react-router-dom';

export default function OrderRawMaterial() {
    //const {state} = useLocation();
    //const admin_id_Prop = state;
    //const navigate = useNavigate();

    const [RawMaterial, setRawMaterial] = useState([]);
    const [Supplier, setSupplier] = useState([]);

    useEffect(() => {
        GETRawMaterial();
        GETSupplier();
    }, [])


    //Peticiones
    const GETRawMaterial = async () => {
        const response = await fetch(`http://localhost:8081/raw_material/findAll`);
        const data = await response.json();
        setRawMaterial(data);
    }

    const GETSupplier = async () => {
        const response = await fetch(`http://localhost:8081/supplier/findAll`);
        const data = await response.json();
        setSupplier(data);
    }


    return (
        <div>
            <FormOrderRawMaterial itemMaterial={RawMaterial} supplier={Supplier} />
        </div>
    )
}
