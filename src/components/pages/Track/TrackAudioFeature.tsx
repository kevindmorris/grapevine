import { Paper, Typography, useTheme } from "@mui/material";

export default function TrackAudioFeature({
  value,
  title,
}: {
  value: number;
  title: string;
}) {
  const theme = useTheme();

  const fill = 250 * value;

  return (
    <div style={{ display: "flex" }}>
      <Paper variant="outlined" sx={{ width: 250, height: 30 }}>
        <div
          style={{
            width: fill,
            height: "100%",
            backgroundColor:
              fill < 75
                ? theme.palette.error.main
                : fill < 150
                ? theme.palette.warning.main
                : theme.palette.success.main,
            opacity: 0.5,
          }}
        />
      </Paper>
      <Typography width={200} ml={theme.spacing(2)} mt="auto">
        {title}
      </Typography>
    </div>
  );
}
