import React, { useState, useEffect } from 'react'
import FormOrderRawMaterial from '../../componentes/formOrderRawMaterial/FormOrderRawMaterial';


export default function OrderRawMaterial() {
    const [RawMaterial, setRawMaterial] = useState([]);

    useEffect(() => {
        GETRawMaterial();
    }, [])


    //Peticiones
    const GETRawMaterial = async () => {
        const response = await fetch(`http://localhost:8081/raw_material/findAll`);
        const data = await response.json();
        setRawMaterial(data);
    }


    return (
        <div>
            <FormOrderRawMaterial itemMaterial = {RawMaterial}/>
        </div>
    )
}
