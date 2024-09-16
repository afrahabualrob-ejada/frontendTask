import { CSSObject, FormControlLabel, alpha, styled } from "@mui/material";

export const StyledItem = styled(FormControlLabel)<{ selected: boolean }>(
  ({ theme, selected }): CSSObject => ({
    border: `1px solid ${theme.palette.divider}`,
    borderColor: selected
      ? alpha(theme.palette.primary.main, 0.1)
      : theme.palette.divider,
    borderRadius: "4px",
    height: "35px",
    paddingRight: "12px",
    backgroundColor: selected
      ? alpha(theme.palette.primary.main, 0.1)
      : "transparent",
    "& .MuiFormControlLabel-label": {
      fontSize: "12px",
    },
  })
);
