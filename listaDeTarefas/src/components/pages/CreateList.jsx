import React, { useState, useEffect } from "react";
import style from './CreateList.module.css';
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";

const CreateList = () => {
    const [categorias, setCategorias] = useState([]);
    const [tarefa, setTarefa] = useState({ nome_tarefa: "", data_tarefa: "", descricao_tarefa: "", categoria: "" });

    function handlerChangeTarefa(event) {
        setTarefa({ ...tarefa, [event.target.name]: event.target.value });
    }

    function createTarefa(tarefa) {
        fetch('http://localhost:5000/inserirTarefa', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarefa)
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Erro ao cadastrar a tarefa (Status: ${resp.status})`);
            }
            return resp.json();
        })
        .then(data => {
            alert('Tarefa cadastrada com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao cadastrar tarefa:', err);
            alert(err.message);
        });
    }

    function handleChangeCategory(event) {
        setTarefa({...tarefa, categoria: event.target.value });
    }

    useEffect(() => {
        fetch('http://localhost:5000/listagemCategorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Erro ao carregar categorias (Status: ${resp.status})`);
            }
            return resp.json();
        })
        .then(data => {
            if (data && data.data) {
                setCategorias(data.data);
            } else {
                console.error('Dados inesperados:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        // Debugging logs
        console.log("Nome da tarefa:", tarefa.nome_tarefa);
        console.log("Data da tarefa:", tarefa.data_tarefa);
        console.log("Descrição da tarefa:", tarefa.descricao_tarefa);
        console.log("Categoria:", tarefa.categoria);

        // Validating form inputs
        if (!tarefa.nome_tarefa.trim()) {
            alert('Por favor, preencha o nome da tarefa.');
            return;
        }

        if (!tarefa.data_tarefa.trim()) {
            alert('Por favor, preencha a data da tarefa.');
            return;
        }

        if (!tarefa.descricao_tarefa.trim()) {
            alert('Por favor, preencha a descrição da tarefa.');
            return;
        }

        if (!tarefa.categoria || tarefa.categoria === "") {
            alert('Por favor, selecione uma categoria.');
            return;
        }

        createTarefa(tarefa);
    }

    return (
        <section className={style.CreateList_container}>
            <h1>Cadastro de Tarefas</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    type='text'
                    name='nome_tarefa'
                    placeHolder='Digite sua tarefa'
                    text='Tarefa'
                    onChange={handlerChangeTarefa}
                    value={tarefa.nome_tarefa}
                />

                <Input
                    type='date'
                    name='data_tarefa'
                    placeHolder='Digite quando irá ser realizada'
                    text='Data da tarefa'
                    onChange={handlerChangeTarefa}
                    value={tarefa.data_tarefa}
                />

                <Input
                    type='text'
                    name='descricao_tarefa'
                    placeHolder='Digite a descrição da tarefa'
                    text='Descrição da tarefa'
                    onChange={handlerChangeTarefa}
                    value={tarefa.descricao_tarefa}
                />

                <Select
                    name='categoria'
                    text='Escolha uma categoria da tarefa'
                    options={categorias}
                    onChange={handleChangeCategory}
                    value={tarefa.categoria} // Adicione esta linha
                />

                <Button
                    rotulo='Cadastrar Tarefa'
                    type="submit"
                    className={style.submit_button}
                />
            </form>
        </section>
    );
};

export default CreateList;