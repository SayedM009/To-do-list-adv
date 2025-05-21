// MUI
import Box from "@mui/material/Box";
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
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Tooltip, Typography } from "@mui/material";
import { TextField } from "@mui/material";

// REACT
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { TabsContext } from "../contexts/TabsContext";
import { useSearchParams } from "react-router";

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
};

// Icons Style
const iconsStyle = {
  padding: ".4rem",
  borderRadius: "50%",
  fontSize: "2rem",
  cursor: "pointer",
};

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
  return <Box component="section">{toDoElements}</Box>;
}

function Todo({ todo }) {
  const [deleteTodo, setDeleteTodo] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  const [toDoInfo, setToDoInfo] = useState({
    title: "",
    description: "",
    type: "",
  });

  // BRING & COMPAIN BASIC AND TYPED OBJECT FROM TABS CONTEXT TO EXTRACT COLORS
  const { basicTabsObjects, typedTabsObjects } = useContext(TabsContext);
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
  }

  function handleOnClickDelete() {
    const newTodosObjects = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodosObjects);
    // Update to dos in local storage
    localStorage.setItem("todos", JSON.stringify(newTodosObjects));
  }

  function handleOnClickUpdateTodo() {
    const newTodosObjects = todos.map((obj) =>
      obj.id === todo.id
        ? {
            ...obj,
            title: toDoInfo.title,
            description: toDoInfo.description,
            type: toDoInfo.type,
          }
        : obj
    );
    setTodos(newTodosObjects);
    // Update to dos in local storage
    localStorage.setItem("todos", JSON.stringify(newTodosObjects));
    setToDoInfo({ title: "", description: "", type: "" });
    setUpdateTodo(false);
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updateTodo}
        onClose={() => setUpdateTodo(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={updateTodo}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              تعديل المهمة
            </Typography>
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              fullWidth
              dir="rtl"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
                "& .MuiInputLabel-root": {
                  right: 30,
                  left: "auto",
                  textAlign: "right",
                  transformOrigin: "top right",
                  backgroundColor: "white",
                  padding: "0 4px",
                  zIndex: 1, // important so it appears above the border
                },
                "& .MuiInputLabel-shrink": {
                  backgroundColor: "white",
                  padding: "0 4px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  legend: {
                    width: 0, // hides the original legend that causes the white cut
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              value={toDoInfo.title}
              onChange={(e) =>
                setToDoInfo({ ...toDoInfo, title: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="تفاصيل المهمة"
              variant="outlined"
              fullWidth
              dir="rtl"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
                "& .MuiInputLabel-root": {
                  right: 30,
                  left: "auto",
                  textAlign: "right",
                  transformOrigin: "top right",
                  backgroundColor: "white",
                  padding: "0 4px",
                  zIndex: 1, // important so it appears above the border
                },
                "& .MuiInputLabel-shrink": {
                  backgroundColor: "white",
                  padding: "0 4px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  legend: {
                    width: 0, // hides the original legend that causes the white cut
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              value={toDoInfo.description}
              onChange={(e) =>
                setToDoInfo({ ...toDoInfo, description: e.target.value })
              }
            />

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
              value={toDoInfo.type}
              onChange={(e) =>
                setToDoInfo({ ...toDoInfo, type: e.target.value })
              }
            >
              <FormControlLabel
                value="شخصى"
                control={<Radio sx={{ paddingRight: "0" }} />}
                label="شخصى"
                sx={{ margin: "0" }}
              />
              <FormControlLabel
                value="عمل"
                control={<Radio sx={{ paddingRight: "0" }} />}
                label="عمل"
                sx={{ margin: "0" }}
              />
              <FormControlLabel
                value="هوايات"
                control={<Radio sx={{ paddingRight: "0" }} />}
                label="هوايات"
                sx={{ margin: "0" }}
              />
            </RadioGroup>

            <Button
              sx={{ width: "100%" }}
              variant="contained"
              size="large"
              onClick={handleOnClickUpdateTodo}
            >
              تعديل
            </Button>
          </Box>
        </Fade>
      </Modal>
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
              sx={{
                textAlign: "right",
                alignSelf: "self-start",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <span className="absolute w-50 right-[120%] bottom-[-110%] text-[10px]">
                {date}
              </span>
              <Tooltip title={`${todo.type}`}>
                <span
                  className={`block w-2 h-2  rounded-full absolute right-[-10px] top-[-15px] cursor-pointer `}
                  style={{
                    background: `${
                      other.filter((o) => o.title == todo.type)[0].color
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
                  setToDoInfo({
                    title: todo.title,
                    description: todo.description,
                    type: todo.type,
                  });
                  setUpdateTodo(true);
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

export default TodoBody;
