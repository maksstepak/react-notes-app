import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

const DeleteNoteDialog = ({ open, handleClose, noteId, deleteNote }) => {
  const handleDeleteClick = async () => {
    await deleteNote(noteId);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete this note?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleDeleteClick}
          color="secondary"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNoteDialog;
