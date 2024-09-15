import { useLocation } from "react-router-dom";
import { StarWarsCharacter } from "../../types";
import { Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Header } from "../../components/Header";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const CharacterDetails = () => {
  const location = useLocation();
  const { character } = location.state as { character: StarWarsCharacter };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box sx={{ maxWidth: "700px", width: "100%" }}>
        <Header title={character.name.toUpperCase()} />
        <Box>
          <StyledPaper>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "600", mb: 2 }}
            >
              Personal Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body1">
                <strong>Height:</strong> {character.height} cm
              </Typography>
              <Typography variant="body1">
                <strong>Mass:</strong> {character.mass} kg
              </Typography>
              <Typography variant="body1">
                <strong>Hair Color:</strong> {character.hair_color}
              </Typography>
              <Typography variant="body1">
                <strong>Skin Color:</strong> {character.skin_color}
              </Typography>
              <Typography variant="body1">
                <strong>Eye Color:</strong> {character.eye_color}
              </Typography>
              <Typography variant="body1">
                <strong>Birth Year:</strong> {character.birth_year}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {character.gender}
              </Typography>
            </Box>
          </StyledPaper>
        </Box>
      </Box>
    </Box>
  );
};
export default CharacterDetails;
