import { Container, Drawer, List } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";

const MobileHeader = ({ isDrawerOpen, toggleMobileMenu }) => {
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
            <img src={Logo} alt="logo" height={65} width={65} />
          </Link>
        </List>
      </Container>
    </Drawer>
  );
};

export default MobileHeader;
