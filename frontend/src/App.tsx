import { useEffect, useState } from 'react';
import * as apiModule from './api';  // Importação única como namespace
import './App.css';

// Debug - verifique as exportações
console.log('API Module exports:', apiModule);

// Use as exportações diretamente do namespace
type EmentaItem = apiModule.EmentaItem;
// Não declare fetchEmenta novamente - use diretamente apiModule.fetchEmenta

function App() {
  const [itens, setItens] = useState<EmentaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiModule.fetchEmenta()  // Chamada direta via namespace
      .then(data => {
        setItens(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erro ao carregar o cardápio');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const groupByType = (items: EmentaItem[]) => {
    return items.reduce((acc, item) => {
      const type = item.tipo;
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {} as Record<string, EmentaItem[]>);
  };

  const groupedItems = groupByType(itens);
  const typeLabels = {
    'ENT': 'Entradas',
    'PRIN': 'Pratos Principais',
    'SOB': 'Sobremesas',
    'BEB': 'Bebidas'
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-container">
      <h1>Ementa do Restaurante</h1>
      {Object.entries(groupedItems).map(([type, items]) => (
        <section key={type} className="menu-section">
          <h2>{typeLabels[type as keyof typeof typeLabels]}</h2>
          <div className="items-grid">
            {items.map(item => (
              <div key={item.id} className="menu-item">
                <div className="item-header">
                  <h3>{item.nome}</h3>
                  {item.categoria && <span className="category">{item.categoria}</span>}
                </div>
                <p>{item.descricao}</p>
                <div className="price">{item.preco.toFixed(2)}€</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default App;