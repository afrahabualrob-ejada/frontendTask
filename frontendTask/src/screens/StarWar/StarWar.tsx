import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  TableContainer,
  TableHead,
  CircularProgress,
  TextField,
  TableRow,
  IconButton,
  TableBody,
  Table,
  Box,
  Container,
} from "@mui/material";
import ChevroncenterIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useStarWarsCharacters } from "../../hooks/useStarWar";
import { StarWarsCharacter } from "../../types";
import styles from "./StarWar.module.css";
import { useNavigate } from "react-router-dom";
import { Header, NoCharacters } from "../../components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "var(--backgroundGray)",
  },
}));

export default function StarWar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: charactersList, isLoading } = useStarWarsCharacters();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const rowsPerPage: number = 3;

  const filteredCharacters: StarWarsCharacter[] =
    charactersList?.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const paginatedCharacters: StarWarsCharacter[] = filteredCharacters.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const totalPages: number = Math.ceil(
    (filteredCharacters?.length || 0) / rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();
  const viewDetails = (character: StarWarsCharacter) => {
    navigate(`/character/${character.name}`, { state: { character } });
  };

  return (
    <Container>
      <Header title=" Star Wars characters" />
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
                setCurrentPage(0);
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
                <IconButton
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  aria-label="Previous-page"
                >
                  <ChevroncenterIcon />
                </IconButton>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(index)}
                    className={
                      currentPage === index
                        ? styles.pageButtonActive
                        : styles.pageButton
                    }
                  >
                    {index + 1}
                  </button>
                ))}
                <IconButton
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next-page"
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <NoCharacters />
          )}
        </>
      )}
    </Container>
  );
}
