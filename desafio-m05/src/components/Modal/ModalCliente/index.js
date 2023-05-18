import './style.css';
import FormCliente from '../../Form/FormCliente';
import { useHooke } from '../../../context/context';
import closemodal from '../../../assets/Icon.svg'
import logo from '../../../assets/Frame.svg'

export default function ModalCliente() {
  const { setShowModal } = useHooke()

  return (
    <div className='bg-modal'>
      <div className='modal-cliente'>
        <div className='modal-cliente-header' >
          <div className='logo-modal-cliente'>
            <img src={logo} alt='logo do cliente' />
            <h2>Cadastro do Cliente</h2>
          </div>
          <img className='close-cliente' onClick={() => setShowModal(false)} src={closemodal} alt='botão para fechar o modal' />
        </div>
        <FormCliente />
      </div>
    </div>
  )
}