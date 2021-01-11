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
import DeleteNoteDialog from './DeleteNoteDialog';
import EditNoteDialog from './EditNoteDialog';

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
  const [currentNote, setCurrentNote] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const handleDeleteDialogOpen = (note) => {
    setCurrentNote(note);
    setDeleteDialog(true);
  };

  const handleEditDialogOpen = (note) => {
    setCurrentNote(note);
    setEditDialog(true);
  };

  const deleteNote = async (noteId) => {
    await db.collection('notes').doc(noteId).delete();
  };

  const editNote = async (noteId, data) => {
    await db.collection('notes').doc(noteId).update(data);
  };

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
                    <NoteDetails
                      note={note}
                      handleDeleteDialogOpen={handleDeleteDialogOpen}
                      handleEditDialogOpen={handleEditDialogOpen}
                    />
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
      {currentNote && (
        <>
          <DeleteNoteDialog
            open={deleteDialog}
            handleClose={() => {
              setDeleteDialog(false);
            }}
            noteId={currentNote.id}
            deleteNote={deleteNote}
          />
          <EditNoteDialog
            open={editDialog}
            handleClose={() => {
              setEditDialog(false);
            }}
            note={currentNote}
            editNote={editNote}
          />
        </>
      )}
    </div>
  );
};

export default NoteList;
