import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL do backend Django
  headers: {
    'Content-Type': 'application/json',
  }
});

export interface EmentaItem {
  id: number;
  nome: string;
  tipo: 'ENT' | 'PRIN' | 'SOB' | 'BEB';
  preco: number;
  descricao: string;
  categoria?: string;
}

export const fetchEmenta = async (): Promise<EmentaItem[]> => {
  try {
    const response = await api.get('/api/ementa/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ementa:', error);
    throw error;
  }
};