import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoListApp from "./components/TodoListApp";
import "./App.css";

const them = createTheme({
  typography: {
    fontFamily: "Cairo",
  },
});

function App() {
  return (
    <ThemeProvider theme={them}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoListApp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
