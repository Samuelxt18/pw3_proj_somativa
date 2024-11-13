import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './DetailTarefa.module.css';
import Button from '../button';
import corrida from '../../assets/corrida.png';

const DetailTarefa = () => {
    const { id } = useParams();
    const [tarefa, setTarefa] = useState({
        nome_tarefa: '',
        data_tarefa: '',
        descricao_tarefa: ''
    });

    useEffect(() => {
        console.log("ID da tarefa:", id); // Log do ID
        fetch(`http://localhost:5000/listagemTarefas/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Erro na resposta da API');
            }
            return resp.json();
        })
        .then((data) => {
            console.log("Resposta completa da API:", data); // Log da resposta
            if (data && !data.errorStatus && data.data) {
                console.log("Dados da tarefa:", data.data); // Log dos dados da tarefa
                setTarefa(data.data);
            } else {
                console.error("Dados não encontrados ou estrutura inesperada:", data);
                setTarefa({
                    nome_tarefa: "Nome não disponível",
                    data_tarefa: "",
                    descricao_tarefa: ""
                });
            }
        })
        .catch((err) => {
            console.log("Erro ao buscar dados:", err);
            setTarefa({
                nome_tarefa: "Erro ao carregar",
                data_tarefa: "",
                descricao_tarefa: ""
            });
        });
    }, [id]);

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