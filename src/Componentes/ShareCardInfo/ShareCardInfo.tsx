import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate em vez de useHistory
import { FetchShareBySymbol } from '../../Servicos/MercadoFacilAPI'; // Função para buscar a ação pelo símbolo
import './ShareCardInfo.css'

const ShareDetails: React.FC = () => {
    const { symbol } = useParams(); // Pegando o símbolo da URL
    const navigate = useNavigate(); // Usando o hook useNavigate para navegação
    const [shareData, setShareData] = useState<any>(null); // Estado para armazenar os dados da ação
    const [loading, setLoading] = useState<boolean>(true); // Estado para carregar a página

    useEffect(() => {
        const fetchShare = async () => {
            if (symbol) {
                try {
                    const data = await FetchShareBySymbol(symbol); // Fazendo a chamada para a API
                    setShareData(data); // Armazenando os dados no estado
                } catch (error) {
                    console.error('Erro ao buscar dados da ação:', error);
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            }
        };
        
        fetchShare();
    }, [symbol]); // Quando o símbolo mudar, a função será chamada novamente

    if (loading) {
        return (
            <div>Carregando...</div> // Mensagem de carregamento
        );
    }

    // Verificando se os dados da ação foram carregados corretamente
    if (!shareData) {
        return <div>Ação não encontrada.</div>;
    }

    // Função para voltar ao menu de ações
    const goToMenu = () => {
        navigate('/Home/AreaLogada'); // Substitua '/menu-acoes' pela rota do seu menu
    };

    return (
        <div className="share-details-container">
        <div className="share-header">
            <div className="share-header-content">
                <img src={shareData.logourl} alt={`${shareData.shortName} logo`} className="share-logo" />
                <div className="share-info">
                    <h1 className="share-name">{shareData.shortName}</h1>
                    <p className="share-symbol">{shareData.symbol}</p>
                </div>
            </div>
        </div>
    
        <div className="share-body">
            <div className="share-left-column">
                <div className="stat">
                    <p><strong>Preço Atual:</strong> {shareData.regularMarketPrice}</p>
                    <p><strong>Variação do Dia:</strong> {shareData.regularMarketChange} ({shareData.regularMarketChangePercent}%)</p>
                    <p><strong>Máxima do Dia:</strong> {shareData.regularMarketDayHigh}</p>
                    <p><strong>Mínima do Dia:</strong> {shareData.regularMarketDayLow}</p>
                    <p><strong>Variação do Preço:</strong> {shareData.regularMarketRange}</p>
                </div>
                <div className="stat">
                    <p><strong>Capitalização de Mercado:</strong> {shareData.marketCap}</p>
                    <p><strong>Volume de Negociação:</strong> {shareData.regularMarketVolume}</p>
                    <p><strong>Volume Médio (3 meses):</strong> {shareData.averageDailyVolume3Month}</p>
                    <p><strong>Volume Médio (10 dias):</strong> {shareData.averageDailyVolume10Day}</p>
                </div>
            </div>
            
            <div className="share-right-column">
                <div className="stat">
                    <p><strong>Preço/Lucro:</strong> {shareData.priceEarnings}</p>
                    <p><strong>Lucro por Ação:</strong> {shareData.earningsPerShare}</p>
                    <p><strong>52 Semanas - Máxima/Minima:</strong> {shareData.fiftyTwoWeekRange}</p>
                    <p><strong>Variação da Máxima de 52 semanas:</strong> {shareData.fiftyTwoWeekHighChange} ({shareData.fiftyTwoWeekHighChangePercent}%)</p>
                    <p><strong>Variação da Mínima de 52 semanas:</strong> {shareData.fiftyTwoWeekLowChange} ({shareData.fiftyTwoWeekLowChangePercent}%)</p>
                </div>
                <div className="stat">
                    <p><strong>Variação dos Últimos 200 Dias:</strong> {shareData.twoHundredDayAverageChange} ({shareData.twoHundredDayAverageChangePercent}%)</p>
                    <p><strong>Máxima dos Últimos 52 Semanas:</strong> {shareData.fiftyTwoWeekHigh}</p>
                    <p><strong>Mínima dos Últimos 52 Semanas:</strong> {shareData.fiftyTwoWeekLow}</p>
                </div>
            </div>
        </div>
    
        <div className="share-footer">
            <div className="share-buttons">
                <button onClick={goToMenu}>Menu de Ações</button>
            </div>
        </div>
    </div>
    );    
};

export default ShareDetails;