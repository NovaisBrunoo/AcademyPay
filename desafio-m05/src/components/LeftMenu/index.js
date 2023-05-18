import { useEffect } from 'react';
import clienteIcon from '../../assets/cliente.svg';
import clienteSelect from '../../assets/clienteSelect.svg';
import cobrancaNav from '../../assets/cobrancaNav.svg';
import cobrancaSelecionada from '../../assets/cobrancaSelecionada.svg';
import homeIcon from '../../assets/home.svg';
import homeSelect from '../../assets/homeSelect.svg';
import { useHooke } from '../../context/context';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';


function LeftMenu() {
  const { setTitleHeader, setContainerHero, setContainerCliente, setContainerCobranca, setContainerDetalhe, value, risco, setRisco, setTableVencido, setBuscaNaoEncontrada, setBuscaNaoEncontradaCobranca } = useHooke()


  function home() {
    setRisco('selectHome')
    setTitleHeader('1')
    setContainerHero(value)
    setContainerCliente(!value)
    setContainerCobranca(!value)
    setContainerDetalhe(!value)
    setItem('trocaDeTela', 'home')
  }

  function cliente() {
    setRisco('selectCliente')
    setTitleHeader('2')
    setContainerHero(!value)
    setContainerCliente(value)
    setContainerCobranca(!value)
    setContainerDetalhe(!value)
    setBuscaNaoEncontrada(!value)
    setItem('trocaDeTela', 'cliente')

  }
  function cobranca() {
    setRisco('selectCobranca')
    setTitleHeader('3')
    setContainerHero(!value)
    setContainerCliente(!value)
    setContainerCobranca(value)
    setContainerDetalhe(!value)
    setBuscaNaoEncontradaCobranca(!value)
    setItem('trocaDeTela', 'cobranca')
    setTableVencido(!value)

  }

  const trocaDeTela = getItem('trocaDeTela')

  useEffect(() => {
    if (trocaDeTela === 'home') {
      home()
    } else if (trocaDeTela === 'cliente') {
      cliente()
    } else if (trocaDeTela === 'cobranca') {
      cobranca()
    }
  }, [])


  return (
    <div className="leftCorpo">
      <div className={risco === 'selectHome' ? 'verticalRisk' : ''} onClick={() => home()} >
        <img src={risco === 'selectHome' ? homeSelect : homeIcon} alt="home" />
      </div>
      <div className={risco === 'selectCliente' ? 'verticalRisk' : ''} onClick={() => cliente()}>
        <img src={risco === 'selectCliente' ? clienteSelect : clienteIcon} alt="cliente" />
      </div>
      <div className={risco === 'selectCobranca' ? 'verticalRisk' : ''} onClick={() => cobranca()}>
        <img src={risco === 'selectCobranca' ? cobrancaSelecionada : cobrancaNav} alt="cobranca" />
      </div>
    </div>
  );
}

export default LeftMenu;
