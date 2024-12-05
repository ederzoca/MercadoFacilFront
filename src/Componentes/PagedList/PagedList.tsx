import React, { useEffect, useState } from 'react';
import Share from "../ShareCards/Share";
import { FetchShareListPaged } from "../../Servicos/MercadoFacilAPI";
import { useNavigate } from 'react-router-dom';
import './PagedList.css';
 
const PagedList: React.FC = () => {
    const [shares, setShares] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [resultsPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);
 
    const maxVisiblePages = 10;
    const navigate = useNavigate();
 
    const getUserFromSession = () => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        return user;
    };
 
    const updateUserInSession = (user: any) => {
        sessionStorage.setItem('user', JSON.stringify(user));
    };
 
    const getFavoritesFromUser = () => {
        const user = getUserFromSession();
        return user.observedShares || [];
    };
 
    const saveFavoritesToUser = (updatedFavorites: any[]) => {
        const user = getUserFromSession();
        user.observedShares = updatedFavorites;  
        updateUserInSession(user);
    };
 
    useEffect(() => {
        const fetchShares = async () => {
    try {
        setLoading(true);
        const response = await FetchShareListPaged(page, resultsPerPage);
        console.log('Dados da API:', response); // Adicione este log
        setShares(response.items);
        setTotalPages(response.totalPages);
    } catch (error) {
        console.error('Erro ao carregar ações: ', error);
    } finally {
        setLoading(false);
    }
};

 
        fetchShares();
        
        const storedFavorites = getFavoritesFromUser();
        setFavorites(storedFavorites);
    }, [page, resultsPerPage]);
 
    const handleShareClick = (symbol: string) => {
        navigate(`/acao/${symbol}`);
    };
 
    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };
 
    const handlePreviousGroup = () => {
        if (page > 1) setPage((prevPage) => Math.max(1, prevPage - maxVisiblePages));
    };
 
    const handleNextGroup = () => {
        if (page < totalPages) setPage((prevPage) => Math.min(totalPages, prevPage + maxVisiblePages));
    };
 
    const toggleFavorite = (share: any) => {
        const isFavorited = favorites.some((fav) => fav.symbol === share.symbol);
        let updatedFavorites;
 
        if (isFavorited) {
            updatedFavorites = favorites.filter((fav) => fav.symbol !== share.symbol);
        } else {
            updatedFavorites = [...favorites, share];
        }
 
        setFavorites(updatedFavorites);
        saveFavoritesToUser(updatedFavorites);
    };
 
    const toggleShowFavorites = () => {
        setShowFavorites((prev) => !prev);
    };
 
    const startPage = Math.floor((page - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
 
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="header">
                <button className="btn btn-primary" onClick={toggleShowFavorites}>
                    {showFavorites ? 'Mostrar Todas as Ações' : 'Mostrar Favoritas'}
                </button>
            </div>
 
            <div className="carousel-inner">
                {loading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                ) : (showFavorites ? favorites : shares).length > 0 ? (
                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row">
                            {(showFavorites ? favorites : shares).slice(0, 6).map((share) => (
                                <div className="col-4 col-sm-6 col-md-4 card-spacing" key={share.id}>
                                    <button
                                        className="card-button"
                                        onClick={() => handleShareClick(share.symbol)}
                                        style={{ width: '100%', height: '100%', border: 'none', background: 'none' }}
                                    >
                                        <Share
                                            logoUrl={share.logourl}
                                            longName={share.longName}
                                            symbol={share.symbol}
                                            regularMarketPrice={share.regularMarketPrice}
                                        />
                                    </button>
                                    <button
                                        className={`btn ${favorites.some((fav) => fav.symbol === share.symbol) ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => toggleFavorite(share)}
                                    >
                                        {favorites.some((fav) => fav.symbol === share.symbol)
                                            ? 'Remover dos Favoritos'
                                            : 'Adicionar aos Favoritos'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>{showFavorites ? 'Sem ações favoritadas.' : 'Sem ações disponíveis.'}</p>
                )}
            </div>
 
            {!showFavorites && (
                <div className="pagination">
                    <button
                        onClick={handlePreviousGroup}
                        disabled={page <= maxVisiblePages || loading}
                        className="page-button"
                    >
                        &laquo;
                    </button>
                    {visiblePages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`page-button ${page === pageNumber ? 'active' : ''}`}
                            disabled={loading}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        onClick={handleNextGroup}
                        disabled={endPage >= totalPages || loading}
                        className="page-button"
                    >
                        &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};
 
export default PagedList;
 
 