// MUI
import { Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// REACT
import { useState } from "react";
// Context
import { useTodos } from "../contexts/TodosContext";
import { useTabs } from "../contexts/TabsContext";
import MyModal from "./MyModal";
import { useMyAlert } from "../contexts/MyAlertContext";

// Icons Style
const iconsStyle = {
  padding: ".4rem",
  borderRadius: "50%",
  fontSize: "2rem",
  cursor: "pointer",
};

function Todo({ todo }) {
  const [deleteTodo, setDeleteTodo] = useState(false); // 2
  const { todos, setTodos } = useTodos();
  const [isOpen, setIsOpen] = useState(false);
  const [toDoDetails, setToDoDetails] = useState({
    title: "",
    description: "",
    type: "",
  });
  const { handleMyAlertOnEvent } = useMyAlert();

  // BRING & COMPAIN BASIC AND TYPED OBJECT FROM TABS CONTEXT TO EXTRACT COLORS
  const { basicTabsObjects, typedTabsObjects } = useTabs();
  const [_, green, yellow, ...other] = [
    ...basicTabsObjects,
    ...typedTabsObjects,
  ].filter((color) => color);

  // Functions
  function handleIsComplated() {
    const newTodosObjects = todos.map((obj) =>
      obj.id === todo.id ? { ...obj, isComplated: !obj.isComplated } : obj
    );
    setTodos(newTodosObjects);
    // Update to dos in local storage
    localStorage.setItem("todos", JSON.stringify(newTodosObjects));
    // Show my alert
    handleMyAlertOnEvent(todo.isComplated ? "تم إلغاء الإنجاز" : "تم الإنجاز");
  }

  function handleOnClickDelete() {
    const newTodosObjects = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodosObjects);
    // Update to dos in local storage
    localStorage.setItem("todos", JSON.stringify(newTodosObjects));
    // Show my alert
    handleMyAlertOnEvent("تم حذف المهمة بنجاح");
  }

  // RENDER THE ADDING TODO DATE AS STRING
  const date = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(todo.creationTime));

  return (
    <>
      {/* UPDATE TODO MODAL */}
      <MyModal
        type="edit"
        todo={todo}
        actionBtnTitle="تعديل"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toDoDetails={toDoDetails}
        setToDoDetails={setToDoDetails}
      />
      {/* UPDATE TODO MODAL */}
      {/* DELET TODO MODAL FOR APPROVAL*/}
      <Dialog
        open={deleteTodo}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>هل أنت متاكد من رغبتك فى حذف هذه المهمة؟</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            لا يمكنك التراجع عن الحذف فى حال إختيار زر (الحذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTodo(false)}>إغلاق</Button>
          <Button
            onClick={handleOnClickDelete}
            variant="outlined"
            color="error"
            sx={{}}
          >
            نعم. قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* DELET TODO MODAL FOR APPROVAL*/}
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
              sx={{
                textAlign: "right",
                alignSelf: "self-start",
                display: "flex",
                alignItems: "center",
                position: "relative",
                textDecoration: `${
                  todo.isComplated ? "line-through" : "normal"
                }`,
              }}
            >
              <span className="absolute w-24 right-[120%] bottom-[-110%] text-[10px]">
                {date}
              </span>
              <Tooltip title={`${todo.type}`}>
                <span
                  className={`block w-2 h-2  rounded-full absolute right-[-10px] top-[-15px] cursor-pointer `}
                  style={{
                    background: `${
                      other.filter((o) => o.title == todo.type)[0]?.color
                    }`,
                  }}
                ></span>
              </Tooltip>
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
                textDecoration: `${
                  todo.isComplated ? "line-through" : "normal"
                }`,
              }}
            >
              {todo.description}
            </Typography>
          </Grid>
          {/* Action */}
          <Grid
            size={4}
            sx={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}
          >
            <Tooltip title="تم">
              <DoneIcon
                sx={{
                  border: `2px solid${green.color}`,
                  color: `${todo.isComplated ? "white" : green.color}`,
                  background: `${todo.isComplated ? green.color : "white"}`,
                  ...iconsStyle,
                  "&:hover": {
                    opacity: ".5",
                  },
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
                onClick={() => {
                  setToDoDetails({
                    title: todo.title,
                    description: todo.description,
                    type: todo.type,
                  });
                  setIsOpen(true);
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
                onClick={() => setDeleteTodo(true)}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Todo;
