import React from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))

export default function error() {
    return (
        <Container component="main" >
            <center><h2>404 Not Found!</h2></center>
        </Container >
    )
}
