// MUI
import { Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TabsContext } from "../contexts/TabsContext";
const toDoObject = [
  {
    title: "المهمة الأولى",
    description: "",
    creationTime: new Date().toLocaleString(),
    endingTime: "",
    type: "شخصي",
    status: false,
  },
  {
    title: "المهمة الثانية",
    description: "",
    creationTime: new Date().toLocaleString(),
    endingTime: "",
    type: "عمل",
    status: true,
  },
  {
    title: "المهمة الثالثة",
    description: "",
    creationTime: new Date().toLocaleString(),
    endingTime: "",
    type: "هوايات",
    status: true,
  },
];

function TodoBody() {
  const toDoElements = toDoObject.map((todo) => (
    <Todo key={todo.creationTime} todo={todo} />
  ));
  return <Box component="section">{toDoElements}</Box>;
}

function Todo({ todo }) {
  const colors = useContext(TabsContext);
  const [blue, green, yellow, purple, darkBlue, lightGreen] = colors.filter(
    (color) => color
  );

  const iconsStyle = {
    color: "white",
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
          background: `${todo.status ? green.color : yellow.color}`,
          borderRadius: "1rem",
        }}
      ></Box>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100px",
          background: "#EEE",
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
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            {todo.title}
          </Typography>
        </Grid>
        {/* Action */}
        <Grid size={4} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Tooltip title="Done">
            <DoneIcon
              sx={{
                background: `${green.color}`,
                ...iconsStyle,
              }}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <EditIcon
              sx={{
                background: `${yellow.color}`,
                ...iconsStyle,
              }}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <DeleteIcon
              sx={{
                background: "red",
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
