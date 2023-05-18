import headerEditar from '../../assets/headerEditar.svg';
import { getItem } from '../../utils/storage';
import './styles.css';
import { useHooke } from '../../context/context';
import ModalLogOut from '../Modal/ModalLogOut';

function Header({ handleEditProfile }) {
  const { titleHeader, showModalHeader, setShowModalHeader } = useHooke()
  const userName = getItem('userName');
  const nomeSobreNome = userName.split(' ')
  const primeiraLetras = nomeSobreNome[0][0].toUpperCase()

  function openmodal() {
    setShowModalHeader(!showModalHeader)
  }

  return (
    <div className='headerMenu'>
      <div className='header-title'>
        {titleHeader === '1' ? <h1>Resumo das cobranças</h1> : ''}
        {titleHeader === '2' ? <strong>Clientes</strong> : ''}
        {titleHeader === '3' ? <strong>Cobranças</strong> : ''}
        {titleHeader === '4' ? <div><span>Clientes </span><span>{'>'}</span><span>Detalhes do cliente</span></div> : ''}
      </div>
      <div className='container-sign-out'>
        <div
          className='profile-area'
          onClick={handleEditProfile}
        >
          <div className="headerAtualizar">

            <div className="circulo">
              {primeiraLetras}
            </div>

            <strong>{userName}</strong>
          </div>
          <div className="img"
          >
            <img
              src={headerEditar}
              alt="logout"
              className='sign-out'
              onClick={() => openmodal()}
            />
          </div>
          {showModalHeader && <ModalLogOut />}
        </div>
      </div>
    </div>
  )
}

export default Header;