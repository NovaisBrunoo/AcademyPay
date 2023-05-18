import './style.css';
import BoxTableCobranca from '../BoxTableCobranca';
import { useHooke } from '../../../context/context';
import { getItem, setItem } from '../../../utils/storage';
import api from '../../../api/api';
import { useEffect, useState } from 'react';

export default function BoxCobranca({ title, tipo, status }) {
    const { setContainerCobranca, value, setContainerDetalhe, setTitleHeader, setContainerHero, setContainerCliente, setRisco, setControl, setStatusCobranca, setTableVencido } = useHooke()
    function cobranca() {
        setRisco('selectCobranca')
        setControl(true)
        setTitleHeader('3')
        setContainerHero(!value)
        setContainerCliente(!value)
        setContainerCobranca(value)
        setContainerDetalhe(!value)
        setItem('trocaDeTela', 'cobranca')
        setStatusCobranca(status)
        setTableVencido(value)
    }
    const [localArrayValor, setLocalArrayValor] = useState([])
    async function handlesCobranca() {
        try {
            const response = await api.get(`detalharcobrancas/${status}`,
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }
                })
            setLocalArrayValor(response.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        handlesCobranca()
    }, [])

    return (
        <div className='box'>
            <div className='container-title'>
                <h2>{title}</h2>
                <strong className={tipo}>{localArrayValor.length}</strong>
            </div>
            <BoxTableCobranca status={status} />
            <div className='footer-box'>
                <strong onClick={() => cobranca()}>Ver Tudo</strong>
            </div>
        </div>
    );
}

