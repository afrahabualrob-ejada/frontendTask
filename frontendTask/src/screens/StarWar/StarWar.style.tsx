import {
  CSSObject,
  TableCell,
  TableRow,
  Theme,
  styled,
  tableCellClasses,
} from "@mui/material";

export const StyledTableCell = styled(TableCell)(
  ({ theme }: { theme: Theme }): CSSObject => ({
    width: "20%",
    border: 0,
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: "var(--whiteText)",
    },
    "&.details-cell": {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export const StyledTableRow = styled(TableRow)(
  (): CSSObject => ({
    "&:nth-of-type(even)": {
      backgroundColor: "var(--backgroundGray)",
    },
  })
);
