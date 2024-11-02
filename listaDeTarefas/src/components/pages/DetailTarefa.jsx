
import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import style from './DetailTarefa.module.css'
import Button from '../button'
import corrida from '../../assets/corrida.png'

const DetailTarefa = () => {
    const {cod_tarefa} =useParams()
    console.log("codigo da tarefa "+ cod_tarefa)
 
    const[tarefa, setTarefa] = useState({});

        useEffect(()=>{

            fetch(`http://localhost:5000/listarTarefas/${cod_tarefa}`, {
                method: 'GET',
                mode:'cors',
                headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*',
            },
            })
                .then((resp)=>resp.json())
                .then((data)=>{
                setTarefa(data.data);
                console.log("dados da tarefa" + data.data);
            })
            .catch((err)=>{console.log(err)});
    
            },[]);
    

    return(
        <div className={style.grid}> 
           <div className={style.container_img}>
                <img className={style.img_tarefa_detail} src={corrida} alt='se voce esta lendo isso eu to chorando internamente' />
            </div>
            <div className={style.info}>
            <span className={style.tarefa}>{tarefa.nome_tarefa}</span>
                <span className={style.valor}>{tarefa.data_tarefa}</span>

                <span className={style.descricao}>
                    {tarefa.descricao_tarefa}
                </span>
                <div className={style.container_buttons}>
                    <Button 
                        label='EDITAR'
                    />

                    <Button 
                        label='EXCLUIR'
                    />

                </div>
            </div>
        </div>
    )
}
export default DetailTarefa