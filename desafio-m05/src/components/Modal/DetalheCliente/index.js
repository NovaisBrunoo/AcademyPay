import './style.css';
import clienteVetor from '../../../assets/Frame.svg'
import editebtn from '../../../assets/Ícone_edit_btn.svg'
import { useHooke } from '../../../context/context';
import api from '../../../api/api';
import { useEffect, useState } from 'react';
import { getItem } from '../../../utils/storage';
import alertalogo from '../../../assets/alerta Mensagem.svg'
import closealerta from '../../../assets/Icon.svg';

export default function DetalheCliente() {
    const { setShowModalEditeCliente, idCliente, alertaCliente, setAlertaCliente } = useHooke()
    const [localCliente, setLocalCliente] = useState({})
    const [control, setControl] = useState('controle')


    async function getClienteID() {
        try {
            const response = await api.get(`cliente/${idCliente}`,
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }
                }
            )
            setLocalCliente({ ...response.data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (control === 'controle') {
            getClienteID()
            setControl('banana')
        }

        if (control === 'banana') {
            setTimeout(() => {
                getClienteID()

            }, 3000);
        }
    }, [localCliente, control])

    return (
        <>
            <div className='title-cliente'>
                <img src={clienteVetor} alt='logo de cliente vetor' />
                <h2>{localCliente.nome}</h2>
            </div>
            <div className='dados-cliente'>
                <div className='top-box'>
                    <h2>Dados do Cliente</h2>
                    <button className='btn-edite' onClick={() => setShowModalEditeCliente(true)} ><img src={editebtn} alt='botão para editar cliente' /> Editar Cliente</button>
                </div>
                <div className='detalhes-cliente'>
                    <div className='box-detalhe-cliente'>
                        <strong>E-mail</strong>
                        <span className='cliente-editar'>{localCliente.email}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>Telefone</strong>
                        <span>{localCliente.telefone}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>CPF</strong>
                        <span>{localCliente.cpf}</span>
                    </div>
                </div>
                <div className='detalhes-footer'>
                    <div className='box-detalhe-cliente'>
                        <strong>Endereço</strong>
                        <span>{localCliente.logradouro}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>Bairro</strong>
                        <span>{localCliente.bairro}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>Complemento</strong>
                        <span>{localCliente.complemento}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>CEP</strong>
                        <span>{localCliente.cep}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>Cidade</strong>
                        <span>{localCliente.cidade}</span>
                    </div>
                    <div className='box-detalhe-cliente'>
                        <strong>UF</strong>
                        <span>{localCliente.estado}</span>
                    </div>
                </div>
            </div>
            {alertaCliente &&
                <div className='alerta-cliente'>
                    <div className='alerta-mensagem'>
                        <img src={alertalogo} alt='logo de alerta com sucesso' />
                        <span>Cadastro concluído com sucesso</span>
                    </div>
                    <img className='closeAlerta' onClick={() => setAlertaCliente(false)} src={closealerta} alt='icone para fechar o alerta' />
                </div>
            }
        </>
    )

}