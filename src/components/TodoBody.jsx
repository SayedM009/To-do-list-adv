// MUI
import { Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TabsContext } from "../contexts/TabsContext";
// REACT
import { useContext } from "react";

function TodoBody({ toDoObject }) {
  if (Object.keys(toDoObject).length === 0)
    return <h1 className="text-black my-10">لا يوجد مهام بعد</h1>;
  const toDoElements = toDoObject?.map((todo) => (
    <Todo key={todo.creationTime} todo={todo} />
  ));
  return <Box component="section">{toDoElements}</Box>;
}

function Todo({ todo }) {
  const colors = useContext(TabsContext);
  const [blue, green, yellow, ...other] = colors.filter((color) => color);

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
          background: `${other.filter((o) => o.title == todo.type)[0]?.accent}`,
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
            sx={{ textAlign: "right", display: "block", alignSelf: "start" }}
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
                color: `${green.color}`,
                ...iconsStyle,
              }}
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
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoBody;
