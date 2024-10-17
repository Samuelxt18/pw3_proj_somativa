// Home.js
import React from "react";
import style from './Home.module.css'

const Home = () => {
    return (
        <section className={style.home_container}>
            <h1><span>BEM VINDO A SUA LISTA DE TAREFAS</span></h1>
            <p>SUA PLATAFORMA WEB DE TAREFAS!</p>
            {/* <img src='./fotoTaree.png' alt="Tarefa" /> */}
        </section>
    );
}

export default Home;