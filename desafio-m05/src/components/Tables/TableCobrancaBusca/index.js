import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import api from "../../../api/api";
import iconTrash from '../../../assets/Botão- Excluir- Tabela.svg';
import iconEdite from '../../../assets/btnEditUser.svg';
import { useHooke } from "../../../context/context";
import { getItem } from "../../../utils/storage";
import './style.css';


export default function TableCobrancaBusca() {
  const { setContainerDetalhe, setContainerCliente, setTitleHeader, setIdCliente, setShowModalCobranca, value, containerDetalhe, setControl, control, setTabelaCompleta, setListaResultadoBusca, setArrayBusca, arrayBuscaCobranca, resultadoBusca, setBuscaNaoEncontrada } = useHooke()
  function handleDetalhe(id) {
    setContainerDetalhe(value)
    setContainerCliente(!value)
    setTitleHeader('4')
    setIdCliente(id)
  }

  const [localArray, setLocalArray] = React.useState([])
  async function getCliente() {
    try {
      const responseClientes = await api.get('cobrancas',
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setLocalArray([...responseClientes.data])
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getCliente()
  }, [])


  function handleClick(id) {
    setIdCliente(id)
    setShowModalCobranca(true)
  }
  function handleStatus(status) {
    if (status === "vencido") {
      return 'statusPendente'
    }
    if (status === 'paga') {
      return 'statusPago'
    }
    if (status === 'pendente') {
      return 'status-espera'
    }

  }
  function transformarData(data) {
    const dataObj = new Date(data);
    const dia = (dataObj.getDate() + 1)
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear().toString();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada
  }
  function transformarEmReal(valor) {
    const valorTransformadoReais = valor / 100;
    const valorEmReais = valorTransformadoReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorEmReais
  }



  return (
    <TableContainer sx={{ height: '650px', borderRadius: '30px', width: '90%', marginLeft: '5%', marginTop: '31px' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Id. Cobrança</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Valor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Vencimento</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Descrição</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayBuscaCobranca.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell onClick={() => handleDetalhe(row.id)} sx={{ cursor: 'pointer' }} align="left">{row.nome_cliente}</TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{transformarEmReal(row.valor)}</TableCell>
              <TableCell align="left">{transformarData(row.vencimento)}</TableCell>
              <TableCell align="left"><strong className={handleStatus(row.status)}>{row.status}</strong></TableCell>
              <TableCell align="left">{row.descricao}</TableCell>
              <TableCell sx={{ width: '150px', cursor: "pointer" }} align="center"><img onClick={() => handleClick(row.id)} src={iconEdite} style={{ marginRight: '30px' }} alt="cobrança" /><img src={iconTrash} alt="cobrança" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}