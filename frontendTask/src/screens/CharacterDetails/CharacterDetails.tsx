import { useLocation } from "react-router-dom";
import { StarWarsCharacter } from "../../types";
import { Typography, Grid, Paper, Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const InfoItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
  "& strong": {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
}));

export default function CharacterDetails() {
  const location = useLocation();
  const { character } = location.state as { character: StarWarsCharacter };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default, 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
      }}
    >
      <Box sx={{ maxWidth: "700px", width: "100%" }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          {character.name.toUpperCase()}
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Personal Information
              </Typography>
              <InfoItem variant="body1">
                <strong>Height:</strong> {character.height} cm
              </InfoItem>
              <InfoItem variant="body1">
                <strong>Mass:</strong> {character.mass} kg
              </InfoItem>
              <InfoItem variant="body1">
                <strong>Hair Color:</strong> {character.hair_color}
              </InfoItem>
              <InfoItem variant="body1">
                <strong>Skin Color:</strong> {character.skin_color}
              </InfoItem>
              <InfoItem variant="body1">
                <strong>Eye Color:</strong> {character.eye_color}
              </InfoItem>
              <InfoItem variant="body1">
                <strong>Birth Year:</strong> {character.birth_year}
              </InfoItem>
              <InfoItem variant="body1">
                <strong>Gender:</strong> {character.gender}
              </InfoItem>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
