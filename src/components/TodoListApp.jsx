import Container from "@mui/material/Container";
import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";
import { useState } from "react";
import { TabsContext } from "../contexts/TabsContext";

const tabsObjects = [
  { title: "الكل", color: "#007BFF", accent: "rgba(0, 123, 255, .3)" },
  { title: "منجز", color: "#28A745", accent: "rgba(40, 167, 69, .3)" },
  { title: "غير منجز", color: "#FFC107", accent: "rgba(255, 193, 7, .3)" },
  { title: "شخصى", color: "#8356d5", accent: "rgba(131, 86, 213, .3)" },
  { title: "عمل", color: "#1B4F72", accent: "rgba(27, 79, 114, .3)" },
  { title: "هوايات", color: "#20C997", accent: "rgba(32, 201, 151,.3)" },
];

const toDoObject = [
  {
    id: 1,
    title: "المهمة الأولى",
    description: "مجرد نص",
    creationTime: new Date().toLocaleString(),
    endingTime: "",
    type: "شخصى",
    isComplated: false,
  },
  {
    id: 2,
    title: "المهمة الثانية",
    description: "مجرد نص",
    creationTime: new Date().toLocaleString(),
    endingTime: "",
    type: "عمل",
    isComplated: true,
  },
  {
    id: 3,
    title: "المهمة الثالثة",
    description: "مجرد نص",
    creationTime: new Date().toLocaleString(),
    endingTime: "",
    type: "هوايات",
    isComplated: true,
  },
];

function TodoListApp() {
  const [todos, setTodos] = useState([]);

  function handleAddingTodo(toToObj) {
    setTodos([...todos, toToObj]);
  }
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
      <TabsContext.Provider value={tabsObjects}>
        <TodoHeader />
        <TodoBody toDoObject={todos} />
        <TodoFooter onAddToDo={handleAddingTodo} />
      </TabsContext.Provider>
    </Container>
  );
}

export default TodoListApp;
