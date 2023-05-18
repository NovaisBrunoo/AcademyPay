import { useState } from 'react';
import InputMask from 'react-input-mask';
import api from '../../../api/api';
import { useHooke } from '../../../context/context';
import { getItem } from '../../../utils/storage';
import './style.css';


export default function FormCliente() {
  const { abrirModal, setShowModal, setContainerModalCliente, setAlertaCliente, setControl, value, control } = useHooke()
  const [errorNome, setErrorNome] = useState(false)
  const [errorCpf, setErrorCpf] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorTel, setErrorTel] = useState(false)
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
    uf: '',
  })
  function handleChangeForm(event) {
    setFormCliente({ ...formCliente, [event.target.name]: event.target.value });
  }
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
        setErrorTel(true)
      } else {
        setErrorTel(false)
      }

      await api.post('CadastroCliente',
        {
          nome: formCliente.nome,
          cpf: formCliente.cpf,
          email: formCliente.email,
          telefone: formCliente.telefone,
          cep: formCliente.cep,
          logradouro: formCliente.endereco,
          complemento: formCliente.complemento,
          bairro: formCliente.bairro,
          cidade: formCliente.cidade,
          estado: formCliente.uf,
          status: "Em dia"
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })

      setShowModal(false)
      setContainerModalCliente(false)
      setAlertaCliente(true)
      setControl(value)
    } catch (error) {
      console.log(error);
      setErrorCpf(error.response.data === 'O cpf ja esta sendo utilizado')
      setMensagemErrorCpf(error.response.data)
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

      />
      {errorNome && <span className='error-mensagem'> Este campo deve ser preenchido</span>}
      <label htmlFor='email'>E-mail*</label>
      <input
        id={errorEmail || mensagemErrorEmail ? 'error-input' : 'input-correto'}
        type='text'
        name='email'
        placeholder='Digite seu E-mail'
        onChange={(e) => handleChangeForm(e)}

      />
      {errorEmail && <span className='error-mensagem'>Este campo deve ser preenchido</span>}
      {mensagemErrorEmail && <span className='error-mensagem'>O email ja esta sendo utilizado</span>}
      <div className='container-cpf-tel-cliente'>
        <div className='input-cpf-cliente'>
          <label htmlFor='cpf'>CPF*</label>
          <InputMask
            id={errorCpf || errorTel ? 'error-input' : 'input-correto'}
            type='text'
            name='cpf'
            placeholder='Digite seu CPF'
            onChange={(e) => handleChangeForm(e)}
            mask="999.999.999-99"
          />
          {errorCpf && <span className='error-mensagem-cpf-tel'>{mensagemErrorCpf}</span>}
          {errorTel && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}

        </div>
        <div className='input-cpf-cliente'>
          <label htmlFor='telefone'>Telefone*</label>
          <InputMask
            id={errorTel ? 'error-input' : 'input-correto'}
            type='text'
            name='telefone'
            placeholder='Digite seu telefone'
            onChange={(e) => handleChangeForm(e)}
            mask="(99)9999-99999"
          />
          {errorTel && <span className='error-mensagem-cpf-tel'>Este campo deve ser preenchido</span>}

        </div>
      </div>
      <label htmlFor='endereco'>Endereço</label>
      <input
        type='text'
        name='endereco'
        placeholder='Digite seu E-mail'
        onChange={(e) => handleChangeForm(e)}
      />
      <label htmlFor='complemento'>Complemento</label>
      <input
        type='text'
        name='complemento'
        placeholder='Digite seu E-mail'
        onChange={(e) => handleChangeForm(e)}
      />
      <div className='container-cep-bairro'>
        <div className='input-cep'>
          <label htmlFor='cep'>CEP</label>
          <InputMask
            type='text'
            name='cep'
            placeholder='Digite seu E-mail'
            onChange={(e) => handleChangeForm(e)}
            mask='99999-999'
          />
        </div>
        <div className='input-cep'>
          <label htmlFor='bairro'>Bairro</label>
          <input
            type='text'
            name='bairro'
            placeholder='Digite seu E-mail'
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
      </div>
      <div className='container-cidade-uf'>
        <div className='input-cidade'>
          <label htmlFor='cidade'>Cidade</label>
          <input
            type='text'
            name='cidade'
            placeholder='Digite seu E-mail'
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className='input-uf'>
          <label htmlFor='uf'>UF</label>
          <input
            type='text'
            name='uf'
            placeholder='Digite seu E-mail'
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
      </div>
      <div className='btn-cliente'>
        <button onClick={() => abrirModal()} className='btn-cancel'>Cancelar</button>
        <button className='btn-aplicar'>Aplicar</button>

      </div>
    </form>

  )
}