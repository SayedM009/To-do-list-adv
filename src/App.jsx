import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import TodoListApp from "./components/TodoListApp";

const them = createTheme({
  typography: {
    fontFamily: "Cairo",
  },
});

function App() {
  return (
    <ThemeProvider theme={them}>
      <TodoListApp />
    </ThemeProvider>
  );
}

export default App;
