import './style.css';
import FormModal from '../../Form/FormModal';
import closemodal from '../../../assets/Icon.svg'
import { useHooke } from '../../../context/context';
import cadastrosucesso from '../../../assets/cadastrosucesso.svg'

export default function ModalEdite() {
  const { setShowModalEdite, alerta, conteinerModal } = useHooke();

  return (
    <div className='bg-modal'>
      {conteinerModal &&
        <div className='modal'>
          <div className='titleModal'>
            <h2>Edite seu cadastro</h2>
            <img className='close-modal-edite' onClick={() => setShowModalEdite(false)} src={closemodal} alt='botão para fechar o modal' />
          </div>
          <FormModal />
        </div>
      }
      {alerta && <img src={cadastrosucesso} alt='cadastro feito com sucesso' />}

    </div>
  )
}