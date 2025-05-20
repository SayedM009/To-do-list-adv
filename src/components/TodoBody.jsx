// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Typography } from "@mui/material";
import "toastify-js/src/toastify.css";

// REACT
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { TabsContext } from "../contexts/TabsContext";

function TodoBody() {
  const { todos } = useContext(TodosContext);

  // If there are not to dos
  if (Object.keys(todos).length === 0)
    return (
      <h2 className=" my-10 text-blue-950 font-medium">
        أضف بعض المهمام لرويتها هنا.
      </h2>
    );

  // Render to dos
  const toDoElements = todos?.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });
  return <Box component="section">{toDoElements}</Box>;
}

function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  // Grap the colors of tabs from their context (TabsContext)
  const { basicTabsObjects } = useContext(TabsContext);
  // const [blue, green, yellow, ...other] = colors.filter((color) => color);
  const [_, green, yellow] = basicTabsObjects.filter((color) => color);

  // Functions
  function handleIsComplated() {
    const newTodosObjects = todos.map((obj) =>
      obj.id === todo.id ? { ...obj, isComplated: !obj.isComplated } : obj
    );
    setTodos(newTodosObjects);
  }

  function handleOnClickDelete() {
    const newTodosObjects = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodosObjects);
  }

  // Icons Style
  const iconsStyle = {
    padding: ".4rem",
    borderRadius: "50%",
    fontSize: "2rem",
    cursor: "pointer",
  };

  return (
    <Box
      sx={{
        color: "black",
        paddingRight: "0",
        gap: ".5rem",
        display: "flex",
        marginBottom: ".75rem",
      }}
    >
      <Box
        sx={{
          width: "5px",
          height: "100px",
          background: `${todo.isComplated ? green.color : yellow.color}`,
          borderRadius: "1rem",
        }}
      ></Box>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100px",
          // background: `${other.filter((o) => o.title == todo.type)[0]?.accent}`,
          background: "#3333330f",
          borderRadius: ".3rem",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          paddingRight: "1rem",
          paddingLeft: "1rem",
        }}
      >
        {/* To do Title */}
        <Grid size={8}>
          <Typography
            variant="h6"
            sx={{ textAlign: "right", alignSelf: "self-start" }}
          >
            {todo.title}
          </Typography>
          <Typography
            variant="p"
            sx={{
              textAlign: "right",
              display: "block",
              alignSelf: "start",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {todo.description}
          </Typography>
        </Grid>
        {/* Action */}
        <Grid size={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Tooltip title="تم">
            <DoneIcon
              sx={{
                border: `2px solid${green.color}`,
                color: `${todo.isComplated ? "white" : green.color}`,
                background: `${todo.isComplated ? green.color : "white"}`,
                ...iconsStyle,
              }}
              onClick={handleIsComplated}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <EditIcon
              sx={{
                border: `2px solid ${yellow.color}`,
                color: `${yellow.color}`,
                ...iconsStyle,
              }}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <DeleteIcon
              color="dangar"
              sx={{
                border: "2px solid red",
                color: "red",
                ...iconsStyle,
              }}
              onClick={handleOnClickDelete}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoBody;
