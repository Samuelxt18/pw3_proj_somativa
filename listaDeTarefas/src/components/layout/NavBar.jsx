
import { Outlet,Link } from 'react-router-dom';
import style from './NavBar.module.css'

const NavBar = () =>{

    return(
        <>
       <nav className={style.navBar}>

        <ul className={style.list}>
            <Link to='/'>
                <li className={style.item}><img className={style.logo} src="./listpng.png"/></li>
            </Link>

            <Link to='/'>
            <li className={style.item}>Home</li>
            </Link>
            
            <Link to='/CreateList'>
            <li className={style.item}>Cadastrar</li>
            </Link>

            <Link to='/ListTarefa'>
            <li className={style.item}>Listar Tarefa</li>
            </Link>
            
        </ul>
        </nav>
        
        
        <Outlet/>
        </>  
        
    )
  
}
export default NavBar;