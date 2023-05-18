import { useEffect, useState } from 'react';
import CurrencyInputField from 'react-currency-input-field';
import InputMask from 'react-input-mask';
import api from '../../../api/api';
import { useHooke } from '../../../context/context';
import { getItem } from '../../../utils/storage';
import './style.css';

export default function FormCadastroCobranca() {
  const { setShowModal, setContainerModalCliente, setAlertaCobranca, setShowModalCobranca, idCliente, setControl, value } = useHooke()
  const [errorNome, setErrorNome] = useState(false)
  const [paga, setPaga] = useState(false)
  const [pendente, setPendente] = useState(false)
  const [errorDescricao, setErrorDescricao] = useState(false)
  const [errorVencimento, setErrorVencimento] = useState(false)
  const [errorValor, setErrorValor] = useState(false)
  const [FormCadastroCobranca, setFormCadastroCobranca] = useState({
    nome: '',
    descricao: '',
    vencimento: '',
    valor: '',
    status: 'pendente',
  })
    (idCliente)
  function handleChangeForm(event) {
    setFormCadastroCobranca({ ...FormCadastroCobranca, [event.target.name]: event.target.value });
  }


  const [localCliente, setLocalCliente] = useState()
  async function getClienteID() {
    try {
      const response = await api.get(`cliente/${idCliente}`,
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        }
      )
      setLocalCliente(response.data.nome)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClienteID()
    setFormCadastroCobranca(
      {
        ...FormCadastroCobranca,
        nome: localCliente
      })
  }, [])


  async function handleCliente(e) {
    e.preventDefault();
    try {

      if (!FormCadastroCobranca.descricao) {
        setErrorDescricao(true)
      } else {
        setErrorDescricao(false)
      }
      if (!FormCadastroCobranca.vencimento) {
        setErrorVencimento(true)
      } else {
        setErrorVencimento(false)
      }
      if (!FormCadastroCobranca.valor) {
        setErrorValor(true)
      } else {
        setErrorValor(false)
      }

      if (!FormCadastroCobranca) {
        return
      }

      const valor = FormCadastroCobranca.valor.split(' ')
      const teste = valor[1]
      let valorReal = parseFloat(teste.replace(',', '').replace('.', ''))
        (valorReal)
      const dateNormal = FormCadastroCobranca.vencimento
      const dataTime = new Date(dateNormal)
      await api.post(`cadastroCobranca/${idCliente}`,
        {
          nome_cliente: localCliente,
          descricao: FormCadastroCobranca.descricao,
          vencimento: dataTime,
          valor: valorReal,
          status: FormCadastroCobranca.status
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setShowModal(false)
      setShowModalCobranca(false)
      setContainerModalCliente(false)
      setAlertaCobranca(true)
      setControl(value)
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
        value={localCliente}
        placeholder='Digite seu nome'
        onChange={(e) => handleChangeForm(e)}
        disabled
      />

      <label htmlFor='descricao'>Descrição*</label>
      <textarea
        className='input-descricao'
        id={errorDescricao ? 'error-input' : 'input-correto'}
        type='text'
        name='descricao'
        placeholder='Digite seu Descrição'
        onChange={(e) => handleChangeForm(e)}
        value={FormCadastroCobranca.descricao}
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
            value={FormCadastroCobranca.vencimento}

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

          />
          {errorValor && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}
        </div>
      </div>

      <div className='form-modal-cadastro-cliente check'>
        <label htmlFor='status' >Status*</label>
        <div onClick={() => handleMudarStatus()} className='input-radio'>
          <input type="radio" id="huey" name="status" checked={paga} value='paga' className={`radio ${paga ? 'checado' : 'naoChecado'}`} onChange={(e) => handleChangeForm(e)} />
          <label htmlFor="huey" className='labelPaga'>Cobrança Paga</label>
        </div>
        <div onClick={() => handleMudarStatusoff()} className='input-radio'>
          <input type="radio" id="dewey" name="status" checked={pendente} value='pendente' className={`radio ${pendente ? 'checado' : 'naoChecado'}`} onChange={(e) => handleChangeForm(e)} />
          <label htmlFor="dewey" >Cobrança Pendente</label>
        </div>
      </div>

      <div className='btn-cliente'>
        <button onClick={() => setShowModalCobranca(false)} className='btn-cancel'>Cancelar</button>
        <button className='btn-aplicar'>Aplicar</button>
      </div>
    </form>

  )
}