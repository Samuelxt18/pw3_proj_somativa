import style from './CardTarefas.module.css';
import Button from './forms/Button';

const CardTarefas = ({ tarefa, hora, imagem, cod_tarefas }) => {
    return (
        <div className={style.cardTarefa}>
            <h3 className={style.tarefa}>{tarefa}</h3>
            <p className={style.hora}>{hora}</p>
            <img src={imagem} alt={tarefa} title={tarefa} /> {/* Corrigido para usar tarefa como string */}
            <div>
                <Button rotulo='DETALHE' router={`/DetailTarefa/${cod_tarefas}`} /> {/* Usando cod_tarefas */}
            </div>
        </div>
    );
};

export default CardTarefas;