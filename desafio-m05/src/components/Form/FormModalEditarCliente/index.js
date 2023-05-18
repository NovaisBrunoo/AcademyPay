import { useEffect, useState } from 'react';
import { useHooke } from '../../../context/context';
import './style.css';
import api from '../../../api/api';
import { getItem } from '../../../utils/storage';
import InputMask from 'react-input-mask';


export default function FormModalEditarCliente() {
  const { setShowModalEditeCliente, setShowModal, setContainerModalCliente, setAlertaEditarCliente, idCliente } = useHooke()
  const [errorNome, setErrorNome] = useState(false)
  const [errorCpf, setErrorCpf] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorTel, setErrorTel] = useState(false)
  const [control, setControl] = useState('controle')
  const [mensagemErrorCpf, setMensagemErrorCpf] = useState('')
  const [mensagemErrorEmail, setMensagemErrorEmail] = useState('')
  const [formCliente, setFormCliente] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  })
  function handleChangeForm(event) {
    setFormCliente({ ...formCliente, [event.target.name]: event.target.value });
  }

  async function getClienteID() {
    try {
      const response = await api.get(`cliente/${idCliente}`,
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        }
      )
      setFormCliente(
        {
          ...formCliente,
          nome: response.data.nome,
          cpf: response.data.cpf,
          email: response.data.email,
          telefone: response.data.telefone,
          cep: response.data.cep,
          endereco: response.data.logradouro,
          complemento: response.data.complemento,
          bairro: response.data.bairro,
          cidade: response.data.cidade,
          uf: response.data.estado
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (control === 'controle') {
      getClienteID()
      setControl('banana')
    }

    if (control === 'banana') {
      setTimeout(() => {
        getClienteID()

      }, 10000);
    }
  }, [control])

  async function handleCliente(e) {
    e.preventDefault();
    try {
      if (!formCliente.nome) {
        setErrorNome(true)
      } else {
        setErrorNome(false)
      }
      if (!formCliente.telefone) {
        setErrorTel(true)
      } else {
        setErrorTel(false)
      }
      if (!formCliente.email) {
        setErrorEmail(true)
      } else {
        setErrorEmail(false)
      }
      if (!formCliente.cpf) {
        setErrorCpf(true)
      } else {
        setErrorCpf(false)
      }
      let idString = idCliente.toString()
      await api.put('atualizarcliente',
        {
          id_cliente: idString,
          nome: formCliente.nome,
          cpf: formCliente.cpf,
          email: formCliente.email,
          telefone: formCliente.telefone,
          cep: formCliente.cep,
          logradouro: formCliente.endereco,
          complemento: formCliente.complemento,
          bairro: formCliente.bairro,
          cidade: formCliente.cidade,
          estado: formCliente.uf
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setShowModalEditeCliente(false)
      setShowModal(false)
      setContainerModalCliente(false)
      setAlertaEditarCliente(true)
    } catch (error) {
      console.log(error);
      setMensagemErrorCpf(error.response.data === 'O cpf ja esta sendo utilizado')
      setMensagemErrorEmail(error.response.data === 'O email ja esta sendo utilizado')
    }
  }

  return (
    <form className='form-modal-cadastro-cliente' onSubmit={handleCliente}>
      <label htmlFor='nome'>Nome*</label>
      <input
        id={errorNome ? 'error-input' : 'input-correto'}
        type='text'
        name='nome'
        placeholder='Digite seu nome'
        onChange={(e) => handleChangeForm(e)}
        value={formCliente.nome}
      />
      {errorNome && <span className='error-mensagem'> Este campo deve ser preenchido</span>}
      <label htmlFor='email'>E-mail*</label>
      <input
        id={errorEmail || mensagemErrorEmail ? 'error-input' : 'input-correto'}
        type='text'
        name='email'
        placeholder='Digite seu E-mail'
        onChange={(e) => handleChangeForm(e)}
        value={formCliente.email}
      />
      {errorEmail && <span className='error-mensagem'>Este campo deve ser preenchido</span>}
      {mensagemErrorEmail && <span className='error-mensagem'>O email ja esta sendo utilizado</span>}
      <div className='container-cpf-tel-cliente'>
        <div className='input-cpf-cliente'>
          <label htmlFor='cpf'>CPF*</label>
          <InputMask
            id={errorCpf || mensagemErrorCpf ? 'error-input' : 'input-correto'}
            type='text'
            name='cpf'
            placeholder='Digite seu CPF'
            onChange={(e) => handleChangeForm(e)}
            mask="999.999.999-99"
            value={formCliente.cpf}
          />
          {errorCpf && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}
          {mensagemErrorCpf && <span className='error-mensagem'>O cpf esta sendo utilizado</span>}

        </div>
        <div className='input-cpf-cliente'>
          <label htmlFor='telefone'>Telefone*</label>
          <InputMask
            id={errorTel ? 'error-input' : 'input-correto'}
            type='text'
            name='telefone'
            placeholder='Digite seu telefone'
            onChange={(e) => handleChangeForm(e)}
            mask="(99)9999-9999"
            value={formCliente.telefone}
          />
          {errorTel && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}

        </div>
      </div>
      <label htmlFor='endereco'>Endereço</label>
      <input
        type='text'
        name='endereco'
        placeholder='Digite seu endereço'
        onChange={(e) => handleChangeForm(e)}
        value={formCliente.endereco}
      />
      <label htmlFor='complemento'>Complemento</label>
      <input
        type='text'
        name='complemento'
        placeholder='Digite seu complemento'
        onChange={(e) => handleChangeForm(e)}
        value={formCliente.complemento}
      />
      <div className='container-cep-bairro'>
        <div className='input-cep'>
          <label htmlFor='cep'>CEP</label>
          <input
            type='text'
            name='cep'
            placeholder='Digite seu CEP'
            onChange={(e) => handleChangeForm(e)}
            value={formCliente.cep}
          />
        </div>
        <div className='input-cep'>
          <label htmlFor='bairro'>Bairro</label>
          <input
            type='text'
            name='bairro'
            placeholder='Digite seu bairro'
            onChange={(e) => handleChangeForm(e)}
            value={formCliente.bairro}
          />
        </div>
      </div>
      <div className='container-cidade-uf'>
        <div className='input-cidade'>
          <label htmlFor='cidade'>Cidade</label>
          <input
            type='text'
            name='cidade'
            placeholder='Digite seu cidade'
            onChange={(e) => handleChangeForm(e)}
            value={formCliente.cidade}
          />
        </div>
        <div className='input-uf'>
          <label htmlFor='uf'>UF</label>
          <input
            type='text'
            name='uf'
            placeholder='Digite seu estado'
            onChange={(e) => handleChangeForm(e)}
            value={formCliente.uf}
          />
        </div>
      </div>
      <div className='btn-cliente'>
        <button onClick={() => setShowModalEditeCliente(false)} className='btn-cancel'>Cancelar</button>
        <button className='btn-aplicar'>Aplicar</button>

      </div>
    </form>

  )
}