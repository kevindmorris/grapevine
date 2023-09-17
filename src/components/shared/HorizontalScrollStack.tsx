import { Box } from "@mui/material";
import React from "react";

export default function HorizontalScrollStack({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "hidden",
          overflowX: "scroll",
          msOverflowStyle: "none",
          overflow: "-moz-scrollbars-none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{ height: "100%", display: "inline-flex", gap: 2 }}
          role="list"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
