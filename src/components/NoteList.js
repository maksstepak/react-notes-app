import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { db } from '../services/firebase';
import { selectUser } from '../slices/auth';

import NoteDetails from './NoteDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const NoteList = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection('notes')
      .where('userUid', '==', user.uid)
      .onSnapshot((snapshot) => {
        const tmpNotes = snapshot.docs.map((note) => ({
          id: note.id,
          ...note.data(),
        }));

        setNotes(tmpNotes);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className={classes.root}>
      {loading ? (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          {notes.length > 0 ? (
            <Grid container spacing={2}>
              {notes.map((note) => {
                return (
                  <Grid item xs={12} sm={6} key={note.id}>
                    <NoteDetails note={note} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography align="center" variant="h6" component="h3">
              No notes found
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default NoteList;
