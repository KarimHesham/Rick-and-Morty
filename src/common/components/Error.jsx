import { Backdrop, Alert, Button } from "@mui/material";

const Error = ({ open, message, handleClose }) => {
  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Alert
        severity="error"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80px",
          boxShadow: 3,
          border: "1px solid red",
        }}
        action={
          <Button variant="outlined" color="error" onClick={handleClose}>
            Ok
          </Button>
        }
      >
        Error
        <strong>{message !== "" ? " - " + message : null}</strong>
      </Alert>
    </Backdrop>
  );
};

export default Error;
