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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export function Home() {
    const classes = useStyles();
    const [state, setstate] = useState([])
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');


    const DelVal=(id)=>{
        setstate(state.filter((row)=>row.id!==id))
    }

    const handleClickOpen = (val) => {
        setOpen(true);
        setId(val);
        // console.log(id);
      };
    
      const handleClose = () => {
        setOpen(false);
        DelVal(id);
        setId('');
      };
      const handleClose1 = () => {
        setOpen(false);
      };
      
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {setstate(json)})
    }, [])

    return (
        <div>
        <Container >
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1} color="primary">
              No
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
            <TableContainer component={Paper}>
                
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow >
                        <TableCell ><b>Sno</b></TableCell>
                        <TableCell align="center" ><b>Title</b></TableCell>
                        <TableCell align="center" ><b>Body</b></TableCell>
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
                        <TableCell>
                        
                            {/* <Button variant="contained" color="secondary" onClick={()=>DelVal(row.id)}>Delete</Button> */}
                            <Button variant="outlined" color="secondary" onClick={()=>handleClickOpen(row.id)}>Delete</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
    </Container>
        </div>
    )
}
