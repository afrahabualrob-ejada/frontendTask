import { Divider, Typography } from "@mui/material";

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        gutterBottom
        sx={{ mt: 2, fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 4 }} />
    </>
  );
};
export default Header;
