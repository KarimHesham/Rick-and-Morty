import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Header from "../../common/components/Header";
import { useParams } from "react-router-dom";
import useLoading from "../../common/hooks/useLoading";
import useError from "../../common/hooks/useError";
import useCharacter from "./hooks/useCharacter";
import { GiHealthNormal } from "react-icons/gi";
import { PiGenderMaleBold } from "react-icons/pi";
import { MdCategory } from "react-icons/md";

const Character = () => {
  const { LoadingComponent, loadingState, setLoadingState } = useLoading();
  const { ErrorComponent, errorState, setErrorState, handleCloseError } =
    useError();

  const { id } = useParams();

  const character = useCharacter(id, setLoadingState, setErrorState);

  return (
    <>
      <Header />

      <Container
        maxWidth="lg"
        sx={{ padding: 8, alignItems: "center", justifyContent: "center" }}
      >
        <Stack spacing={2}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={character?.image}
              width={160}
              height={160}
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="h2">{character?.name}</Typography>
          </Stack>

          <Stack spacing={1} alignItems="center" justifyContent="center">
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                borderRadius: 8,
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <GiHealthNormal />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Status" secondary={character?.status} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PiGenderMaleBold />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Gender" secondary={character?.gender} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MdCategory />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Species"
                  secondary={character?.species}
                />
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </Container>

      <LoadingComponent
        open={loadingState.isOpen || !character}
        message={loadingState.message}
        full={loadingState.fullScreen}
      />
      <ErrorComponent
        open={errorState.isOpen}
        message={errorState.message}
        handleClose={handleCloseError}
      />
    </>
  );
};

export default Character;
