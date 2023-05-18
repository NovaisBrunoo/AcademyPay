import './style.css';
import VisibalyOff from '../../../assets/VisibalyOff.svg';
import VisibalyOn from '../../../assets/VisibalyOn.svg';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { getItem, setItem } from '../../../utils/storage';
import BasicButton from '../../BasicButton';
import { useHooke } from '../../../context/context';
import InputMask from 'react-input-mask';

export default function FormModal() {
  const { setAlerta, setContainerModal, setShowModalEdite } = useHooke()
  const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);
  const [errorSenha, setErrorSenha] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const mensagemErrorSenha = 'As senhas não coincidem'
  const mensagemErrorEmail = 'E-mail já cadastrado'
  const [showPassword, setShowPassword] = useState(false);
  const [formCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    novaSenha: '',
    confirmarSenha: '',
    id: '',
    senha: ''
  })
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  function handleClickShowConfirmar() {
    setShowPasswordConfirmar(!showPasswordConfirmar)
  }
  async function getusuario() {
    const res = await api.get('usuario',
      {
        headers: {
          Authorization: `Bearer ${getItem('token')}`
        }
      }
    )

    setFormCadastro({
      ...formCadastro,
      id: formCadastro.id,
      nome: res.data.nome,
      email: res.data.email,
      cpf: res.data.cpf === null ? '' : res.data.cpf,
      telefone: res.data.telefone === null ? '' : res.data.telefone,
      senha: res.data.senha
    })
  }
  useEffect(() => {
    getusuario()
  }, [])
  function handleChangeForm(event) {
    setFormCadastro({ ...formCadastro, [event.target.name]: event.target.value });
  }

  function myStopFunction() {
    setShowModalEdite(false)
    setContainerModal(true);
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formCadastro.novaSenha !== formCadastro.confirmarSenha) {
        setErrorSenha(true)
        return
      }
      await api.put('atualizarusuario',
        {
          nome: formCadastro.nome,
          email: formCadastro.email,
          cpf: formCadastro.cpf === ' ' ? null : formCadastro.cpf,
          telefone: formCadastro.telefone,
          senha: formCadastro.novaSenha === '' ? '' : formCadastro.novaSenha
        },
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })

      setAlerta(true)
      setItem('userName', formCadastro.nome)
      setContainerModal(false)
      setTimeout(() => { setAlerta(false) }, 1000)
      setTimeout(myStopFunction, 1100)
    } catch (error) {
      console.log(error.response)
      setErrorEmail(error.response.data.mensagem === 'O campo email é obrigatório')

    }
  }

  return (
    <form className='formCadastro' key={formCadastro.id} onSubmit={handleSubmit}>
      <label htmlFor='nome'>Nome*</label>
      <input
        type='text'
        name='nome'
        placeholder='Digite seu nome'
        value={formCadastro.nome}
        onChange={(e) => handleChangeForm(e)}

      />
      <label htmlFor='email'>E-mail*</label>
      <input
        id={errorEmail ? 'error-input' : 'input-correto'}
        type='text'
        name='email'
        placeholder='Digite seu E-mail'
        value={formCadastro.email}
        onChange={(e) => handleChangeForm(e)}
      />
      {errorEmail && <span className='error-mensagem'>{mensagemErrorEmail}</span>}
      <div className='container-cpf-tel'>
        <div className='input-cpf'>
          <label htmlFor='cpf'>CPF</label>
          <InputMask
            type='text'
            name='cpf'
            placeholder='Digite seu CPF'
            value={formCadastro.cpf}
            mask="999.999.999-99"
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className='input-cpf'>
          <label htmlFor='telefone'>Telefone</label>
          <InputMask
            type='text'
            name='telefone'
            placeholder='Digite seu telefone'
            value={formCadastro.telefone}
            mask="(99)9999-9999"
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
      </div>
      <label htmlFor='novaSenha'>Nova Senha*</label>
      <div className='senha'>
        <input
          type={showPassword ? 'text' : 'password'}
          name='novaSenha'
          placeholder='Digite sua senha'
          value={formCadastro.novaSenha}
          onChange={(e) => handleChangeForm(e)}
        />
        <div className='icon-visibaly-senha' onClick={handleClickShowPassword}>
          {showPassword ? <img src={VisibalyOn} alt='Visibaly On ' /> : <img src={VisibalyOff} alt='Visibaly Off' />}
        </div>
      </div>
      <label htmlFor='confirmarSenha'>Repita a senha*</label>
      <div className='confirmar'>
        <input
          id={errorSenha ? 'error-input' : 'input-correto'}
          type={showPasswordConfirmar ? 'text' : 'password'}
          name='confirmarSenha'
          placeholder='Digite sua senha'
          value={formCadastro.confirmarSenha}
          onChange={(e) => handleChangeForm(e)}
        />
        {errorSenha && <span className='error-mensagem'>{mensagemErrorSenha}</span>}
        <div className='icon-visibaly' onClick={handleClickShowConfirmar}>
          {showPasswordConfirmar ? <img src={VisibalyOn} alt='Visibaly On ' /> : <img src={VisibalyOff} alt='Visibaly Off' />}
        </div>
      </div>

      <BasicButton title='Aplicar' />
    </form>
  )
}