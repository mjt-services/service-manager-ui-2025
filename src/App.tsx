import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Objects } from "@mjt-engine/object";
import { SECTION_MAP } from "./SECTION_MAP";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const [currentSection, setCurrentSection] =
    useState<keyof typeof SECTION_MAP>("daimons");

  const sections = Objects.keys(SECTION_MAP);

  const renderSection = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        {SECTION_MAP[currentSection]}
      </Box>
    );
  };

  const renderButtons = (sections: (keyof typeof SECTION_MAP)[]) => {
    return sections.map((section) => (
      <Button
        key={section}
        color="inherit"
        onClick={() => setCurrentSection(section)}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </Button>
    ));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Service Manager
          </Typography>
          {renderButtons(sections)}
        </Toolbar>
      </AppBar>
      {renderSection()}
    </ThemeProvider>
  );
};
