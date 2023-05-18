import './style.css';
import FormModalEditarCliente from '../../Form/FormModalEditarCliente';
import { useHooke } from '../../../context/context';
import closemodal from '../../../assets/Icon.svg'
import logo from '../../../assets/Frame.svg'

export default function ModalCliente() {
  const { setShowModalEditeCliente } = useHooke()

  return (
    <div className='bg-modal'>
      <div className='modal-cliente'>
        <div className='modal-cliente-header' >
          <div className='logo-modal-cliente'>
            <img src={logo} alt='logo do cliente' />
            <h2>Editar Cliente</h2>
          </div>
          <img className='close-modal' onClick={() => setShowModalEditeCliente(false)} src={closemodal} alt='botão para fechar o modal' />
        </div>
        <FormModalEditarCliente />
      </div>
    </div>
  )
}