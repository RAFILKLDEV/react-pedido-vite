import { lista } from "../produtos";
import { Produto } from "./produto";
import { useEffect, useState } from "react";
import { produtoType } from "../types";

export function ModalProdutos({ carrinho, setCarrinho, setModal }: { carrinho: produtoType[], setCarrinho: Function, modal: boolean, setModal: Function }) {

    const [list, setList] = useState<produtoType[]>([])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")

    const familias = [
        {
            nome: "Dadinho",
            img: "https://www.dadinhooriginal.com.br/wp-content/uploads/2016/02/BONECO-COM-LOGO-1.png"
        },
        {
            nome: "Coberto",
            img: "https://m.media-amazon.com/images/I/514VNnfSfVL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            nome: "Bombom",
            img: "https://www.dadinhooriginal.com.br/wp-content/uploads/2017/07/BOMBOM_BOLA_165G_AO_LEITE_FLOWPACK.png"
        },
        {
            nome: "DoceSabor",
            img: "https://docevidaflorianopolis.com.br/wp-content/uploads/2018/05/Untitled-1.jpg"
        },
        {
            nome: "Gamadinho",
            img: "https://a-static.mlcdn.com.br/450x450/pacote-bala-de-amendoin-gamadinho-dadinho-600gr-doce-sabor/produtosdemaquiagem/10835p/70f66343a244827adf98df945cb1daa4.jpg"
        },
        {
            nome: "Institucional",
            img: "https://a-static.mlcdn.com.br/1500x1500/dadinho-creme-bisnaga-1kg/e-monteirofoodservice/110249aaf64011edb96c4201ac185049/7c38a852cc30006db701a9ce2a64a72e.jpeg"
        },
        {
            nome: "Paçoca",
            img: "https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/10/Dadinho-Pacoca-flowpack-15g-Credito-Divulgacao-scaled.jpg"
        },
        {
            nome: "Wafer",
            img: "https://d3gdr9n5lqb5z7.cloudfront.net/fotos/7078_big.jpg"
        },

    ]

    function ordenarPorNome([...array]: { produto: string }[]) {
        array.sort((a, b) => {
            if (a.produto > b.produto) {
                return 1
            }

            if (a.produto < b.produto) {
                return -1
            }

            return 0
        })

        return array
    }

    function habilitarFiltro(idx: number) {
        if (!filter) {
            setFilter(familias[idx].nome)
        } else {
            if (filter === familias[idx].nome) {
                setFilter("")
            } else {
                setFilter(familias[idx].nome)
            }

        }
    }

    useEffect(() => {
        const listaFlat = [...lista].flat()
        ordenarPorNome(listaFlat)
        setList(listaFlat)
    }, [])

    return <div className=" flex flex-col z-10 absolute min-h-screen w-full top-0 left-0 bg-yellow-600 p-10 gap-12">
        <div className="w-full flex items-center justify-center gap-4">
            {familias.map((e, idx) => {
                return <div key={e.nome} style={{ backgroundColor: filter == e.nome ? "green" : "white" }} onClick={() => habilitarFiltro(idx)} className="h-52 w-80 border-black border-2 p-2 flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <img className="w-64 h-20" src={e.img} />
                    <div>{e.nome}</div>
                </div>
            })}
        </div>
        <div className="flex items-center justify-center gap-20">
            <button className="w-32 bg-white text-center p-1 placeholder-black font-bold border-black border-2" onClick={() => setModal(false)}>Voltar</button>
            <input value={search} onChange={e => setSearch(e.target.value)} className="w-80 text-center p-1 placeholder-black font-bold border-black border-2" placeholder="Pesquisa..." />
        </div>
        <div className="w-full grid grid-cols-5 items-center justify-center gap-4 flex-wrap">
            {
                list.map((e, idx) => {
                    if (filter !== "") {
                        if (e.familia.toLowerCase().includes(filter.toLowerCase())) {
                            console.log("includes")
                            return <Produto key={e.produto + idx} setModalProduct={setModal} produto={e} carrinho={carrinho} setCarrinho={setCarrinho} />
                        }

                        return
                    }

                    if (search !== "") {
                        if (e.produto.toLowerCase().includes(search.toLowerCase())) {
                            console.log("includes")
                            return <Produto key={e.produto + idx} setModalProduct={setModal} produto={e} carrinho={carrinho} setCarrinho={setCarrinho} />
                        }

                        return
                    }

                    return <Produto key={e.produto + idx} setModalProduct={setModal} produto={e} carrinho={carrinho} setCarrinho={setCarrinho} />
                })
            }
        </div>
    </div>
}