import './style.css';
import closeModal from '../../../assets/Icon.svg'
import logoCobrança from '../../../assets/cadastroCobranca.svg'
import { useHooke } from '../../../context/context';

export default function ModalDetalheCobranca() {
    const { setShowModalDetalheCobranca, value } = useHooke()
    return (
        <div className='container-modal'>
            <div className='modal-detalhe'>
                <img onClick={() => setShowModalDetalheCobranca(!value)} className='closeModal-Detalhe' src={closeModal} alt='botão para fechar o modal' />
                <div className='title-detalhe'>
                    <img src={logoCobrança} alt='logo cobrança' />
                    <h3>Detalhe da Cobrança</h3>
                </div>
                <div className='info-nome'>
                    <strong>Nome</strong>
                    <span>Sara Lage Silva</span>
                </div>
                <div className='info-descricao'>
                    <strong>Descrição</strong>
                    <span>Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                        Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                        Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum  </span>
                </div>
                <div className='vencimento-valor'>
                    <div className='info-vencimento'>
                        <strong>Vencimento</strong>
                        <span>10/08/2021</span>
                    </div>
                    <div className='info-valor'>
                        <strong>Valor</strong>
                        <span>R$ 300,00</span>
                    </div>
                </div>
                <div className='id-status'>
                    <div className='info-id'>
                        <strong>ID Cobrança</strong>
                        <span>75542623</span>
                    </div>
                    <div className='info-status'>
                        <strong>Status</strong>
                        <span className='statusPendente-detalhe'>Vencida</span>
                    </div>
                </div>
            </div>
        </div>
    )
}