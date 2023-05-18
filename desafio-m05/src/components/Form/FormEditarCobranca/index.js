import { useEffect, useState } from 'react';
import CurrencyInputField from 'react-currency-input-field';
import InputMask from 'react-input-mask';
import api from '../../../api/api';
import { useHooke } from '../../../context/context';
import { getItem } from '../../../utils/storage';
import './style.css';

export default function FormEditarCobranca() {
  const { setShowModal, setContainerModalCliente, setAlertaEditar, setShowModalEditarCobranca, idCobranca, setControl, value } = useHooke()
  const [errorNome, setErrorNome] = useState(false)
  const [paga, setPaga] = useState(false)
  const [pendente, setPendente] = useState(false)
  const [errorDescricao, setErrorDescricao] = useState(false)
  const [errorVencimento, setErrorVencimento] = useState(false)
  const [errorValor, setErrorValor] = useState(false)


  const [FormEditarCobranca, setFormEditarCobranca] = useState({
    nome: '',
    descricao: '',
    status: '',
    valor: '',
    vencimento: ''
  })

  function handleChangeForm(event) {
    setFormEditarCobranca({ ...FormEditarCobranca, [event.target.name]: event.target.value });
  }


  async function getClienteID() {
    try {
      const response = await api.get(`detalharcobranca/${idCobranca}`,
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        }
      )
      const valorEmCentavos = response.data.valor
      const valorEmReais = (valorEmCentavos / 100)
      const data = new Date(response.data.vencimento);
      const dataFormatada = data.toISOString().slice(0, 10);
      function handleStatus(status) {

        if (status === 'paga') {
          setPaga(true)
          setPendente(false)
          setFormEditarCobranca(
            {
              ...FormEditarCobranca,
              status: 'paga'

            })
        }
        if (status === 'pendente') {
          setPaga(false)
          setPendente(true)
          setFormEditarCobranca(
            {
              ...FormEditarCobranca,
              status: 'pendente'

            })
        }
        if (status === 'vencido') {
          setPaga(false)
          setPendente(true)
          setFormEditarCobranca(
            {
              ...FormEditarCobranca,
              status: 'vencido'

            })
        }
      }
      setFormEditarCobranca({
        ...FormEditarCobranca,
        nome: response.data.nome_cliente,
        descricao: response.data.descricao,
        status: handleStatus(response.data.status),
        valor: valorEmReais,
        vencimento: dataFormatada
      })

    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    getClienteID()
  }, [])

  async function handleCliente(e) {
    e.preventDefault();
    try {

      if (!FormEditarCobranca.descricao) {
        setErrorDescricao(true)
      } else {
        setErrorDescricao(false)
      }
      if (!FormEditarCobranca.vencimento) {
        setErrorVencimento(true)
      } else {
        setErrorVencimento(false)
      }
      if (!FormEditarCobranca.valor) {
        setErrorValor(true)
      } else {
        setErrorValor(false)
      }

      if (!FormEditarCobranca) {
        return
      }
      const valorEmReal = FormEditarCobranca.valor
      const numeroInteiro = Math.floor(valorEmReal * 100);
      const response = await api.put(`atualizarcobranca/${idCobranca}`,
        {
          nome_cliente: FormEditarCobranca.nome,
          descricao: FormEditarCobranca.descricao,
          vencimento: FormEditarCobranca.vencimento,
          valor: numeroInteiro,
          status: FormEditarCobranca.status
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setShowModal(false)
      setShowModalEditarCobranca(false)
      setContainerModalCliente(false)
      setControl(true)
      setAlertaEditar(true)
    } catch (error) {
      console.log(error);
    }
  }

  function handleMudarStatus() {
    setPaga(true)
    setPendente(false)

  }
  function handleMudarStatusoff() {
    setPaga(false)
    setPendente(true)
  }
  return (
    <form className='form-modal-cadastro-cobranca' onSubmit={handleCliente}>
      <label htmlFor='nome'>Nome*</label>
      <input
        id={errorNome ? 'error-input' : 'input-correto'}
        type='text'
        name='nome'
        value={FormEditarCobranca.nome}
        placeholder='Digite seu nome'
        onChange={(e) => handleChangeForm(e)}
      />

      <label htmlFor='descricao'>Descrição*</label>
      <textarea
        className='input-descricao'
        id={errorDescricao ? 'error-input' : 'input-correto'}
        type='text'
        name='descricao'
        placeholder='Digite seu Descrição'
        onChange={(e) => handleChangeForm(e)}
        value={FormEditarCobranca.descricao}
      />

      {errorDescricao && <span className='error-mensagem-descricao'>Este campo deve ser preenchido</span>}

      <div className='container-venc-valor'>
        <div className='input-venc-valor'>
          <label htmlFor='vencimento'>Vencimento*</label>
          <InputMask
            id={errorVencimento ? 'error-input' : 'input-correto'}
            type='date'
            name='vencimento'
            placeholder='Digite seu Vencimento'
            onChange={(e) => handleChangeForm(e)}
            value={FormEditarCobranca.vencimento}

          />
          {errorVencimento && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}
        </div>

        <div className='input-venc-valor'>
          <label htmlFor='valor'>Valor*</label>
          <CurrencyInputField
            id={errorValor ? 'error-input' : 'input-correto'}
            type='text'
            name='valor'
            placeholder='Digite seu Valor'
            onChange={(e) => handleChangeForm(e)}
            prefix="R$ "
            decimalSeparator=","
            groupSeparator="."
            disableGroupSeparators={false}
            value={FormEditarCobranca.valor}

          />
          {errorValor && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}
        </div>
      </div>

      <div className='form-modal-cadastro-cliente check'>
        <label htmlFor='status' >Status*</label>
        <div onClick={() => handleMudarStatus()} className='input-radio'>
          <input type="radio" id="huey" name="status" value='paga' className={`radio ${paga ? 'checado' : 'naoChecado'}`} onChange={(e) => handleChangeForm(e)} />
          <label htmlFor="huey" className='labelPaga'>Cobrança Paga</label>
        </div>
        <div onClick={() => handleMudarStatusoff()} className='input-radio'>
          <input type="radio" id="dewey" name="status" value='pendente' className={`radio ${pendente ? 'checado' : 'naoChecado'}`} onChange={(e) => handleChangeForm(e)} />
          <label htmlFor="dewey" >Cobrança Pendente</label>
        </div>
      </div>

      <div className='btn-cliente'>
        <button onClick={() => setShowModalEditarCobranca(false)} className='btn-cancel'>Cancelar</button>
        <button className='btn-aplicar'>Aplicar</button>
      </div>
    </form>

  )
}