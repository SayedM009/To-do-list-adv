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
import { useContext, useState } from "react";
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

function TodoFooter() {
  const { todos, handleAddingTodo } = useContext(TodosContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toDoDetails, setToDoDetails] = useState({
    title: "",
    description: "",
    type: "",
  });

  // FUNCTIONS
  function handleOnClickAddingNewToDo() {
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
    handleClose();

    // ADDING TODOS TO LOCAL STORAGE
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              المهمة
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
              onClick={handleOnClickAddingNewToDo}
              sx={{ width: "100%" }}
              variant="contained"
              size="large"
            >
              إضافة
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Button
        onClick={handleOpen}
        sx={{ width: "100%" }}
        variant="contained"
        size="large"
      >
        أضف من هنا
      </Button>
    </div>
  );
}

export default TodoFooter;
