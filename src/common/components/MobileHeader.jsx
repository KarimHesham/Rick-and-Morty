import { Container, Drawer, List, useColorScheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.webp";

const MobileHeader = ({ isDrawerOpen, toggleMobileMenu }) => {
  const { mode } = useColorScheme();

  const navigate = useNavigate();
  return (
    <Drawer anchor="top" open={isDrawerOpen} onClose={toggleMobileMenu}>
      <Container maxWidth="xl" role="presentation">
        <List>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "6px",
            }}
          >
            <img src={Logo} alt="logo" height={35} width={65} />
          </Link>
        </List>
      </Container>
    </Drawer>
  );
};

export default MobileHeader;
