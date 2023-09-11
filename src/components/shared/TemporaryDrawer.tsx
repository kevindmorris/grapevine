import { Clear } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const DRAWER_WIDTH = 350;
export default function TemporaryDrawer({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}) {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        {icon}
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH },
        }}
      >
        <Box
          sx={{
            height: 45,
            pl: 1,
            pr: 0.5,
            py: 0.5,
            display: "flex",
          }}
        >
          <Typography fontWeight="bold" mt="auto" mr="auto">
            {title}
          </Typography>
          <div>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <Clear />
            </IconButton>
          </div>
        </Box>
        <Divider />
        {children}
      </Drawer>
    </>
  );
}
