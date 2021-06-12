import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Home() {
    const classes = useStyles();
    const [state, setstate] = useState([])

    const DelVal=(id)=>{
        setstate(state.filter((row)=>row.id!==id))
    }
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {setstate(json)})
    }, [])

    return (
        <div>
        <Container >
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow >
                        <TableCell variant="h1"><b>Sno</b></TableCell>
                        <TableCell align="center" variant="h1"><b>Title</b></TableCell>
                        <TableCell align="center" variant="h1"><b>Body</b></TableCell>
                        <TableCell align="center"><b>Action</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {state.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">{row.body}</TableCell>
                        <TableCell><Button variant="contained" color="secondary" onClick={()=>DelVal(row.id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </Container>
        </div>
    )
}

export default Home
