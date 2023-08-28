export type produtoType = {
    codigo: number,
    produto: string,
    peso: string,
    embalagem: string,
    ClassFiscal: number,
    familia: string,
    qtde: number,
    preco: number,
    total: number,
    tributos: {
        ipi: string,
        vendas: {
            vendaSimples: number,
            vendaRpa: number,
            vendaUf: number,
            vendaUfST: number
        },
        bonif: {
            bonifRpa: number,
            bonifSimples: number,
            bonifUf: number,
            bonifUfST: number
        }
    }
}
