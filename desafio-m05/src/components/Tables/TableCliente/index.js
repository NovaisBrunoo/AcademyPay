import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import api from "../../../api/api";
import cobranca from '../../../assets/cobranca.svg';
import { useHooke } from "../../../context/context";
import { getItem } from "../../../utils/storage";
import './style.css';


export default function TableCliente() {
  const { setContainerDetalhe, setContainerCliente, setTitleHeader, setIdCliente, setShowModalCobranca, value, containerDetalhe, setControl, control } = useHooke()
  function handleDetalhe(id) {
    setContainerDetalhe(value)
    setContainerCliente(!value)
    setTitleHeader('4')
    setIdCliente(id)
  }
  const [localArray, setLocalArray] = React.useState([])
  async function getCliente() {
    try {
      const responseClientes = await api.get('clientes',
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

  React.useEffect(() => {
    getCliente()
    getCobranca()
  }, [])
  React.useEffect(() => {
    if (control) {
      getCliente()
      getCobranca()
      setControl(!value)
    }

  }, [control])

  function handleClick(id) {
    setIdCliente(id)
    setShowModalCobranca(true)
  }


  return (
    <TableContainer sx={{ height: '650px', borderRadius: '30px', width: '90%', marginLeft: '5%', marginTop: '31px' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">CPF</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">E-mail</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Telefone</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Criar Cobranças</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localArray.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell onClick={() => handleDetalhe(row.id)} sx={{ cursor: 'pointer' }} align="left">{row.nome}</TableCell>
              <TableCell align="left">{row.cpf}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.telefone}</TableCell>
              <TableCell align="left"><strong className={row.status === 'Em dia' ? 'statusPago' : 'statusPendente'}>{row.status}</strong></TableCell>
              <TableCell align="left"><img style={{ cursor: 'pointer' }} onClick={() => handleClick(row.id)} src={cobranca} alt="cobrança" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}