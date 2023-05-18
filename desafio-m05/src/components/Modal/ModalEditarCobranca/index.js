import './style.css';
import FormEditarCobranca from '../../Form/FormEditarCobranca';
import { useHooke } from '../../../context/context';
import closemodal from '../../../assets/Icon.svg'
import cobranca from '../../../assets/cadastroCobranca.svg'

export default function ModalEditarCobranca() {
    const { setShowModalEditarCobranca } = useHooke()

    return (
        <div className='bg-modal'>
            <div className='modal-cliente'>
                <div className='modal-cliente-header' >
                    <div className='logo-modal-cliente'>
                        <img src={cobranca} alt='logo do cliente' />
                        <h2>Edição de cobrança</h2>
                    </div>
                    <img className='close-cadastro-cobrança' onClick={() => setShowModalEditarCobranca(false)} src={closemodal} alt='botão para fechar o modal' />
                </div>
                <FormEditarCobranca />
            </div>
        </div>
    )
}