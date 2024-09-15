import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ChevroncenterIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useStarWarsCharacters } from "../../hooks/useStarWar";
import { StarWarsCharacter } from "../../types";
import { Box, Container } from "@mui/system";
import { CircularProgress, TextField, Typography } from "@mui/material";
import styles from "./StarWar.module.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: "20%",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--primary)",
    color: "var(--whiteText)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "var(--garyText)",
    border: 0,
  },
  "&.details-cell": {
    cursor: "pointer",
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.action.hover,
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

  const filteredCharacters =
    charactersList?.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  console.log(filteredCharacters);

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
        <div className={styles.loaderContainer}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <div className={styles.searchContainer}>
            <TextField
              label="Search By Name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              fullWidth
              className={styles.searchInput}
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  color: "var(--garyText)",
                },
              }}
            />
          </div>
          {paginatedCharacters.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="star war table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Gender</StyledTableCell>
                      <StyledTableCell align="left">Height</StyledTableCell>
                      <StyledTableCell align="left">Eye color</StyledTableCell>
                      <StyledTableCell align="left">Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCharacters?.map(
                      (character: StarWarsCharacter) => (
                        <StyledTableRow key={character.name}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="left"
                          >
                            {character.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {character.gender}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {character.height}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {character.eye_color}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
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

              <div className={styles.paginationContainer}>
                <IconButton
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  aria-label="Previous page"
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
                  aria-label="Next page"
                >
                  <ChevronRightIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/007/126/non_2x/document-file-not-found-search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                alt="No Data"
                width="200px"
                height="auto"
                style={{ height: "auto", marginBottom: "20px" }}
              />
              <Typography variant="h6" color="textSecondary">
                No characters match your search..
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
