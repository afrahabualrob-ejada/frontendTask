import { Divider, Typography } from "@mui/material";

export const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        gutterBottom
        sx={{ mt: 5 }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 4 }} />
    </>
  );
};
