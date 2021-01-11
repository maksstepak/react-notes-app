import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';

const EditNoteDialog = ({ open, handleClose, note, editNote }) => {
  const [title, setTitle] = useState(null);
  const [noteText, setNoteText] = useState(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setNoteText(note.note);
    }
  }, [note, open]);

  const handleSaveClick = async () => {
    await editNote(note.id, { title, note: noteText });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit note</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="Title"
              variant="outlined"
              value={title}
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
              value={noteText}
              variant="outlined"
              onChange={(e) => {
                setNoteText(e.target.value);
              }}
              multiline
              rows={3}
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleSaveClick}
          color="primary"
          variant="contained"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNoteDialog;
