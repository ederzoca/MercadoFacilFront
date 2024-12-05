import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Paginas/Home/Home'
import './App.css'
import CadastroUsuario from "./Paginas/CadastroUsuario/CadastroUsuario";
import AreaLogada from './Paginas/AreaLogada/Home/AreaLogada'
import PagedList from "./Componentes/PagedList/PagedList";
import CardInfo from "./Paginas/AreaLogada/CardInfo/CardInfo";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CadastroUsuarios" element={<CadastroUsuario/>}/>
        <Route path="/Home/AreaLogada" element={<AreaLogada/>}/>
        <Route path="/AcoesGerais" element={<PagedList/>}/>
        <Route path="/acao/:symbol" element={<CardInfo />} />
      </Routes>
    </Router>
  );
}

export default App