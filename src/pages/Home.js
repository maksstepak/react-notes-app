import Grid from '@material-ui/core/Grid';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Typography from '@material-ui/core/Typography';

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
