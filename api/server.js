const express = require('express');
const app = express();
const port = 3000;

// Mock data
const mockData = {
    pessoas: [
        { id: 1, nome: 'João Silva', email: 'joao.silva@example.com', tipo: 'Cliente' },
        { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@example.com', tipo: 'Farmaceutico' },
        { id: 3, nome: 'Carlos Souza', email: 'carlos.souza@example.com', tipo: 'Caixa' },
        { id: 4, nome: 'Ana Pereira', email: 'ana.pereira@example.com', tipo: 'Fornecedor' },
        { id: 5, nome: 'Lucas Lima', email: 'lucas.lima@example.com', tipo: 'Cliente' },
        { id: 6, nome: 'Mariana Costa', email: 'mariana.costa@example.com', tipo: 'Farmaceutico' },
        { id: 7, nome: 'Pedro Martins', email: 'pedro.martins@example.com', tipo: 'Caixa' },
        { id: 8, nome: 'Fernanda Silva', email: 'fernanda.silva@example.com', tipo: 'Fornecedor' },
        { id: 9, nome: 'Ricardo Alves', email: 'ricardo.alves@example.com', tipo: 'Cliente' },
        { id: 10, nome: 'Juliana Santos', email: 'juliana.santos@example.com', tipo: 'Farmaceutico' }
    ],
    produtos: [
        { id: 1, nome: 'Paracetamol', descricao: 'Medicamento para dor e febre', controlado: false, preco: 5.0 },
        { id: 2, nome: 'Ibuprofeno', descricao: 'Anti-inflamatório e analgésico', controlado: false, preco: 12.0 },
        { id: 3, nome: 'Rivotril', descricao: 'Medicamento controlado para ansiedade', controlado: true, preco: 30.0 },
        { id: 4, nome: 'Amoxicilina', descricao: 'Antibiótico', controlado: false, preco: 15.0 },
        { id: 5, nome: 'Dipirona', descricao: 'Analgesico e antipiretico', controlado: false, preco: 8.0 },
        { id: 6, nome: 'Omeprazol', descricao: 'Medicamento para problemas gástricos', controlado: false, preco: 20.0 },
        { id: 7, nome: 'Clonazepam', descricao: 'Medicamento controlado para epilepsia', controlado: true, preco: 25.0 },
        { id: 8, nome: 'Aspirina', descricao: 'Analgésico e anti-inflamatório', controlado: false, preco: 10.0 },
        { id: 9, nome: 'Losartana', descricao: 'Medicamento para hipertensão', controlado: false, preco: 18.0 },
        { id: 10, nome: 'Simvastatina', descricao: 'Medicamento para colesterol', controlado: false, preco: 22.0 }
    ],
    saldos: [
        { id: 1, produtoId: 1, quantidade: 100 },
        { id: 2, produtoId: 2, quantidade: 50 },
        { id: 3, produtoId: 3, quantidade: 20 },
        { id: 4, produtoId: 4, quantidade: 80 },
        { id: 5, produtoId: 5, quantidade: 60 },
        { id: 6, produtoId: 6, quantidade: 90 },
        { id: 7, produtoId: 7, quantidade: 30 },
        { id: 8, produtoId: 8, quantidade: 110 },
        { id: 9, produtoId: 9, quantidade: 70 },
        { id: 10, produtoId: 10, quantidade: 40 }
    ],
    transacoes: [
        { id: 1, produtoId: 1, quantidade: 10, tipo: 'entrada', data: '2024-06-01' },
        { id: 2, produtoId: 2, quantidade: 5, tipo: 'saida', data: '2024-06-02' },
        { id: 3, produtoId: 3, quantidade: 15, tipo: 'entrada', data: '2024-06-03' },
        { id: 4, produtoId: 4, quantidade: 8, tipo: 'entrada', data: '2024-06-04' },
        { id: 5, produtoId: 5, quantidade: 6, tipo: 'saida', data: '2024-06-05' },
        { id: 6, produtoId: 6, quantidade: 9, tipo: 'entrada', data: '2024-06-06' },
        { id: 7, produtoId: 7, quantidade: 3, tipo: 'entrada', data: '2024-06-07' },
        { id: 8, produtoId: 8, quantidade: 11, tipo: 'saida', data: '2024-06-08' },
        { id: 9, produtoId: 9, quantidade: 7, tipo: 'entrada', data: '2024-06-09' },
        { id: 10, produtoId: 10, quantidade: 4, tipo: 'entrada', data: '2024-06-10' }
    ],
    receitas: [
        { id: 1, nome: 'Receita 1', descricao: 'Receita para tratamento de hipertensão', data: '2024-06-01' },
        { id: 2, nome: 'Receita 2', descricao: 'Receita para controle de diabetes', data: '2024-06-02' },
        { id: 3, nome: 'Receita 3', descricao: 'Receita para tratamento de ansiedade', data: '2024-06-03' },
        { id: 4, nome: 'Receita 4', descricao: 'Receita para tratamento de infecção', data: '2024-06-04' },
        { id: 5, nome: 'Receita 5', descricao: 'Receita para controle de dor crônica', data: '2024-06-05' },
        { id: 6, nome: 'Receita 6', descricao: 'Receita para tratamento de insônia', data: '2024-06-06' },
        { id: 7, nome: 'Receita 7', descricao: 'Receita para controle de epilepsia', data: '2024-06-07' },
        { id: 8, nome: 'Receita 8', descricao: 'Receita para tratamento de depressão', data: '2024-06-08' },
        { id: 9, nome: 'Receita 9', descricao: 'Receita para controle de colesterol', data: '2024-06-09' },
        { id: 10, nome: 'Receita 10', descricao: 'Receita para controle de alergia', data: '2024-06-10' }
    ],
    auth: {
        token: 'mock-jwt-token'
    }
};

// Middleware to parse JSON
app.use(express.json());

// Endpoints

// Pessoa
app.get('/pessoa', (req, res) => {
    res.json(mockData.pessoas);
});

app.post('/pessoa/populate/farmaceuticos', (req, res) => {
    res.json({ message: 'Farmaceuticos populated' });
});

app.post('/pessoa/populate/clientes', (req, res) => {
    res.json({ message: 'Clientes populated' });
});

// Auth
app.post('/auth/login', (req, res) => {
    res.json(mockData.auth);
});

// Produto
app.get('/produto', (req, res) => {
    res.json(mockData.produtos);
});

app.post('/produto', (req, res) => {
    res.json({ message: 'Produto created' });
});

// Saldo
app.get('/saldo', (req, res) => {
    res.json(mockData.saldos);
});

// Transacao
app.get('/transacao', (req, res) => {
    res.json(mockData.transacoes);
});

// Receita
app.get('/receita', (req, res) => {
    res.json(mockData.receitas);
});

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});
