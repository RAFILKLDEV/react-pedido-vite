import { useState } from "react"
import { Contador } from "./contador"
import { produtoType } from "../types"

export function Produto({ setModalProduct, produto, carrinho, setCarrinho }: {
    produto: produtoType,
    carrinho: produtoType[],
    setCarrinho: Function,
    setModalProduct: Function
}) {

    const [modal, setModal] = useState(false)

    return (
        <>
            {modal && <Contador carrinho={carrinho} setCarrinho={setCarrinho} setModalProduct={setModalProduct} setModal={setModal} produto={produto} />}
            <div onClick={() => setModal(true)} className="h-56 w-52 flex flex-col items-center gap-2 bg-gray-200 border-black border-2 px-2 py-2 cursor-pointer">
                <img className="w-20" src="https://www.dadinhooriginal.com.br/wp-content/uploads/2016/02/BONECO-COM-LOGO-1.png" />
                <div className="w-full text-center font-bold">{produto?.produto}</div>
                <div className="font-semibold text-orange-700 text-sm">{produto?.peso}</div>
                <div className="font-semibold text-blue-700 text-sm">{produto?.embalagem}</div>
            </div>
        </>
    )
}