import Container from "@mui/material/Container";
import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";
function TodoListApp() {
  return (
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "white",
        minHeight: "40vh",
        minWidth: "70vh",
        maxWidth: "50vh !important",
        padding: "1rem 2rem !important",
        borderRadius: "1rem",
      }}
    >
      <TodoHeader />
      <TodoBody />
      <TodoFooter />
    </Container>
  );
}

export default TodoListApp;
