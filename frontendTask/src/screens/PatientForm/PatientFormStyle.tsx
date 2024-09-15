import { FormControlLabel, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Placeholder = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  color: theme.palette.text.disabled,
  pointerEvents: "none",
}));

export const StyledItem = styled(FormControlLabel)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "4px",
  height: "35px",
  paddingRight: "12px",
  "& .MuiFormControlLabel-label": {
    fontSize: "12px",
  },
}));
