import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { auth } from '../services/firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      return 'The email address field is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'The email address is invalid.';
    }

    if (!password) {
      return 'The password field is required.';
    } else if (password.length < 6) {
      return 'The password must be at least 6 characters long.';
    }

    if (!password) {
      return 'The confirm password field is required.';
    } else if (passwordConfirm !== password) {
      return 'Passwords do not match.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      setLoading(false);
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push('/');
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper} variant="outlined">
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography component="h2" variant="h4" align="center">
                  Sign Up
                </Typography>
              </Grid>
              {error && (
                <Grid item>
                  <Alert variant="outlined" severity="error">
                    {error}
                  </Alert>
                </Grid>
              )}
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <TextField
                        required
                        label="E-mail"
                        value={email}
                        variant="outlined"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        label="Password"
                        type="password"
                        value={password}
                        variant="outlined"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                      >
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
