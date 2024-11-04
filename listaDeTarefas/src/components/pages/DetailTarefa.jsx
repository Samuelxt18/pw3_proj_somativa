import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './DetailTarefa.module.css';
import Button from '../button';
import corrida from '../../assets/corrida.png';

const DetailTarefa = () => {
    const { cod_tarefa } = useParams();
    const [tarefa, setTarefa] = useState({
        nome_tarefa: '',
        data_tarefa: '',
        descricao_tarefa: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/listarTarefas/${cod_tarefa}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Resposta completa da API:", data);
                setTarefa(data.data); // Ajuste conforme necessário
            })
            .catch((err) => console.log("Erro ao buscar dados:", err));
    }, [cod_tarefa]);

    return (
        <div className={style.grid}> 
            <div className={style.container_img}>
                <img
                    className={style.img_tarefa_detail}
                    src={corrida}
                    alt="Imagem da tarefa"
                />
            </div>
            <div className={style.info}>
                <span className={style.tarefa}>{tarefa.nome_tarefa || "Nome da tarefa não disponível"}</span>
                <span className={style.valor}>{tarefa.data_tarefa || "Data não disponível"}</span>
                <span className={style.descricao}>
                    {tarefa.descricao_tarefa || "Descrição não disponível"}
                </span>
                <div className={style.container_buttons}>
                    <Button label="EDITAR" />
                    <Button label="EXCLUIR" />
                </div>
            </div>
        </div>
    );
};

export default DetailTarefa;
