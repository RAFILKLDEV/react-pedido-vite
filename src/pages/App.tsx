import { useEffect, useState } from "react"
import { produtoType } from "../types"
import { Avisar } from "../components/aviso"
import { ModalProdutos } from "../components/modalProdutos"
import '../globals.css'

export default function App() {

  // CARRINHO
  const [carrinho, setCarrinho] = useState<produtoType[]>([])

  // MODAL
  const [modal, setModal] = useState(false)
  const [modalButtons, setModalButtons] = useState(true)
  const [modalAviso, setModalAviso] = useState({
    modal: false,
    produto: "",
    idx: 0,
    aviso: "",
    func: Function,
  })

  // CADASTRO
  const [cnpj, setCnpj] = useState("")
  const [razaoSocial, setRazaoSocial] = useState("")
  const [cnaeCodigo, setCnaeCodigo] = useState("")
  const [inscEstadual, setInscEstadual] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [cep, setCep] = useState("")
  const [telefone, setTelefone] = useState("")
  const [telefone2, setTelefone2] = useState("")
  const [fax, setFax] = useState("")
  const [cnpjEmail, setCnpjEmail] = useState("")
  const [email, setEmail] = useState("")
  const [XMLEmail, setXMLEmail] = useState("")

  // FRETE
  const [transportadora, setTransportadora] = useState("")
  const [frete, setFrete] = useState("")
  const [telFrete, setTelFrete] = useState("")
  const [condiPagamento, setCondiPagamento] = useState("")
  const [desconto, setDesconto] = useState("")
  const [tipoVenda, setTipoVenda] = useState("")
  const [canal, setCanal] = useState("")
  const [tributacao, setTributacao] = useState("")
  const [subsTributacao, setSubsTributacao] = useState("")

  // COMISSÃO
  const [nPedido, setNPedido] = useState("")
  const [dataComissao, setDataComissao] = useState("")
  const [tabela, setTabela] = useState("")
  const [codRepre, setCodRepre] = useState("")
  const [comissao, setComissao] = useState("")
  const [analiseCre, setAnaliseCre] = useState("")
  const [liberacaoFat, setLiberacaoFat] = useState("")
  const [digitadoPor, setDigitadoPor] = useState("")
  const [observacao, setObservacao] = useState("")

  function validarInput() {
    if (cnpj.length === 14) {
      validarCnpj()
    }
  }

  async function validarCnpj() {
    const request = `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`
    const response = await fetch(request).then(res => res.json())
    console.log("aqui", response)
    setRazaoSocial(response["RAZAO SOCIAL"])
    setCnaeCodigo(response["CNAE PRINCIPAL CODIGO"])
    setLogradouro(`${response.LOGRADOURO} N° ${response.NUMERO}`)
    setBairro(response.BAIRRO)
    setCidade(response.MUNICIPIO)
    setEstado(response.UF)
    setCep(response.CEP)
    setTelefone(response.TELEFONE)
    setCnpjEmail(response.EMAIL)
  }

  function somarTotal() {
    const total = carrinho.reduce((acc, value) => acc + value.preco * value.qtde, 0)
    return total.toFixed(2)
  }

  function somarCaixas() {
    const total = carrinho.reduce((acc, value) => acc + value.qtde, 0)
    return total
  }

  function tributoTes(e: produtoType) {
    if (estado === "SP") {
      if (tipoVenda === "VENDA") {
        if (tributacao === "SIMPLES") {
          return e.tributos.vendas.vendaSimples
        } else if (tributacao === "RPA") {
          return e.tributos.vendas.vendaRpa
        }
      } else if (tipoVenda === "BONIFICAÇÃO") {
        if (tributacao === "SIMPLES") {
          return e.tributos.bonif.bonifSimples
        } else if (tributacao === "RPA") {
          return e.tributos.bonif.bonifRpa
        }
      }
    } else {
      if (tipoVenda === "VENDA") {
        if (subsTributacao === "SIM") {
          return e.tributos.vendas.vendaUfST
        } else if (subsTributacao === "NÃO") {
          return e.tributos.vendas.vendaUf
        }
      } else if (tipoVenda === "BONIFICAÇÃO") {
        if (subsTributacao === "SIM") {
          return e.tributos.bonif.bonifUfST
        } else if (subsTributacao === "NÃO") {
          return e.tributos.bonif.bonifUf
        }
      }
    }
    return "NADA"
  }

  function temST() {
    switch (estado) {
      case "SP": return setSubsTributacao("SIM")
      case "DF": return setSubsTributacao("SIM")
      case "MT": return setSubsTributacao("SIM")
      case "MG": return setSubsTributacao("SIM")
      case "PR": return setSubsTributacao("SIM")
      case "RJ": return setSubsTributacao("SIM")
    }

    return setSubsTributacao("NÃO")
  }

  useEffect(() => {
    temST()
  }, [estado])

  return (
    <>
      {modalAviso?.modal && <Avisar aviso={modalAviso?.aviso} func={modalAviso?.func} setModal={setModalAviso} />}
      {modal && <ModalProdutos carrinho={carrinho} setCarrinho={setCarrinho} modal={modal} setModal={setModal} />}
      <main className="p-10 text-xs w-[1050px]">

        {/* CADASTRO */}

        <div className="flex w-full bg-gray-100">
          <img className="w-[180px] h-[170px] border-2 border-black border-b-0 border-r-0" src="https://www.dadinhooriginal.com.br/wp-content/uploads/2016/02/BONECO-COM-LOGO-1.png" />
          <div className="flex-col w-full">
            <div className="bg-gray-100 p-2 align-middle border-2 border-black text-red-700 font-bold">
              DOCE SABOR INDÚSTRIA E COMÉRCIO DE PRODUTOS ALIMENTÍCIOS EIRELI</div>
            <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-0 font-bold">
              CNPJ : 07.175.867/0002-08 - INSCRIÇÃO ESTADUAL :  143.154.297.110</div>
            <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-0 font-semibold">
              Rua Monsenhor Abreu, 73 - Pari - São Paulo - SP - CEP: 03035-115</div>
            <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-0 font-semibold">
              ADM DE VENDAS  (11) 2612-6270  Whastapp (11) 98365-0691</div>
            <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-0 border-b-0 text-red-700 font-bold">
              pedidos@dsabor.com.br ou pedidos@dadinhooriginal.com.br</div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-2 flex gap-2">
            <div className="font-bold ">CÓDIGO:</div>
            <input className="bg-inherit border-black border-r-2 pr-2 text-blue-950 font-bold w-16" value={cnaeCodigo} onChange={e => setCnaeCodigo(e.target.value)}></input>
            <div className="font-bold whitespace-nowrap">RAZÃO SOCIAL:</div>
            <input className="bg-inherit break-normal w-full text-blue-950 font-bold" value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)}></input>
          </div>
          <div className="bg-gray-100 p-2 w-full align-middle border-2 border-black border-t-0 flex gap-2">
            <div className="font-bold">CNPJ:</div>
            <input className="bg-inherit border-black border-r-2 pr-2 text-center text-blue-950 font-bold" autoFocus value={cnpj}
              onChange={e => setCnpj(e.target.value)} onBlur={validarInput} onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validarInput()
                }
              }} type="number" maxLength={14} />
            <div className="font-bold whitespace-nowrap">INSCR. ESTADUAL:</div>
            <input className="bg-inherit w-full text-blue-950 font-bold" value={inscEstadual} onChange={e => setInscEstadual(e.target.value)}></input>
          </div>
          <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-0 flex gap-2">
            <div className="font-bold">RUA:</div>
            <input className="bg-inherit w-full border-black border-r-2 text-blue-950 font-bold" value={logradouro} onChange={e => setLogradouro(e.target.value)}></input>
            <div className="font-bold">BAIRRO:</div>
            <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={bairro} onChange={e => setBairro(e.target.value)}></input>
            <div className="font-bold">CIDADE:</div>
            <input className="bg-inherit  border-black border-r-2 pr-2 w-96 whitespace-nowrap text-blue-950 font-bold" value={cidade} onChange={e => setCidade(e.target.value)}></input>
            <div className="font-bold">ESTADO:</div>
            <input className="bg-inherit w-52 text-blue-950 font-bold" value={estado} onChange={e => {
              setEstado(e.target.value)
            }}></input>
          </div>

          <div className="bg-gray-100 p-2 align-middle border-2 border-black border-t-0 flex gap-2 items-baseline">
            <div className="font-bold">CEP:</div>
            <input className="bg-inherit border-black border-r-2 pr-2 w-1/4 text-blue-950 font-bold" value={cep} onChange={e => setCep(e.target.value)}></input>
            <div className="font-bold">TELEFONE:</div>
            <input className="bg-inherit  border-black border-r-2 pr-2 w-1/4 text-blue-950 font-bold" value={telefone} onChange={e => setTelefone(e.target.value)}></input>
            <div className="font-bold">TELEFONE:</div>
            <input className="bg-inherit  border-black border-r-2 pr-2 w-1/4 text-blue-950 font-bold" value={telefone2} onChange={e => setTelefone2(e.target.value)}></input>
            <div className="font-bold">FAX:</div>
            <input className="bg-inherit w-1/4 text-blue-950 font-bold" value={fax} onChange={e => setFax(e.target.value)}></input>
          </div>
          <div className="bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-0 flex gap-2 items-baseline">
            <div className="font-bold w-auto whitespace-nowrap">EMAIL:</div>
            <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={cnpjEmail} onChange={e => setCnpjEmail(e.target.value)}></input>
            <div className="font-bold w-auto whitespace-nowrap">EMAIL:</div>
            <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={email} onChange={e => setEmail(e.target.value)}></input>
            <div className="font-bold w-auto whitespace-nowrap">EMAIL P/ XML:</div>
            <input className="bg-inherit w-full text-blue-950 font-bold" value={XMLEmail} onChange={e => setXMLEmail(e.target.value)}></input>
          </div>
        </div>

        {/* TRIBUTOS */}

        <div className="mt-4 bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-2 flex gap-2 flex-nowrap items-baseline">
          <div className="font-bold w-auto">TRANSPORTADORA:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={transportadora} onChange={e => setTransportadora(e.target.value)}></input>
          <div className="font-bold w-auto">FRETE:</div>
          <select className="bg-inherit border-black border-r-2 pr-2 text-blue-950 font-bold" value={frete} onChange={e => setFrete(e.target.value)}>
            <option hidden></option>
            <option>CIF</option>
            <option>FOB</option>
          </select>
          <div className="font-bold w-auto">TELEFONE:</div>
          <input className="bg-inherit w-full text-blue-950 font-bold" value={telFrete} onChange={e => setTelFrete(e.target.value)}></input>
        </div>
        <div className="flex w-full bg-gray-200">
          <div className="bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-0 flex gap-2 flex-nowrap items-baseline">
            <div className="font-bold w-auto whitespace-nowrap">CONDIÇÃO DE PAGAMENTO:</div>
            <select className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={condiPagamento} onChange={e => setCondiPagamento(e.target.value)}>
              <option hidden></option>
              <option>CRÉDITO EM CONTA</option>
              <option>BOLETO BANCARIO</option>
            </select>
            <div className="font-bold w-auto whitespace-nowrap">DESCONTOS EM %:</div>
            <input className="bg-inherit w-full text-blue-950 font-bold" value={desconto} onChange={e => setDesconto(e.target.value)}></input>
          </div>
        </div>
        <div className="flex w-full bg-gray-200 ">
          <div className="bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-0 flex gap-2 flex-nowrap items-baseline">
            <div className="font-bold w-auto whitespace-nowrap">TIPO DE VENDA:</div>
            <select className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={tipoVenda} onChange={e => setTipoVenda(e.target.value)}>
              <option hidden></option>
              <option>VENDA</option>
              <option>BONIFICAÇÃO</option>
            </select>
            <div className="font-bold w-auto whitespace-nowrap">CANAL:</div>
            <select className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={canal} onChange={e => setCanal(e.target.value)}>
              <option hidden></option>
              <option>ATACADO</option>
              <option>AUTO SERVIÇO</option>
              <option>CASH & CARRY</option>
              <option>DISTRIBUIDOR</option>
              <option>ESPECIAL</option>
              <option>CESTEIRO</option>
              <option>EXPORTAÇÃO</option>
            </select>
            <div className="font-bold w-auto whitespace-nowrap">TRIBUTAÇÃO:</div>
            <select className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={tributacao} onChange={e => setTributacao(e.target.value)}>
              <option hidden></option>
              <option>SIMPLES</option>
              <option>RPA</option>
            </select>
            <div className="font-bold w-auto whitespace-nowrap">SUBST. TRIBUTÁRIA:</div>
            <div className="bg-inherit pr-2 w-auto text-blue-950 font-bold">{subsTributacao}</div>
          </div>
        </div>

        {/* COMISSÃO */}

        <div className="mt-4 bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-2 flex gap-2 flex-nowrap items-baseline">
          <div className="font-bold w-auto whitespace-nowrap">N° PEDIDO:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={nPedido} onChange={e => setNPedido(e.target.value)}></input>
          <div className="font-bold w-auto">DATA:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={dataComissao} onChange={e => setDataComissao(e.target.value)}></input>
          <div className="font-bold w-auto whitespace-nowrap">TABELA:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={tabela} onChange={e => setTabela(e.target.value)}></input>
          <div className="font-bold w-auto whitespace-nowrap">COD REPRE.:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={codRepre} onChange={e => setCodRepre(e.target.value)}></input>
          <div className="font-bold w-auto">COMISSÃO:</div>
          <input className="bg-inherit w-full text-blue-950 font-bold" value={comissao} onChange={e => setComissao(e.target.value)}></input>
        </div>
        <div className="bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-0 flex gap-2 flex-nowrap items-baseline">
          <div className="font-bold w-auto whitespace-nowrap">ANALISE DE CREDITO:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={analiseCre} onChange={e => setAnaliseCre(e.target.value)}></input>
          <div className="font-bold w-auto whitespace-nowrap">LIBERAÇÃO FAT:</div>
          <input className="bg-inherit border-black border-r-2 pr-2 w-full text-blue-950 font-bold" value={liberacaoFat} onChange={e => setLiberacaoFat(e.target.value)}></input>
          <div className="font-bold w-auto whitespace-nowrap">DIGITADO POR:</div>
          <input className="bg-inherit border-black pr-2 w-full text-blue-950 font-bold" value={digitadoPor} onChange={e => setDigitadoPor(e.target.value)}></input>
        </div>
        <div className="bg-gray-100 w-full p-2 align-middle border-2 border-black border-t-0 flex gap-2 flex-nowrap">
          <div className="font-bold w-auto whitespace-nowrap">OBERSERVAÇÕES:</div>
          <input className="bg-inherit border-black pr-2 w-full text-blue-950 font-bold" value={observacao} onChange={e => setObservacao(e.target.value)}></input>
        </div>

        {/* BOTÃO ADICIONAR PRODUTOS */}

        {modalButtons && <div className="flex justify-center items-center m-10 gap-5 print:hidden">
          <button className="bg-green-300 p-4 border-black border-2 font-bold text-lg" onClick={() => setModal(!modal)}>Adicionar Produtos</button>
          <button className="bg-green-300 p-4 border-black border-2 font-bold text-lg" onClick={async () => {
            setModalButtons(false)
            await window.print()
            setModalButtons(true)
          }}>Imprimir</button>
        </div>}

        {/* TABELA DE PRODUTOS */}

        <div className="bg-gray-400 p-2 border-2 print:mt-10 border-black border-t-2 grid grid-cols-[60px_320px_60px_95px_80px_50px_50px_50px_70px_auto]">
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">CÓDIGO</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">PRODUTO</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">PESO</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">EMBALAGEM</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">C.FISCAL</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">I.P.I</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">TES</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">QTDE</div>
          <div className="border-black border-r-2 font-bold whitespace-nowrap text-center">PREÇO</div>
          <div className="font-bold  whitespace-nowrap text-center">TOTAL</div>
        </div>

        {/* LISTA DE PRODUTOS */}

        {carrinho?.map((e, idx) => <div key={e.produto + idx} className="bg-gray-200 p-2 border-2 border-black border-t-0 grid grid-cols-[60px_320px_60px_95px_80px_50px_50px_50px_70px_auto] [&:nth-child(even)]:bg-gray-300" >
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{e.codigo}</div>
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{e.produto}</div>
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{e.peso}</div>
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{e.embalagem}</div>
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{e.ClassFiscal}</div>
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{e.tributos.ipi}</div>
          <div className="border-black border-r-2 border-t-0 font-bold whitespace-nowrap text-center">{tributoTes(e)}</div>
          <input className="border-black border-r-2 font-bold bg-inherit text-center m-0 webkit-outer-spin-button" type="number" value={e.qtde} onChange={el => {
            const values = [...carrinho]
            if (Number(el.target.value) <= 0 || null) {
              if (window.confirm(`Deseja Remover "${e.produto}"?`)) {
                values.splice(idx, 1)
                setCarrinho(values)
              }
            } else {
              values[idx].qtde = Number(el.target.value)
              setCarrinho(values)
            }
          }}></input>
          <input className="border-black border-r-2 border-t-0 p-0 font-bold whitespace-nowrap text-center bg-inherit" type="number"
            value={e.preco} onChange={el => {
              const values = [...carrinho]
              values[idx].preco = Number(el.target.value)
              setCarrinho(values)
            }}></input>
          <div className="border-t-0 font-bold whitespace-nowrap text-center">R$ {(e.preco * e.qtde).toFixed(2)}</div>
        </div>)}

        {/* CARRINHO VAZIO */}

        {!carrinho.length && <div className="bg-gray-200 p-2 align-middle border-2 border-black border-t-0 justify-center flex gap-2 [&:nth-child(even)]:bg-gray-300" >
          <div className="border-black border-t-0 pr-2 whitespace-nowrap text-center font-bold">VAZIO</div>
        </div>}

        {/* TOTAL */}

        <div className="flex justify-center">
          <div className="bg-gray-400 p-2 text-center border-2 w-96 border-black border-t-2 flex gap-2 mt-2">
            <div className="border-black border-r-2 pr-2 font-bold w-[140px] whitespace-nowrap text-center">N° de Caixas</div>
            <div className="border-black border-r-2 pr-2 font-bold w-[80px] whitespace-nowrap text-center">{somarCaixas()}</div>
            <div className="border-black border-r-2 pr-2 font-bold w-[80px] whitespace-nowrap text-center">TOTAL</div>
            <div className="font-bold w-[120px] whitespace-nowrap text-center">R${somarTotal()}</div>
          </div>
        </div>
      </main>
    </>
  )
}
