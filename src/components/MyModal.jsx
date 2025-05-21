// MUI
import { TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// REACT
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
// CONTEXT
import { TodosContext } from "../contexts/TodosContext";

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

function MyModal({
  type,
  todo,
  actionBtnTitle,
  isOpen,
  setIsOpen,
  toDoDetails,
  setToDoDetails,
}) {
  const { todos, setTodos, handleAddingTodo } = useContext(TodosContext);
  const isReady =
    [toDoDetails.title, toDoDetails.description, toDoDetails.type].filter(
      (ele) => ele.length > 1
    ).length >= 3
      ? false
      : true;

  const handleOnClick =
    type === "add"
      ? () => {
          const todo = {
            id: uuidv4(), // GENERATE A RANDOM ID
            ...toDoDetails,
            creationTime: new Date().toLocaleString(),
            endingTime: "",
            isComplated: false,
            all: "الكل",
          };

          // PASSING A NEW TODO OBJECT TO FUNCTIN TO ADDING IT TO TODOS
          handleAddingTodo(todo);

          // Closing the modal
          setIsOpen(false);

          // ADDING TODOS TO LOCAL STORAGE
          localStorage.setItem("todos", JSON.stringify([...todos, todo]));

          // EMPTY THE TODO DETAILS SATE
          setToDoDetails({
            title: "",
            description: "",
            type: "",
          });
        }
      : () => {
          const newTodosObjects = todos.map((obj) =>
            obj.id === todo.id
              ? {
                  ...obj,
                  title: toDoDetails.title,
                  description: toDoDetails.description,
                  type: toDoDetails.type,
                }
              : obj
          );
          setTodos(newTodosObjects);
          // Update to dos in local storage
          localStorage.setItem("todos", JSON.stringify(newTodosObjects));
          setToDoDetails({ title: "", description: "", type: "" });
          setIsOpen(false);
        };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
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
            value={toDoDetails.title}
            onChange={(e) =>
              setToDoDetails({ ...toDoDetails, title: e.target.value })
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
            value={toDoDetails.description}
            onChange={(e) =>
              setToDoDetails({ ...toDoDetails, description: e.target.value })
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
            value={toDoDetails.type}
            onChange={(e) =>
              setToDoDetails({ ...toDoDetails, type: e.target.value })
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
            onClick={handleOnClick}
            disabled={isReady}
          >
            {actionBtnTitle}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}

export default MyModal;
