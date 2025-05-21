// MUI
import Box from "@mui/material/Box";
// REACT
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { useSearchParams } from "react-router";
// Components
import Todo from "./Todo";

function TodoBody() {
  const { todos } = useContext(TodosContext);
  const [searchParams] = useSearchParams();

  // FILTER TODOS BASED ON CLICK TABS
  const isCompletedParamRaw = searchParams.get("isComplated");
  const typeParamRaw = searchParams.get("type");
  const isCompletedParam =
    isCompletedParamRaw === "null" ? null : isCompletedParamRaw;
  const typeParam = typeParamRaw === "null" ? null : typeParamRaw;

  const filteredTasks = todos.filter((todo) => {
    const matchesCompletion =
      isCompletedParam === null ||
      (isCompletedParam === "true" && todo.isComplated) ||
      (isCompletedParam === "false" && !todo.isComplated);

    const matchesType = typeParam === null || todo.type === typeParam;

    return matchesCompletion && matchesType;
  });

  // IF THERE ARE NO TODOS
  if (Object.keys(filteredTasks).length === 0)
    return (
      <h2 className=" my-10 text-blue-950 font-medium">
        أضف بعض المهمام لرويتها هنا.
      </h2>
    );

  // RENDER FILTERED TODOS
  const toDoElements = filteredTasks?.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });
  return (
    <Box
      component="section"
      sx={{
        maxHeight: "40vh",
        overflowY: `${todos.lenght > 3 ? "scroll" : "none"}`,
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#a0a0a0",
        },

        // For Firefox
        scrollbarWidth: "thin",
        scrollbarColor: "#c1c1c1 #f1f1f1",
      }}
    >
      {toDoElements}
    </Box>
  );
}

export default TodoBody;
