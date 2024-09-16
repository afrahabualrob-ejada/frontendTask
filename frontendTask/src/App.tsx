import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CharacterDetails, PatientForm, StarWar } from "./screens";
import Layouts from "./screens/Layout/Layout";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layouts>
            <Routes>
              <Route path="/" element={<StarWar />} />
              <Route path="/character/:name" element={<CharacterDetails />} />
              <Route path="/form" element={<PatientForm />} />
            </Routes>
          </Layouts>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
