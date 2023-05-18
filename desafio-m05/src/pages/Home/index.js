import { useState } from 'react';
import api from '../../api/api';
import VisibalyOff from '../../assets/VisibalyOff.svg';
import VisibalyOn from '../../assets/VisibalyOn.svg';
import barrasetone from '../../assets/barrasetone.svg';
import barrasetthree from '../../assets/barrasetthree.svg';
import barrasettwo from '../../assets/barrasettwo.svg';
import sucessoimg from '../../assets/sucesso.svg';
import BasicButton from '../../components/BasicButton';
import Etapas from '../../components/Etapas';
import { useHooke } from '../../context/context';
import './style.css';

import { Link } from 'react-router-dom';

function Home() {
  const { setActiveStep, handleNext, activeStep } = useHooke()
  const [errorForm, setErrorForm] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorNome, setErrorNome] = useState(false)
  const [nomeEmail, setNomeEmail] = useState(true)
  const [sucesso, setSucesso] = useState(false)
  const [confirmarSenha, setConfirmarSenha] = useState(false)
  const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fromCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })
  function clerForm() {
    setFormCadastro(
      {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      }
    )
  }
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  function handleClickShowConfirmar() {
    setShowPasswordConfirmar(!showPasswordConfirmar)
  }
  const handleReset = () => {
    setActiveStep(0);
    setNomeEmail(true)
    setSucesso(false)
  };

  async function handleformNome(event) {
    event.preventDefault()
    try {

      if (!fromCadastro.nome && !fromCadastro.email) {
        setErrorEmail(false)
        setErrorNome(false)
        setErrorForm(true)
        return
      }

      if (!fromCadastro.nome) {
        setErrorNome(true)
        setErrorForm(false)

      } else {
        setErrorNome(false)
      }

      if (!fromCadastro.email) {
        setErrorEmail(true)
        setErrorForm(false)

      } else {
        setErrorEmail(false)
      }
      const emailinvalido = fromCadastro.email.split('.')
      if (!emailinvalido[1]) {
        return setErrorEmail(true)
      }



      setFormCadastro({
        ...fromCadastro,
        nome: fromCadastro.nome,
        email: fromCadastro.email
      })
      setNomeEmail(false)
      setConfirmarSenha(true)
      handleNext()
    } catch (error) {
      console.log(error);
    }
  }
  async function handleformSenha(event) {
    event.preventDefault()
    try {
      if (!fromCadastro.senha || !fromCadastro.confirmarSenha) {
        return;
      }
      if (fromCadastro.senha !== fromCadastro.confirmarSenha) {
        return
      }
      await api.post('cadastro', {
        email: fromCadastro.email,
        nome: fromCadastro.nome,
        senha: fromCadastro.senha
      });
      setConfirmarSenha(false)
      setSucesso(true)
      clerForm()
      handleNext()
      setActiveStep(activeStep + 2);
    } catch (error) {
      console.log(error);
    }
  }



  function handleChangeForm(event) {
    setFormCadastro({ ...fromCadastro, [event.target.name]: event.target.value });
  }

  return (
    <div className="container-home">
      <div className='container-left'>
        <Etapas />
        <div>
        </div>
      </div>
      <div className='container-right'>
        {nomeEmail &&
          <>
            <form className='formCadastroHome' onSubmit={handleformNome}>
              <h3>Adicione seus dados</h3>
              <label htmlFor='nome'>Nome*</label>
              <input
                id={errorForm || errorNome ? 'error-input' : 'input-correto'}
                type='text'
                name='nome'
                placeholder='Digite seu nome'
                value={fromCadastro.nome}
                onChange={(event) => handleChangeForm(event)}
              />
              {errorForm && <span className='error-mensagem-cadastro'>Este campo deve ser preenchido</span>}
              {errorNome && <span className='error-mensagem-cadastro'>Preencha um nome valido</span>}
              <label htmlFor='email'>E-mail*</label>
              <input
                id={errorForm || errorEmail ? 'error-input' : 'input-correto'}
                type='text'
                name='email'
                placeholder='Digite seu e-mail'
                value={fromCadastro.email}
                onChange={(event) => handleChangeForm(event)}
              />
              {errorForm && <span className='error-mensagem-cadastro'>Este campo deve ser preenchido</span>}
              {errorEmail && <span className='error-mensagem-cadastro'>E-mail invalido</span>}

              <BasicButton title='Continuar' />
            </form>
            <span>Já possui uma conta? Faça seu <Link to='/'>Login</Link> </span>

            <div className='barra'>
              <img src={barrasetone} alt='barra de status inicio' />
            </div>
          </>
        }
        {confirmarSenha &&
          <>
            <form className='formCadastroHome' onSubmit={handleformSenha}>
              <h3>Escolha uma senha</h3>
              <label htmlFor='senha'>Senha*</label>
              <div className='senha'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='senha'
                  placeholder='Digite sua senha'
                  value={fromCadastro.senha}
                  onChange={(event) => handleChangeForm(event)}
                />
                <div className='icon-visibaly-senha' onClick={handleClickShowPassword}>
                  {showPassword ? <img src={VisibalyOn} alt='Visibaly On ' /> : <img src={VisibalyOff} alt='Visibaly Off' />}
                </div>
              </div>

              <label htmlFor='confirmarSenha'>Repita a senha*</label>
              <div className='confirmar'>
                <input
                  type={showPasswordConfirmar ? 'text' : 'password'}
                  name='confirmarSenha'
                  placeholder='Digite sua senha'
                  value={fromCadastro.confirmarSenha}
                  onChange={(event) => handleChangeForm(event)}
                />
                <div className='icon-visibaly' onClick={handleClickShowConfirmar}>
                  {showPasswordConfirmar ? <img src={VisibalyOn} alt='Visibaly On ' /> : <img src={VisibalyOff} alt='Visibaly Off' />}
                </div>
              </div>
              <BasicButton title='Continuar'> </BasicButton>
            </form>
            <span>Já possui uma conta? Faça seu <Link to='/'>Login</Link> </span>


            <div className='barra'>
              <img src={barrasettwo} alt='barra de status mid' />
            </div>
          </>
        }

        {sucesso &&
          <div className='container-sucesso'>
            <img src={sucessoimg} alt='Imagem de sucesso cadastro' />
            <Link to='/' onClick={handleReset}><BasicButton title='Ir para Login' /> </Link>


            <div className='barra-end'>
              <img src={barrasetthree} alt='barra de status end' />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
