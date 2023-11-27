import { Backdrop, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const Loading = ({ open, message, full }) => {
  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(255, 255, 255, 1)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      {full ? (
        <Stack>
          <img src={""} className="loader-img" alt="loader" />
        </Stack>
      ) : (
        <Stack
          direction="column"
          spacing={3}
          alignItems="center"
          justifyContent="center"
          boxShadow={3}
          bgcolor="var(--mui-palette-background-default)"
          padding={3}
          borderRadius={2}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        >
          <img src={""} className="loader-img-small" alt="loader" />
          <Typography>{message}</Typography>
        </Stack>
      )}
    </Backdrop>
  );
};

export default Loading;
