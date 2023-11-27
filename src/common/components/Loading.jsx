import { Backdrop, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Logo from "../../assets/logo.webp";

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
          <img
            src={Logo}
            className="loader-img"
            alt="loader"
            height={60}
            width={60}
          />
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
          <img
            src={Logo}
            className="loader-img-small"
            alt="loader"
            height={60}
            width={60}
          />
          <Typography>{message}</Typography>
        </Stack>
      )}
    </Backdrop>
  );
};

export default Loading;
