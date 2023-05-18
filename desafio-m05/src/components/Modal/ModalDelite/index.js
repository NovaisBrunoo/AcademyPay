import './style.css';
import alertaDelite from '../../../assets/Delite.svg'
import closemodal from '../../../assets/Icon.svg'
import { useHooke } from '../../../context/context'
import api from '../../../api/api';
import { getItem } from '../../../utils/storage';

export default function ModalDelite() {
  const { setShowModalDelite, value, idCobranca, setAlertaError, setAlertaDeletar, setControl, alertaError, showModalDelite } = useHooke()

  if (alertaError) {
    setAlertaError(value)
    setShowModalDelite(false)
  }
  async function handleDelite() {
    try {
      await api.delete(`deletar/${idCobranca}`,
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setShowModalDelite(!value)
      setControl(value)
      setAlertaDeletar(value)
    } catch (error) {
      console.log(error.response.data.message)
      setAlertaError(error.response.data.message === 'A cobrança não pode ser excluida porque ja foi paga')
      setAlertaError(error.response.data.message === 'A cobrança não pode ser excluida porque está vencida')
    }
  }

  return (
    <div className='container-modal-delite'>
      <div className='modal-delite'>
        <img className='close-modal-delite' onClick={() => setShowModalDelite(!value)} src={closemodal} alt='' />
        <img src={alertaDelite} alt='imagem de alerta para deletar' />
        <strong className='alerta-mensagem-modal'>Tem certeza que deseja excluir esta cobrança?</strong>
        <div className='btn-delite'>
          <button onClick={() => setShowModalDelite(!value)} className='btn-nao'>Não</button>
          <button onClick={() => handleDelite()} className='btn-sim'>Sim</button>
        </div>
      </div>
    </div>
  )
}