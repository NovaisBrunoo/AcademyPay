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


export default function TableCobrancaCliente() {
  const { idCliente, setShowModalEditarCobranca, setShowModalDelite, setIdCobranca, control, setControl, value } = useHooke()
  const [localArray, setLocalArray] = React.useState([])
  async function getCobranca() {
    try {
      await api.get('cobrancas',
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  async function getCobrancaId() {
    try {
      const response = await api.get(`cobranca/${idCliente}`,
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
  React.useEffect(() => {
    getCobrancaId()
    getCobranca()
  }, [])
  React.useEffect(() => {
    if (control) {
      getCobrancaId()
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
  function handleClickDelite(id) {
    setIdCobranca(id)
    setShowModalDelite(value)
  }
  return (
    <TableContainer sx={{ height: '300px', width: '90%', boxShadow: 'none' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }} align="left">Id Cob.</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }} align="left">Data de ven.</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }} align="left">Valor</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }} align="left">Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '320px', fontFamily: 'Nunito' }} align="left">Descrição</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localArray.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ fontFamily: 'Nunito' }} align="left">{row.id}</TableCell>
              <TableCell sx={{ fontFamily: 'Nunito' }} align="left">{transformarData(row.vencimento)}</TableCell>
              <TableCell sx={{ fontFamily: 'Nunito' }} align="left">{transformarEmReal(row.valor)}</TableCell>
              <TableCell sx={{ fontFamily: 'Nunito' }} align="left"><strong className={handleStatus(row.status)}>{row.status}</strong></TableCell>
              <TableCell align="left" sx={{ overflow: "hidden", textOverflow: "ellipsis", textAlign: "justify", fontFamily: 'Nunito' }}>{row.descricao}</TableCell>
              <TableCell sx={{ fontFamily: 'Nunito' }} align="center"><img style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => handleClick(row.id)} src={iconEdite} alt="cobrança" /><img style={{ cursor: "pointer" }} onClick={() => handleClickDelite(row.id)} src={iconTrash} alt="cobrança" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}