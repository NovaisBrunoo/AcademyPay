import './styles.css';
import btnEditUser from '../../../assets/btnEditUser.svg';
import btnLogOut from '../../../assets/btnLogOut.svg';
import { useHooke } from '../../../context/context';
import { clear } from '../../../utils/storage';
import { useNavigate } from 'react-router-dom';

export default function ModalLogOut() {
  const navigate = useNavigate()
  const { setShowModalEdite, showModalEdite, showModalHeader, setShowModalHeader, setContainerCliente, containerCliente, setContainerCobranca, containerCobranca, setContainerHero, setTitleHeader } = useHooke()
  function handleLogout() {
    clear()
    setTitleHeader('1')
    setShowModalHeader(!showModalHeader)
    setContainerHero(true)
    setContainerCobranca(!containerCobranca)
    setContainerCliente(!containerCliente)
    navigate('/')
  }
  function abrirModalEdite() {
    setShowModalEdite(!showModalEdite)
    setShowModalHeader(!showModalHeader)
  }
  return (
    <>
      <div className='modal-area'>
        <div className='triangulo'>
        </div>
        <div className='modal-btn'>
          <button>
            <img
              onClick={() => abrirModalEdite()}
              src={btnEditUser}
              alt='icone editar usuario' />
          </button>
          <button>
            <img
              onClick={() => handleLogout()}
              src={btnLogOut}
              alt='icone sair' />
          </button>
        </div>

      </div>
    </>
  );
}