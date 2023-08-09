import Search from "./Search";
import Router from "./Router";
import { Container } from "@mui/material";
import Sidebar from "./Sidebar";

export default function Appframe() {
  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
      }}
    >
      <Sidebar />
      <Container>
        <Router />
      </Container>
    </div>
  );
}
