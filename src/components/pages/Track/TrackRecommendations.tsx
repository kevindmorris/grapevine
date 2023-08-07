import React from "react";
import { TrackRecommendationsObject } from "../../../types/types";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import { Api } from "../../../services/Api";
import { Refresh } from "@mui/icons-material";

export default function TrackRecommendations() {
  const { id } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [recommendations, setRecommendations] =
    React.useState<TrackRecommendationsObject>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const api = new Api();

  const generateTrackRecommendations = async () => {
    if (!id) return;
    setLoading(true);
    const recommendations = await api.getTrackRecommendations(
      id,
      token.access_token
    );
    setRecommendations(recommendations);

    setLoading(false);
  };

  React.useEffect(() => {
    generateTrackRecommendations();
  }, [id]);

  return (
    <>
      <div>
        <div style={{ display: "flex" }}>
          <Typography mt="auto" mr={theme.spacing(1)}>
            Recommendations
          </Typography>
          <IconButton
            size="small"
            onClick={() => generateTrackRecommendations()}
          >
            <Refresh fontSize="small" />
          </IconButton>
        </div>
        <Divider />
      </div>

      <div style={{ flex: "1 1 0", overflow: "auto" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {recommendations?.tracks.map((track) => (
              <MenuItem
                key={track.id}
                dense
                onClick={() => navigate(`/track/${track.id}`)}
              >
                <ListItemAvatar>
                  <Avatar variant="square">
                    <img
                      src={track.album.images[2].url}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={track.name}
                  secondary={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </MenuItem>
            ))}
          </List>
        )}
      </div>
    </>
  );
}
