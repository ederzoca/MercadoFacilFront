import React from 'react';
import PagedList from '../../../Componentes/PagedList/PagedList'; 
import './Home.css';  

const App: React.FC = () => {
    return (
        <div className="cards-container">
            <h1>Seção de Ações</h1>
            <div className="cards-grid">
                <PagedList />
            </div>
        </div>
    );
}

export default App;