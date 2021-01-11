import { Paper, Typography, makeStyles, Grid, Button } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const NoteDetails = ({
  note,
  handleDeleteDialogOpen,
  handleEditDialogOpen,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography component="h4" variant="h5" gutterBottom>
        {note.title}
      </Typography>
      <Typography gutterBottom>{note.note}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            fullWidth
            onClick={() => handleEditDialogOpen(note)}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            fullWidth
            onClick={() => handleDeleteDialogOpen(note)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NoteDetails;
