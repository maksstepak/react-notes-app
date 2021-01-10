import { Grid, Card, CardContent, Typography, Box } from '@material-ui/core';
import { SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon } from '@material-ui/icons';

const NotFound = () => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <SentimentVeryDissatisfiedIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h3">
              Page not found
            </Typography>
          </Grid>
        </Grid>
        <Box pt={2}>
          <Typography>
            Maybe the page you are looking for has been removed, or you typed in
            the wrong URL.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotFound;
