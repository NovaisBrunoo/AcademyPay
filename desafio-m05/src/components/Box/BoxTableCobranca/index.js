import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './style.css'
import api from "../../../api/api";
import { getItem } from "../../../utils/storage";


export default function BoxTableCobranca({ status }) {
    const [localArrayValor, setLocalArrayValor] = React.useState([])

    async function handlesCobranca() {
        try {
            const response = await api.get(`detalharcobrancas/${status}`,
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }
                })
            const itemsLimitados = response.data.slice(0, 4);
            setLocalArrayValor(itemsLimitados)
        } catch (error) {
            console.log(error)
        }
    }
    function transformarEmReal(valor) {
        const valorTransformadoReais = valor / 100;
        const valorEmReais = valorTransformadoReais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorEmReais
    }
    React.useEffect(() => {
        handlesCobranca()
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%', height: '280px' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cliente</TableCell>
                        <TableCell align="center">ID da Cob.</TableCell>
                        <TableCell align="center">Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {localArrayValor.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="center">{row.nome_cliente}</TableCell>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{transformarEmReal(row.valor)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}