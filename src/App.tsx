import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import CadastroUsuario from "./Paginas/CadastroUsuario/CadastroUsuario";
import Home from "./Paginas/Home/Home";
import HomePage from "./Paginas/AreaLogada/Home/Home";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CadastroUsuarios" element={<CadastroUsuario/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App
