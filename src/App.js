import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Typography from '@material-ui/core/Typography';

import { auth } from './services/firebase';
import { login, logout } from './slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Grid container justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <ThumbUpAltIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h2">It works</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
