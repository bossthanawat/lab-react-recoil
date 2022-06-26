import { Container, Typography, Box } from "@mui/material";
import Home, { MultipleRecoilRootPage, MultipleRecoilRootNotSuspensePage } from "pages/Main";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <BrowserRouter>
        <Typography variant="h3" component={Link} to="/">
          Recoil
        </Typography>
        <Box sx={{ mb: 2 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="multiple-recoilRoot"
            element={<MultipleRecoilRootPage />}
          />
          <Route path="/" element={<Home />} />
          <Route
            path="multiple-recoilRoot-not-suspense"
            element={<MultipleRecoilRootNotSuspensePage />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
