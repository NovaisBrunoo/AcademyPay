import './styles.css';

import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { getItem } from '../../../utils/storage';

export default function ResumeBill({ nomeDaClasse, logo, status, title }) {
  const [localArrayValor, setLocalArrayValor] = useState([])
  let soma = 0
  async function getCobrancaStatus() {
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
  for (let i = 0; i < localArrayValor.length; i++) {
    soma += localArrayValor[i].valor / 100;
  }
  const valorFormatado = soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  useEffect(() => {
    getCobrancaStatus()
  }, [])

  return (
    <>
      <div className={nomeDaClasse}>
        <div>
          <img
            src={logo}
            alt='cobranças pagas icon' >
          </img>
        </div>
        <div className='resume-bill'>
          <span>
            {title}
          </span>
          <strong>
            {valorFormatado}
          </strong>
        </div>
      </div>

    </>
  );
}
