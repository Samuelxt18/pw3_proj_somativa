import React from "react"; 
import style from './Container.module.css'

const ContainerTarefa  = (props) =>{
    return(
        <div className={style.container}>
            
            {props.children}
        </div>
    )
}

export default ContainerTarefa