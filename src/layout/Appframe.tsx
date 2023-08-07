import Search from "./Search";
import Router from "./Router";
import { Container } from "@mui/material";

export default function Appframe() {
  return (
    <Container
      sx={{
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Search />
      <Router />
    </Container>
  );
}
