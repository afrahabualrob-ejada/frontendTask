import { useState } from "react";
import {
  TableContainer,
  TableHead,
  CircularProgress,
  TextField,
  TableRow,
  TableBody,
  Table,
  Box,
  Container,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useStarWarsCharacters } from "../../hooks/useStarWar";
import { StarWarsCharacter } from "../../types";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Header, NoCharacters } from "../../components";
import { StyledTableCell, StyledTableRow } from "./StarWar.style";

const StarWar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: charactersList, isLoading } = useStarWarsCharacters();
  const rowsPerPage: number = 3;
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || "1");

  const filteredCharacters: StarWarsCharacter[] =
    charactersList?.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const paginatedCharacters: StarWarsCharacter[] = filteredCharacters.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages: number = Math.ceil(
    (filteredCharacters?.length || 0) / rowsPerPage
  );

  const viewDetails = (character: StarWarsCharacter) => {
    navigate(`/character/${character.name}`, { state: { character } });
  };

  return (
    <Container>
      <Header title="Star Wars characters" />
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={16}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center" mb={2}>
            <TextField
              label="Search By Name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                navigate("?page=1");
              }}
              size="small"
              sx={{ minWidth: "300px", mb: 1, mt: 3 }}
            />
          </Box>
          {paginatedCharacters.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="star war table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Gender</StyledTableCell>
                      <StyledTableCell>Height</StyledTableCell>
                      <StyledTableCell>Eye color</StyledTableCell>
                      <StyledTableCell>Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCharacters?.map(
                      (character: StarWarsCharacter) => (
                        <StyledTableRow key={character.name}>
                          <StyledTableCell component="th" scope="row">
                            {character.name}
                          </StyledTableCell>
                          <StyledTableCell>{character.gender}</StyledTableCell>
                          <StyledTableCell>{character.height}</StyledTableCell>
                          <StyledTableCell>
                            {character.eye_color}
                          </StyledTableCell>
                          <StyledTableCell
                            onClick={() => viewDetails(character)}
                            className="details-cell"
                          >
                            See More Details..
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  page={currentPage}
                  count={totalPages}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`?page=${item.page}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            </>
          ) : (
            <NoCharacters />
          )}
        </>
      )}
    </Container>
  );
};
export default StarWar;
