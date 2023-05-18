import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './style.css'

function createData(cliente, data_vencimento, valor) {
    return { cliente, data_vencimento, valor };
}

const rows = [
    createData("Frozen", 159, 3, 500),
    createData("Frozen", 159, 3, 500),
    createData("Frozen", 159, 3, 500),
    createData("Frozen", 159, 3, 500),

];

export default function BoxTableCliente() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cliente</TableCell>
                        <TableCell align="center">Data de venc.</TableCell>
                        <TableCell align="center">Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="center">{row.cliente}</TableCell>
                            <TableCell align="center">{row.data_vencimento}</TableCell>
                            <TableCell align="center">{row.valor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}