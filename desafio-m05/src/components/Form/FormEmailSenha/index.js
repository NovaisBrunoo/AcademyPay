import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { setItem } from '../../../utils/storage';
import './styles.css';
import BasicButton from '../../BasicButton';


function FormEmailSenha() {
  const navigate = useNavigate();
  const [mensagenError, setMensagenError] = useState('');
  const [formCorpo, setFormCorpo] = useState({
    email: '',
    senha: ''
  })

  function handleChangeForm(event) {
    setFormCorpo({ ...formCorpo, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!formCorpo.email || !formCorpo.senha) {
        setMensagenError('E-mail e Senha obrigatórios');
        return
      }
      const response = await api.post('/login', {
        email: formCorpo.email,
        senha: formCorpo.senha
      });
      navigate('/Main');
      setItem('userName', response.data.users.nome)
      setItem('token', response.data.token)


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="formCorpo" onSubmit={handleSubmit}>
      <h2 className="formTitulo"> Faça seu login!</h2>
      <label htmlFor='email'>E-mail</label>
      <input
        type="text"
        name='email'
        placeholder='Digite seu e-mail'
        value={formCorpo.email}
        onChange={(e) => handleChangeForm(e)}
      />
      <div className='container-input-senha'>
        <strong onClick={() => navigate('/')}>Esqueceu sua Senha?</strong>
        <label htmlFor='senha'>Senha</label>
        <input
          type="password"
          name='senha'
          placeholder='Digite sua senha'
          value={formCorpo.senha}
          onChange={(e) => handleChangeForm(e)}
        />
      </div>
      <BasicButton title='Entrar' />

      <div className="textoCadastre">
        <span>Ainda não possui uma conta? <strong onClick={() => navigate('/Home')} className="link"> Cadastre-se</strong> </span>
      </div>
      {mensagenError &&
        <span className="erro">{mensagenError}</span>
      }
    </form >
  )
}

export default FormEmailSenha;
