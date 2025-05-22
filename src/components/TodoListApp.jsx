// MUI
import Container from "@mui/material/Container";
// COMPONENTS
import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";
// CONTEXT
import { TabsProvider } from "../contexts/TabsContext";
import { TodosProvider } from "../contexts/TodosContext";
import { MyAlertProvider } from "../contexts/MyAlertContext";
// Container Style
const ContainerStyle = {
  bgcolor: "white",
  minHeight: "60vh",
  minWidth: "70vh",
  maxWidth: "50vh !important",
  padding: "1rem 2rem !important",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

function TodoListApp() {
  return (
    // APP WHITE CONTAINER
    <Container maxWidth="md" sx={ContainerStyle}>
      <TabsProvider>
        <TodoHeader />
        <TodosProvider>
          <MyAlertProvider>
            <TodoBody />
            <TodoFooter />
          </MyAlertProvider>
        </TodosProvider>
      </TabsProvider>
    </Container>
  );
}

export default TodoListApp;
