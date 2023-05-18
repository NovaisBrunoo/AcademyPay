import './style.css';
import FormCadastroCobranca from '../../Form/FormCadastroCobranca';
import { useHooke } from '../../../context/context';
import closemodal from '../../../assets/Icon.svg'
import cobranca from '../../../assets/cadastroCobranca.svg'

export default function ModalCadastroCobranca() {
  const { setShowModalCobranca } = useHooke()

  return (
    <div className='bg-modal'>
      <div className='modal-cliente'>
        <div className='modal-cliente-header' >
          <div className='logo-modal-cliente'>
            <img src={cobranca} alt='logo do cliente' />
            <h2>Cadastro de Cobrança</h2>
          </div>
          <img className='close-cadastro-cobrança' onClick={() => setShowModalCobranca(false)} src={closemodal} alt='botão para fechar o modal' />
        </div>
        <FormCadastroCobranca />
      </div>
    </div>
  )
}