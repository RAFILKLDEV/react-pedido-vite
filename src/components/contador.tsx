import { useState } from "react"
import { produtoType } from "../types"

export function Contador({ carrinho, setCarrinho, produto, setModal, setModalProduct }:
    { carrinho: produtoType[], setCarrinho: Function, produto: produtoType, setModal: Function, setModalProduct: Function }) {
    const [quantidade, setQuantidade] = useState(produto.qtde)

    function fecharModal() {
        const values = [...carrinho]
        produto.qtde = quantidade
        values.push(produto)
        setCarrinho(values)
        setModal(false)
        setModalProduct(false)
    }

    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center">
            <div className="bg-green-400 border-black border-2 p-5 flex flex-col gap-5 justify-center items-center">
                <div className="text-[30px]">Quantidade</div>
                <input autoFocus className="text-center" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))}></input>
                <div className="flex flex-col gap-2">
                    <button onClick={() => fecharModal()} className="bg-green-300 p-2 border-black border-2 font-bold">OK</button>
                    <button onClick={() => {
                        const values = [...carrinho]
                        produto.qtde = quantidade
                        values.push(produto)
                        setCarrinho(values)
                        setModal(false)
                    }} className="bg-green-300 p-2 border-black border-2 font-bold">Continuar Selecionando</button>
                </div>
            </div>
        </div>
    )
}