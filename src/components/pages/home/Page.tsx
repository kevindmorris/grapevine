import { Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/grapevine-logo.png"
        alt="grapevine"
        style={{ width: "40vw", objectFit: "contain" }}
      />
      <br/>
      <Typography>
        A customized track recommendation application, leveraging Spotify's Web
        API.
      </Typography>
    </Container>
  );
}
