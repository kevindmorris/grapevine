import {
  Avatar,
  AvatarProps,
  Box,
  IconButton,
  List,
  ListItemText,
  ListItemTextProps,
  ListProps,
  MenuItem,
  styled,
} from "@mui/material";

export const GrapevineIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "33%",
  transition: "all 0.25s ease",
}));
export const GrapevineAvatar = styled((props: AvatarProps) => (
  <Avatar variant="square" {...props} />
))(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
}));
export const GrapevineList = styled((props: ListProps) => (
  <List disablePadding {...props} />
))(({ theme }) => ({
  flex: 1,
}));
export const GrapevineMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  transition: "all 0.25s ease",
}));
export const GrapevineListItemText = styled((props: ListItemTextProps) => (
  <ListItemText
    primaryTypographyProps={{ noWrap: true }}
    secondaryTypographyProps={{ noWrap: true }}
    {...props}
  />
))(({ theme }) => ({}));
export const GrapevineHeroBox = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  display: "flex",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.spacing(0.5),
}));
