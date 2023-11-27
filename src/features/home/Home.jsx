import { Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import useError from "../../common/hooks/useError";
import useLoading from "../../common/hooks/useLoading";
import CharacterCard from "./components/CharacterCard";
import useCharacters from "./hooks/useCharacters";
import Header from "../../common/components/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { LoadingComponent, loadingState, setLoadingState } = useLoading();
  const { ErrorComponent, errorState, setErrorState, handleCloseError } =
    useError();

  const [characters, setPageNumber] = useCharacters(
    setLoadingState,
    setErrorState
  );

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Stack spacing={2}>
          <Typography variant="h2" fontWeight="medium">
            Rick and Morty Characters
          </Typography>

          <Typography variant="h4">{characters?.info.count} Results</Typography>

          <Grid container spacing={2}>
            {characters?.results.length > 0 &&
              characters.results.map((character) => (
                <Grid
                  item
                  key={character.id}
                  xs={12}
                  md={3}
                  // lg={2}
                  sx={{ cursor: "default" }}
                  onClick={() => navigate(`/character/${character.id}`)}
                >
                  <CharacterCard character={character} />
                </Grid>
              ))}
          </Grid>

          <Stack alignItems="center" justifyContent="center">
            <Pagination
              count={characters?.info.pages}
              variant="outlined"
              shape="rounded"
              onChange={(e, pageNumber) => {
                e.preventDefault();
                setPageNumber(pageNumber);
              }}
            />
          </Stack>
          <LoadingComponent
            open={loadingState.isOpen}
            message={loadingState.message}
            full={loadingState.fullScreen}
          />
          <ErrorComponent
            open={errorState.isOpen}
            message={errorState.message}
            handleClose={handleCloseError}
          />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
