import Button from "@mui/material/Button";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const ResetPasswordConfirmModal = ({ openModal, handleCloseModal }) => {
  return (
    <Dialog onClose={handleCloseModal} open={openModal}>
      <DialogContent dividers>
        <Typography gutterBottom>
          A link has been sent to your email with instructions to reset your
          password.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseModal}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordConfirmModal;
