import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Alert from '@material-ui/core/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut } from '../actions/index'
import fireb from '../config/fireb'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        width: '40%',
        margin: theme.spacing(3, 2, 2),
    },
    error: {
        color: 'red'
    }
}));

function Login(props) {
    const classes = useStyles();
    const isLogged = useSelector(state => state.isLogged)
    const [formType, setFormType] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data);
        console.log(formType);
        setTimeout(() => {
            if (formType === 'signIn') {
                fireb.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then(() => {
                        console.log('SignIn Completed!');
                        console.log(props);
                        dispatch(signIn());
                        props.history.push('/home');
                    })
                    .catch(e => {
                        console.log(e.message);
                        alert(e.message);
                        //dispatch(signOut());
                    })
            }
            else if (formType === 'signUp') {
                fireb.auth().createUserWithEmailAndPassword(data.email, data.password)
                    .then(() => {
                        alert('UserID created sucessfully!');
                        //dispatch(signIn())
                    })
                    .catch(e => {
                        console.log(e.message);
                        alert(e.message);
                        //dispatch(signOut());
                    })
            }
        }, 250);
        //dispatch(signIn());
    }

    const { register, handleSubmit, errors, setValue } = useForm();

    // if (isLogged) {
    //     props.history.push('/home');
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register({
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
                    <p className={classes.error}>{errors.email && "Invalid email address"}</p>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register({ minLength: 6 })}
                    />
                    <p className={classes.error}>{errors.password && "Password field required Min length of 6"}</p>

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Grid container>
                        <Button
                            type="submit"
                            fullWidth
                            name='signIn'
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => { setFormType('signIn') }}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            className={classes.submit}
                            onClick={() => { setFormType('signUp') }}
                        >
                            Sign Up
                        </Button>
                    </Grid>

                </form>
            </div>
        </Container>
    );
}

export default withRouter(Login)