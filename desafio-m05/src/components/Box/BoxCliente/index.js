import emdia from '../../../assets/EmDia.svg';
import clienteind from '../../../assets/clienteinadimplente.svg';
import { useHooke } from '../../../context/context';
import { setItem } from '../../../utils/storage';
import BoxTableCliente from '../BoxTableCliente';
import './style.css';

export default function BoxCliente({ title, tipo }) {
    const { setContainerCobranca, value, setContainerDetalhe, setTitleHeader, setContainerHero, setContainerCliente, setRisco } = useHooke()

    function cliente() {
        setRisco('selectCliente')
        setTitleHeader('2')
        setContainerHero(!value)
        setContainerCliente(value)
        setContainerCobranca(!value)
        setContainerDetalhe(!value)
        setItem('trocaDeTela', 'cliente')

    }
    return (
        <div className='box-card-end'>
            <div className='container-title-cliente'>
                <div className='logo-title'>
                    {tipo === 'contador-Inadimplentes' ? <img src={clienteind} alt='icon' /> : <img src={emdia} alt='icon' />}
                    <h2>{title}</h2>
                </div>
                <strong className={tipo}>08</strong>
            </div>
            <BoxTableCliente />
            <div className='footer-box'>
                <strong onClick={() => cliente()}>Ver Tudo</strong>
            </div>
        </div>

    );
}