import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';

import { db } from '../services/firebase';
import { selectUser } from '../slices/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const NewNoteForm = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await db.collection('notes').add({
      title: title,
      note: note,
      userUid: user.uid,
    });

    setTitle('');
    setNote('');
    setLoading(false);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography component="h3" variant="h5" align="center">
              Take a note
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <TextField
                    required
                    label="Title"
                    value={title}
                    variant="outlined"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="Note"
                    value={note}
                    variant="outlined"
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                    multiline
                    rows={3}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={<AddCircleIcon />}
                    fullWidth
                  >
                    {loading ? <CircularProgress size={24} /> : 'Add new note'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default NewNoteForm;
