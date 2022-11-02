import React from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const row = (x, i, header) => (
	<TableRow key={`tr-${i}`}>{header.map((y, k) => <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>)}</TableRow>
);

export default function InfoTable({ data, header }) {

	return (
		<TableContainer component={Paper}>
			<Table sx={{minWidth: 650}} aria-label='simple table'>
				<TableHead>
					<TableRow>{header.map((x, i) => <TableCell key={`thc-${i}`}>{x.name}</TableCell>)}</TableRow>
				</TableHead>
				<TableBody>{data.map((x, i) => row(x, i, header))}</TableBody>
			</Table>
		</TableContainer>
	);
}
