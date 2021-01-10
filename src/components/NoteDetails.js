import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const NoteDetails = ({ note }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography component="h4" variant="h5" gutterBottom>
        {note.title}
      </Typography>
      <Typography>{note.note}</Typography>
    </Paper>
  );
};

export default NoteDetails;
