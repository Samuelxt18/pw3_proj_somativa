import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; // Importando Link
import style from './ListTarefa.module.css';
import Container from "../layout/Container.jsx";
import ContainerTarefa from '../layout/ContainerTarefa.jsx';
import CardTarefa from "../CardTarefas";
import corrida from '../../assets/corrida.png';

const ListTarefa = () => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/listagemTarefas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Erro na requisição: ${resp.status}`);
            }
            return resp.json();
        })
        .then((data) => {
            console.log('TAREFAS: ', data.data[0]);
            setTarefas(data.data);
        })
        .catch((err) => { 
            console.error('Erro ao carregar tarefas:', err);
        });
    }, []);

    return (
        <Container>
            <section className={style.list_book_container}>
                <h1>LISTA DE TAREFAS</h1>
                <ContainerTarefa>
                    {
                        tarefas.length > 0 ? (
                            tarefas.map((t) => (
                                <div key={t.cod_tarefa}> {/* Envolvendo cada tarefa em um div */}
                                    <Link to={`/DetailTarefa/${t.cod_tarefa}`}>
                                        <CardTarefa
                                            tarefa={t.nome_tarefa}
                                            hora={t.data_tarefa}
                                            imagem={corrida}
                                            cod_tarefas={t.cod_tarefa}
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma tarefa encontrada.</p>
                        )
                    }
                </ContainerTarefa>
            </section>
        </Container>
    );
}

export default ListTarefa;