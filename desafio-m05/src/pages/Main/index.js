import { useEffect, useState } from 'react';
import api from '../../api/api';
import btnfiltro from '../../assets/Botão filtro.svg';
import closealerta from '../../assets/Icon.svg';
import alertalogo from '../../assets/alerta Mensagem.svg';
import cobrancaLogo from '../../assets/cobrancaLogo.svg';
import cobrancasPagas from '../../assets/cobrancasPagas.svg';
import cobrancasPrevistas from '../../assets/cobrancasPrevistas.svg';
import cobrancasVencidas from '../../assets/cobrancasVencidas.svg';
import logocliente from '../../assets/logocliente.svg';
import naoencontrado from '../../assets/nãoencontrado.svg';
import BoxCliente from '../../components/Box/BoxCliente';
import BoxCobranca from '../../components/Box/BoxCobranca';
import ResumeBill from '../../components/Box/ResumeBill';
import Header from '../../components/Header';
import LeftMenu from '../../components/LeftMenu';
import DetalheCliente from '../../components/Modal/DetalheCliente';
import ModalCadastroCobranca from '../../components/Modal/ModalCadastroCobranca';
import ModalCliente from '../../components/Modal/ModalCliente';
import ModalDelite from '../../components/Modal/ModalDelite';
import ModalEdite from '../../components/Modal/ModalEditar';
import ModalEditeCliente from '../../components/Modal/ModalEditarCliente';
import ModalEditarCobranca from '../../components/Modal/ModalEditarCobranca';
import TableCliente from '../../components/Tables/TableCliente';
import TableClienteBusca from '../../components/Tables/TableClienteBusca';
import TableCobranca from '../../components/Tables/TableCobranca';
import TableCobrancaBusca from '../../components/Tables/TableCobrancaBusca';
import TableCobrancaCliente from '../../components/Tables/TableCobrancaCliente';
import TableCobrancaStatus from '../../components/Tables/TableCobrancaStatus';
import { useHooke } from '../../context/context';
import { getItem } from '../../utils/storage';
import './style.css';

export default function Main() {
  const { containerCliente,
    containerHero,
    containerCobranca,
    showModal,
    showModalEdite,
    abrirModal,
    alertaCliente,
    setAlertaCliente,
    containerDetalhe,
    showModalEditeCliente,
    showModalCobranca,
    setShowModalCobranca,
    showModalEditarCobranca,
    showModalDelite,
    alertaError,
    setAlertaError,
    alertaDeletar,
    setAlertaDeletar,
    alertaEditar,
    setAlertaEditar,
    alertaCobranca,
    setAlertaCobranca,
    alertaEditarCliente,
    setAlertaEditarCliente,
    tableVencido,
    setTableVencido,
    resultadoBusca,
    listaResultadoDaBusca,
    buscaNaoEncontrada,
    setBuscaNaoEncontrada,
    tabelaCompleta,
    setTabelaCompleta,
    setResultadoBusca,
    setArrayBusca,
    setListaResultadoBusca,
    arrayBusca,
    setArrayBuscaCobranca,
    arrayBuscaCobranca,
    resultadoBuscaCobranca,
    setResultadoBuscaCobranca,
    tabelaCompletaCobranca,
    setTabelaCompletaCobranca,
    buscaNaoEncontradaCobranca,
    setBuscaNaoEncontradaCobranca

  } = useHooke()

  const [localArray, setLocalArray] = useState([])
  async function getCliente() {
    try {
      const responseClientes = await api.get('clientes',
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setLocalArray([...responseClientes.data])
    } catch (error) {
      console.log(error)
    }
  }



  const handleChange = (event) => {
    setResultadoBusca(event.target.value)
    setTabelaCompletaCobranca(false)
  };

  function busca(localArray, resultadoBusca) {
    return localArray.filter(item => {
      const nome = item.nome.toLowerCase()
      const cpf = item.cpf.toString()
      const email = item.email.toLowerCase()
      setTabelaCompleta(false)
      setBuscaNaoEncontrada(false)
      setListaResultadoBusca(true)
      if (nome.includes(resultadoBusca) || cpf.includes(resultadoBusca) || email.includes(resultadoBusca)) {
        return (nome.includes(resultadoBusca) || cpf.includes(resultadoBusca) || email.includes(resultadoBusca))
      } else if (!arrayBusca.length) {
        setTabelaCompleta(false)
        setListaResultadoBusca(false)
        setBuscaNaoEncontrada(true)
      }
    }
    )
  }
  useEffect(() => {
    setArrayBusca(busca(localArray, resultadoBusca))
  }, [resultadoBusca])

  const [localArrayCobranca, setLocalArrayCobranca] = useState([])
  async function getCobrancas() {
    try {
      const responseClientes = await api.get('cobrancas',
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setLocalArrayCobranca([...responseClientes.data])
    } catch (error) {
      console.log(error)
    }
  }


  const handleChangeCobrancas = (event) => {
    setResultadoBuscaCobranca(event.target.value)
    setTabelaCompletaCobranca(false)
  };

  function buscaCobranca(localArray, resultadoBusca) {

    return localArray.filter(item => {
      const nome_cliente = item.nome_cliente.toLowerCase()
      setListaResultadoBusca(true)
      setBuscaNaoEncontradaCobranca(false)

      if (nome_cliente.includes(resultadoBusca)) {
        return (nome_cliente.includes(resultadoBusca))
      } else if (arrayBuscaCobranca.length === 0) {
        setListaResultadoBusca(false)
        setTabelaCompletaCobranca(false)
        setBuscaNaoEncontradaCobranca(true)
      }
    }
    )
  }
  useEffect(() => {
    setArrayBuscaCobranca(buscaCobranca(localArrayCobranca, resultadoBuscaCobranca))
  }, [resultadoBuscaCobranca])



  useEffect(() => {
    getCliente()
    getCobrancas()

  }, [])
  console.log(arrayBuscaCobranca)
  console.log(buscaNaoEncontradaCobranca)
  return (

    <div className='container-main'>
      <div className='nav'>
        <LeftMenu />
      </div>
      <div className='container-hero'>
        <div className='container-header'>
          <Header />
        </div>
        {containerHero &&
          <>
            {showModalEdite && <ModalEdite />}
            <div className='header-card'>
              <ResumeBill nomeDaClasse='container-card paid' logo={cobrancasPagas} status='paga' title='Cobraças Pagas' />
              <ResumeBill nomeDaClasse='container-card overdue' logo={cobrancasPrevistas} status='vencido' title='Cobraças Vencidas' />
              <ResumeBill nomeDaClasse='container-card future' logo={cobrancasVencidas} status='pendente' title='Cobraças Previstas' />
            </div>
            <div className='container-box'>
              <BoxCobranca title='Cobranças Vencidas' tipo='contador-vencidas' status='vencido' />
              <BoxCobranca title='Cobranças Previstas' tipo='contador-prevista' status='pendente' />
              <BoxCobranca title='Cobranças Pagas' tipo='contador-pagas' status='paga' />

            </div>
            <div className='contanier-box-end'>
              <BoxCliente title='Clientes Inadimplentes' tipo='contador-Inadimplentes' />
              <BoxCliente title='Clientes em dia' tipo='contador-paga' />
            </div>
          </>
        }
        {containerCliente &&
          <>
            <div className='container-filtro'>
              {showModalEdite && <ModalEdite />}
              {showModal && <ModalCliente />}
              {showModalCobranca && <ModalCadastroCobranca />}

              <img src={logocliente} alt='logo cliente' />
              <div className='filtro'>
                <button onClick={() => abrirModal()} className='adicionar-btn'>+ Adicionar cliente</button>
                <img src={btnfiltro} alt='btn de filtro' />
                <input className='search' type='text' placeholder='Pesquisar' value={resultadoBusca} onChange={handleChange} ></input>
              </div>
            </div>
            {tabelaCompleta && <TableCliente />}
            {listaResultadoDaBusca && <TableClienteBusca />}
            {buscaNaoEncontrada &&
              <div className='container-naoEncontrado'>
                <img src={naoencontrado} alt='não encontrado o cliente' />
                <strong>Nenhum resultado foi encontrado!</strong>
                <span>Verifique se escrita está correta</span>
              </div>}
            {alertaCliente &&
              <div className='alerta-cliente'>
                <div className='alerta-mensagem'>
                  <img src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Cadastro concluído com sucesso</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaCliente(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }
            {alertaCobranca &&
              <div className='alerta-cliente'>
                <div className='alerta-mensagem'>
                  <img src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Cobrança cadastrada com sucesso</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaCobranca(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }

          </>
        }
        {containerDetalhe &&
          <div className='detalhe'>
            {showModalEdite && <ModalEdite />}
            {showModalEditeCliente && <ModalEditeCliente />}
            {showModalCobranca && <ModalCadastroCobranca />}
            {showModalEditarCobranca && <ModalEditarCobranca />}
            {showModalDelite && <ModalDelite />}
            <DetalheCliente />
            <div className='cobrancas-cliente'>
              <div className='title-cobranca'>
                <h2>Cobranças do Cliente</h2>
                <button onClick={() => setShowModalCobranca(true)} className='btn-nova-cobranca'>+ Nova Cobrança</button>
              </div>
              <TableCobrancaCliente />

            </div>
            {alertaError &&
              <div className='alerta-delite'>
                <div className='alerta-mensagem-delite'>
                  <img className='icone-mensagem' src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Esta cobrança não pode ser excluída!</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaError(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }
            {alertaDeletar &&
              <div className='alerta-cliente'>
                <div className='alerta-mensagem'>
                  <img src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Cobrança excluída com sucesso!</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaDeletar(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }
            {alertaEditar &&
              <div className='alerta-cliente'>
                <div className='alerta-mensagem'>
                  <img src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Cobrança editada com sucesso!</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaEditar(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }
            {alertaEditarCliente &&
              <div className='alerta-cliente-Editar'>
                <div className='alerta-mensagem'>
                  <img src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Edições do cadastro concluídas com sucesso</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaEditarCliente(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }
          </div>
        }
        {containerCobranca &&
          <>
            <div className='container-filtro'>
              {showModal && <ModalCliente />}
              {showModalEdite && <ModalEdite />}
              {showModalEditarCobranca && <ModalEditarCobranca />}
              <img src={cobrancaLogo} alt='logo cobrança' />
              <div className='filtro'>
                <img src={btnfiltro} alt='btn de filtro' />
                <input className='search' type='text' placeholder='Pesquisar' value={resultadoBuscaCobranca} onChange={handleChangeCobrancas} ></input>
              </div>
            </div>
            <div className='table'>

              {tabelaCompletaCobranca && <TableCobranca />}
              {tableVencido && <TableCobrancaStatus />}
              {listaResultadoDaBusca && <TableCobrancaBusca />}
              {buscaNaoEncontradaCobranca &&
                <div className='container-naoEncontrado'>
                  <img src={naoencontrado} alt='não encontrado o cliente' />
                  <strong>Nenhum resultado foi encontrado!</strong>
                  <span>Verifique se escrita está correta</span>
                </div>}
            </div>
            {alertaCliente &&
              <div className='alerta-cliente'>
                <div className='alerta-mensagem'>
                  <img src={alertalogo} alt='logo de alerta com sucesso' />
                  <span>Cadastro concluído com sucesso</span>
                </div>
                <img className='closeAlerta' onClick={() => setAlertaCliente(false)} src={closealerta} alt='icone para fechar o alerta' />
              </div>
            }

          </>
        }
      </div>
    </div>
  );
}
