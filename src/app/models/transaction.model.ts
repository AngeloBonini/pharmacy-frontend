export interface Transaction {
    id: number;
    produtoId: number;
    quantidade: number;
    tipo: string;
    data: string;
    produtoNome?:string;
  }
  