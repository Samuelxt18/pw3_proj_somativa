import React from "react";
import style from './ListTarefa.module.css';
import Container from "Container.jsx";
import ContainerBook from '../layout/ContainerTarefa.jsx'

/* IMPORTA O useState E useEffect PARA GUARDAR OS ESTADOS DE DADOS DOS PROJETOS */
import { useState, useEffect } from "react";

import CardTarefa from "../CardTarefas";

import corrida from '../../assets/corrida.png';

const ListBooks = () => {
    /* CRIAÇAO DO STATE DOS DADOS DOS LIVROS */
    const [tarefa, setTarefa] = useState([]);

     /* RECUPERA OS DADOS DOS LIVROS DO BACKEND */
     useEffect(()=>{

    fetch('http://localhost:5000/listagemLivros', {
        method: 'GET',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
    })
        .then((resp)=>resp.json())
        .then((data)=>{
            console.log('TAREFA: ' + data.data);
            setBooks(data.data);
            console.log('STATE: ' + tarefa);
        })
        .catch((err)=>{console.log(err)});

}, []);

    return (

        <Container>

        <section className={style.list_book_container}>
            
            <h1>LISTA DE TAREFAS</h1>
        <ContainerBook>
                {
                    books.map((tarefa)=>(
                        // console.log(book.nome_livro)
                        <CardTarefa
                            // cod_livro={book.cod_livro}
                            key={tarefa.cod_categoria}
                            nome={tarefa.nome_categoria}
                            img={corrida}
                        />
                    ))
                }
        </ContainerBook>
        </section>

    </Container>
)

    
}

export default ListBooks