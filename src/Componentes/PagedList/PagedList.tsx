import React, { useEffect, useState } from 'react';
import Share from "../ShareCards/Share"; 

const PagedList: React.FC = () => {
    const [shares, setShares] = useState<any[]>([]);
    const [page, setPage] = useState(1); 
    const [resultsPerPage] = useState(4); 

    useEffect(() => {
        const fetchShares = async () => {
            try {
                const sharesData = [
                    {
                        logoUrl: 'https://logo.clearbit.com/vale.com',
                        longName: 'Vale S.A.',
                        symbol: 'VALE3',
                        regularMarketPrice: 67.50,
                    },
                    {
                        logoUrl: 'https://logo.clearbit.com/petrobras.com.br',
                        longName: 'Petrobras',
                        symbol: 'PETR4',
                        regularMarketPrice: 29.20,
                    },
                    {
                        logoUrl: 'https://logo.clearbit.com/itau.com.br',
                        longName: 'Itaú Unibanco Holding S.A.',
                        symbol: 'ITUB4',
                        regularMarketPrice: 25.10,
                    },
                    {
                        logoUrl: 'https://logo.clearbit.com/tesla.com',
                        longName: 'Tesla, Inc.',
                        symbol: 'TSLA',
                        regularMarketPrice: 780.20,
                    },
                    {
                        logoUrl: 'https://logo.clearbit.com/apple.com',
                        longName: 'Apple Inc.',
                        symbol: 'AAPL',
                        regularMarketPrice: 145.85,
                    },
                    {
                        logoUrl: 'https://logo.clearbit.com/microsoft.com',
                        longName: 'Microsoft Corporation',
                        symbol: 'MSFT',
                        regularMarketPrice: 302.50,
                    }
                ];

                setShares(sharesData); 
            } catch (error) {
                console.error('Erro ao carregar ações: ', error);
            }
        };

        fetchShares(); 
    }, []);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); 
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1); 
        }
    };

    const startIndex = (page - 1) * resultsPerPage;
    const selectedShares = shares.slice(startIndex, startIndex + resultsPerPage);

    return (
        <>
            <div className="row">
                {selectedShares.length > 0 ? (
                    selectedShares.map((share, index) => (
                        <div className="col-4 card-spacing" key={index}>
                            <Share 
                                logoUrl={share.logoUrl} 
                                longName={share.longName} 
                                symbol={share.symbol} 
                                regularMarketPrice={share.regularMarketPrice} 
                            />
                        </div>
                    ))
                ) : (
                    <p>Carregando ações...</p>
                )}
            </div>

            <div className="pagination-buttons">
                <button className="btn btn-primary" onClick={handlePrevPage} disabled={page === 1}>
                    Página Anterior
                </button>
                <button className="btn btn-primary" onClick={handleNextPage} disabled={startIndex + resultsPerPage >= shares.length}>
                    Próxima Página
                </button>
            </div>
        </>
    );
}

export default PagedList;