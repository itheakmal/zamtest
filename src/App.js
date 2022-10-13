import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EmptyLayout from "./app/layouts/EmptyLayout";
import AppLayout from "./app/layouts/AppLayout";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#101010",
      light: "rgba(0, 0, 0, 0.6)",
      dark: "#000",
    },
    secondary: {
      main: "#9e0c00",
      light: "#f00",
      dark: "#700",
      contrastText: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    background: {
      default: "whitesmoke",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<EmptyLayout />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
