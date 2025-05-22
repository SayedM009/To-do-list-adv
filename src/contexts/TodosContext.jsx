import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";

const TodosContext = createContext({});

export function TodosProvider({ children }) {
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
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        handleAddingTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
// useTodos CUSTOME HOOK
export function useTodos() {
  return useContext(TodosContext);
}
