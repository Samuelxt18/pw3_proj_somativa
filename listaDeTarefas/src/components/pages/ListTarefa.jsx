import React, { useState, useEffect } from "react"; // Importando useState e useEffect aqui
import style from './ListTarefa.module.css';
import Container from "../layout/Container.jsx";
import ContainerTarefa from '../layout/ContainerTarefa.jsx';
import CardTarefa from "../CardTarefas";
import corrida from '../../assets/corrida.png';

const ListTarefa = () => {
    /* CRIAÇÃO DO STATE DOS DADOS DAS TAREFAS */
    const [tarefas, setTarefas] = useState([]); // Renomeado para plural

    /* RECUPERA OS DADOS DAS TAREFAS DO BACKEND */
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
            setTarefas(data.data); // Corrigido para setTarefas
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
                        tarefas.length > 0 ? ( // Verifica se há tarefas
                            tarefas.map((t) => (
                                <CardTarefa
                                    key={t.cod_tarefa} // Certifique-se de que cod_categoria é único
                                    tarefa={t.nome_tarefa} // Alterado para corresponder ao esperado
                                    hora={t.data_tarefa} // Se necessário, adicione a propriedade hora
                                    imagem={corrida} // Imagem padrão
                                    cod_tarefas={t.cod_tarefa} // Adicione esta propriedade se necessário
                                />
                            ))
                        ) : (
                            <p>Nenhuma tarefa encontrada.</p> // Mensagem caso não haja tarefas
                        )
                    }
                </ContainerTarefa>
            </section>
        </Container>
    );
}

export default ListTarefa;