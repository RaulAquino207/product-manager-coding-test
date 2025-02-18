import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ListProductsPage from "./ListProductsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h2" gutterBottom>
            Products
          </Typography>
        </Box>
        <Routes>
          <Route path="/" element={<ListProductsPage />} />
          {/* [COMMENT] Removed unnecessary routing for product creation */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
