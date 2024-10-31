import React, { useState, useEffect } from "react"; // Importando useState e useEffect aqui
import style from './ListTarefa.module.css';
import Container from "../layout/Container.jsx";
import ContainerBook from '../layout/ContainerTarefa.jsx';

import CardTarefa from "../CardTarefas";
import corrida from '../../assets/corrida.png';

const ListBooks = () => {
    /* CRIAÇÃO DO STATE DOS DADOS DAS TAREFAS */
    const [tarefa, setTarefa] = useState([]);

    /* RECUPERA OS DADOS DAS TAREFAS DO BACKEND */
    useEffect(() => {
        fetch('http://localhost:5000/listagemLivros', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log('TAREFA: ', data.data);
            setTarefa(data.data); // Corrigido para setTarefa
        })
        .catch((err) => { console.log(err) });
    }, []);

    return (
        <Container>
            <section className={style.list_book_container}>
                <h1>LISTA DE TAREFAS</h1>
                <ContainerBook>
                    {
                        tarefa.map((t) => ( // Corrigido para usar tarefa
                            <CardTarefa
                                key={t.cod_categoria}
                                nome={t.nome_categoria}
                                img={corrida}
                            />
                        ))
                    }
                </ContainerBook>
            </section>
        </Container>
    );
}

export default ListBooks;