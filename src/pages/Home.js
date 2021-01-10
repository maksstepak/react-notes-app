import { Grid, Typography } from '@material-ui/core';
import { ThumbUpAlt as ThumbUpAltIcon } from '@material-ui/icons';

const Home = () => {
  return (
    <Grid container justify="center" alignItems="center" spacing={1}>
      <Grid item>
        <ThumbUpAltIcon fontSize="large" color="primary" />
      </Grid>
      <Grid item>
        <Typography variant="h2">It works</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
