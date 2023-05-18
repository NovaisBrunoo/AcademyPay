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
import { useHooke } from '../../../context/context';
import { getItem } from "../../../utils/storage";
import './style.css';

export default function TableCobranca() {
  const [localArray, setLocalArray] = React.useState([])
  const { value, setShowModalEditarCobranca, setControl, setIdCobranca, control, status } = useHooke()

  async function getCobranca() {
    try {
      const response = await api.get('cobrancas',
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
      setLocalArray([...response.data])
    } catch (error) {
      console.log(error)
    }
  }
  const [localArrayValor, setLocalArrayValor] = React.useState([])
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

  React.useEffect(() => {
    getCobranca()
  }, [])

  React.useEffect(() => {
    if (control) {
      getCobranca()
      handlesCobranca()
      setControl(!value)
    }
  }, [control])
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

  function handleClick(id) {
    setIdCobranca(id)
    setShowModalEditarCobranca(value)
  }

  return (
    <TableContainer sx={{ height: '650px', borderRadius: '30px', width: '90%' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Id.Cob</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Valor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Validade</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Descrição</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localArray.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" onClick={() => console.log('teste')}>{row.nome_cliente}</TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{transformarEmReal(row.valor)}</TableCell>
              <TableCell align="left">{transformarData(row.vencimento)}</TableCell>
              <TableCell align="left"><strong className={handleStatus(row.status)}>{row.status}</strong></TableCell>
              <TableCell align="left" sx={{ overflow: "hidden", textOverflow: "ellipsis", textAlign: "justify", maxWidth: '200px' }}>{row.descricao}</TableCell>
              <TableCell sx={{ width: '150px', cursor: "pointer" }} align="center"><img onClick={() => handleClick(row.id)} src={iconEdite} style={{ marginRight: '30px' }} alt="cobrança" /><img src={iconTrash} alt="cobrança" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}