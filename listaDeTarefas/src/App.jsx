/* importa os componentes de navegação da aplicacão*/
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/*importa o css*/
import './App.css'

// importa o componente de meu
import NavBar from './components/layout/NavBar'

import Container from './components/layout/Container'

/*importação das paginas*/
import Home from './components/pages/Home'
import ListTarefa from './components/pages/ListTarefa'
import CreateList from './components/pages/CreateList'



   /*tem que estar igual no navbar na tag route quando for importar Samuel */


function App() {

  return (
    <>
    {/*Estrutura de navegação*/}
    <BrowserRouter>

    <Container>
 
      <Routes>    

      <Route path='/' element={<NavBar/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/createList' element={<CreateList/>}/>
      <Route path='/listTarefa' element={<ListTarefa/>}/> 
      </Route>
      </Routes>

    </Container>

    </BrowserRouter>
  </>
  )
}

export default App
