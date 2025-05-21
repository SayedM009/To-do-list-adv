// MUI
import Container from "@mui/material/Container";

// REACT
import { useState } from "react";
import { TabsContext } from "../contexts/TabsContext";
import { TodosContext } from "../contexts/TodosContext";
import { useSearchParams } from "react-router";

// COMPONENTS

import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";

// BASIC TABS OBJECT FOR  (ALL, DONE, NOT DONE)
const basicTabsObjects = [
  { title: "الكل", color: "#007BFF", accent: "rgba(0, 123, 255, .3)" },
  {
    title: "منجز",
    color: "#28A745",
    accent: "rgba(40, 167, 69, .3)",
    isComplated: true,
  },
  {
    title: "غير منجز",
    color: "#FFC107",
    accent: "rgba(255, 193, 7, .3)",
    isComplated: false,
  },
];

// TYPED TABS OBJECT FOR REST OF TABS (PERSONAL, WORK & HOPPIES)
const typedTabsObjects = [
  { title: "شخصى", color: "#8356d5", accent: "rgba(131, 86, 213, .3)" },
  { title: "عمل", color: "#1B4F72", accent: "rgba(27, 79, 114, .3)" },
  { title: "هوايات", color: "#20C997", accent: "rgba(32, 201, 151,.3)" },
];

//   {
//     id: 1,
//     title: "المهمة الأولى",
//     description: "مجرد نص",
//     creationTime: new Date().toLocaleString(),
//     endingTime: "",
//     type: "شخصى",
//     isComplated: false,
//   },
//   {
//     id: 2,
//     title: "المهمة الثانية",
//     description: "مجرد نص",
//     creationTime: new Date().toLocaleString(),
//     endingTime: "",
//     type: "عمل",
//     isComplated: true,
//   },
//   {
//     id: 3,
//     title: "المهمة الثالثة",
//     description: "مجرد نص",
//     creationTime: new Date().toLocaleString(),
//     endingTime: "",
//     type: "هوايات",
//     isComplated: true,
//   },
// ];

function TodoListApp() {
  const [_, setSearchParams] = useSearchParams();
  // GET ALL SAVED TO DOS FROM LOCAL STORAGE & SET SEARCH PARAMS TO EMPY {}
  const [todos, setTodos] = useState(() => {
    setSearchParams({});
    return JSON.parse(localStorage.getItem("todos")) ?? [];
  });

  // FUNCTION TO CAN ADD TO TO DOS STATUS WITHOUT USING SETTODOS METHOD
  function handleAddingTodo(toToObj) {
    setTodos([...todos, toToObj]);
  }
  return (
    // APP WHITE CONTAINER
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "white",
        minHeight: "60vh",
        minWidth: "70vh",
        maxWidth: "50vh !important",
        padding: "1rem 2rem !important",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TABS CONTEXT WHO PASSES BASIC AND TYPED OBJECTS */}
      <TabsContext.Provider
        value={{
          basicTabsObjects,
          typedTabsObjects,
        }}
      >
        {/* TODOS CONTEXT WHO PASSES TODOS AND IT'S FUNCTIONALITY */}
        <TodosContext.Provider
          value={{
            todos,
            setTodos,
            handleAddingTodo,
          }}
        >
          <TodoHeader />
          <TodoBody />
          <TodoFooter />
        </TodosContext.Provider>
      </TabsContext.Provider>
    </Container>
  );
}

export default TodoListApp;
