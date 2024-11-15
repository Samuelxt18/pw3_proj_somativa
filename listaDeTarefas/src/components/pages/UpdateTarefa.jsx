
/* IMPORTAÇÃO DA STATE */
import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

import style from './UpdateTarefa.module.css'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Button from '../forms/Button'

const UpdateTarefa = () => {

        /* CRIAÇAO DO STATE DOS DADOS DOS LIVROS */
        const [tarefa, setTarefa] = useState({});

        /* RECUPERA O CÓDIGO ENVIADO PELO BOTÃO */
        const {id} = useParams();

        /* OBJETO DE NAVEGAÇÃO */
        const navigate = useNavigate();

        /* STATE DE DADOS DAS CATEGORIAS VINDAS DO ARQUIVO db.json */
        const [categorias, setCategorias] = useState([]);

        /* HANDLER DE CAPTURA DOS DADOS DE INPUT (NOME DO LIVRO, AUTOR E DESCRIÇÃO) */
        function handlerChangeTarefa(event) {
                setTarefa({...tarefa, [event.target.name] : event.target.value});
                console.log(tarefa)
        }

        /* CAPTURA OS DADOS DA SELECT */
        function handleChangeCategoria(event) {
                setTarefa({...tarefa, cod_categoria: event.target.value});
                console.log(tarefa);
        }

        /* RECUPERA OS DADOS DE CATEGORIA DO BANCO DADOS */
        useEffect(()=>{
                fetch('http://localhost:5000/listagemCategorias', {
                        method:'GET',
                        headers:{
                                'Content-Type':'application/json',
                                'Access-Control-Allow-Origin':'*',
                                'Access-Control-Allow-Headers':'*'
                        },
                }).then(
                        (resp)=>
                                resp.json()
                ).then(
                        (data)=>{
                        setCategorias(data.data);
                        // console.log('TESTE-DATA:' + data.data);
                        }
                ).catch(
                        (error)=>{
                        console.log(error);
                        }
                )
        }, [])

        /* RECUPERA OS DADOS DO LIVRO DO BACKEND */
        useEffect(()=>{

                fetch(`http://localhost:5000/listagemTarefas/${id}`, {
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
                        console.log('TAREFAS: ' + data.data.id);
                        setTarefa(data.data);
                        console.log('STATE: ' + tarefa.nome_tarefa);
                })
                .catch((err)=>{console.log(err)});

        }, []);

        /* ALTERAÇÃO DOS DADOS DE LIVRO */
        function updateTarefa(tarefa) {
        
                console.log(JSON.stringify(tarefa))
        
                fetch('http://localhost:5000/alterarTarefa', {
                        method:'PUT',
                        mode:'cors',
                        headers:{
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Headers':'*'
                        },
                        body: JSON.stringify(tarefa)
                })
                .then(
                        (resp)=>resp.json()
                )
                .then(
                        (data)=>{
                                console.log(data);
                                navigate('/listTarefa',{state:'TAREFA ALTEARADO COM SUCESSO!'});
                        }
                )
                .catch(
                        (err)=>{ console.log(err) }
                )
        }

        /* FUNÇÃO DE SUBMIT */
        function submit(event) {
                event.preventDefault();
                updateTarefa(tarefa);
        }

        return (
                <section className={style.create_tarefa_container}>
                        
                        <h1>ALTERAÇÃO DE TAREFA</h1>

                        <form onSubmit={submit}>

                                <Input 
                                        type='text'
                                        name='nome_tarefa'
                                        id='nome_tarefa'
                                        placeholder='Digite o título da tarefa'
                                        text='Digite o título da tarefa'
                                        handlerChangeTarefa={handlerChangeTarefa}
                                        value={tarefa.nome_tarefa} />

                                <Input 
                                        type='text'
                                        name='data_tarefa'
                                        id='data_tarefa'
                                        placeholder='Digite quando irá ser realizada'
                                        text='Digite quando irá ser realizada'
                                        handlerChangeTarefa={handlerChangeTarefa} 
                                        value={tarefa.data_tarefa}/>

                                <Input 
                                        type='text'
                                        name='descricao_tarefa'
                                        id='descricao_tarefa'
                                        placeholder='Digite a descrição da tarefa'
                                        text='Descrição'
                                        handlerChangeTarefa={handlerChangeTarefa}
                                        value={tarefa.descricao_tarefa} />
                                
                                <Select 
                                        name="categoria_id"
                                        text="Escolha uma categoria da tarefa"
                                        options={categorias}
                                        handleChangeCategoria={handleChangeCategoria} />

                                <Button 
                                rotulo='Editar Tarefa'/>

                        </form>

                </section>
        )
        }

export default UpdateTarefa
