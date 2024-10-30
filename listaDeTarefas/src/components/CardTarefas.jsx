import style from './CardTarefas.module.css'
import Button from './button'

const CardTarefa = ({ tarefa, hora, imagem, cod_tarefas}) => {
    
    return(
        <div className={style.cardTarefa}>
            <h3 className={style.tarefa}>{tarefa}</h3>
            <p className={style.hora}>{hora}</p>
            <img src={imagem} alt={tarefa} title={{tarefa}} />
            <div>
                <Button label='DETALHE' router='/DetailDream/' cod_sonho={cod_sonho}/>
            </div>
        </div>
    )
}

export default CardTarefa;