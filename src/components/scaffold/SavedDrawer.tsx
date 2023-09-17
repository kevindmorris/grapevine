import { Reorder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../state/hooks";

import TemporaryDrawer from "../shared/TemporaryDrawer";
import { TrackList } from "../shared/Elements";

export default function SavedDrawer() {
  const tracks = useAppSelector((state) => state.saved.tracks);

  return (
    <TemporaryDrawer icon={<Reorder />} title="Saved Items">
      {tracks.length === 0 ? (
        <Box sx={{ p: 1 }}>
          <Typography fontStyle="italic">No saved tracks.</Typography>
        </Box>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </TemporaryDrawer>
  );
}
