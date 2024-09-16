import { Typography, Box } from "@mui/material";
import searchCharactersImage from "../../assets/images/searchCharacters.jpg";

export const NoCharacters = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" mt={3}>
      <img
        title="no characters"
        src={searchCharactersImage}
        alt="No characters match your search"
        width="200px"
      />
      <Typography variant="h6" color="textPrimary" align="center" mt={2}>
        oops! No characters match your search..
      </Typography>
    </Box>
  );
};
export default NoCharacters;
