// src/components/EmentaList.tsx
import { useEffect, useState } from 'react';
import { EmentaItem, fetchEmenta } from '../api';

export function EmentaList() {
  const [itens, setItens] = useState<EmentaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmenta()
      .then(data => {
        setItens(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erro ao carregar ementa');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cardápio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map(item => (
          <div key={item.id} className="border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg">
              {item.nome} - €{item.preco.toFixed(2)}
            </h3>
            <p className="text-gray-600">{item.descricao}</p>
            {item.categoria && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                {item.categoria}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}