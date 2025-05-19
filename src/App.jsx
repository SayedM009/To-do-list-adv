import "./App.css";
import TodoListApp from "./components/TodoListApp";
import { TabsContext } from "./contexts/TabsContext";

const tabsObjects = [
  { title: "الكل", color: "#007BFF" },
  { title: "منجز", color: "#28A745" },
  { title: "غير منجز", color: "#FFC107" },
  { title: "شخصى", color: "#B39DDB" },
  { title: "عمل", color: "#1B4F72" },
  { title: "هوايات", color: "#20C997" },
];

function App() {
  return (
    <TabsContext.Provider value={tabsObjects}>
      <TodoListApp />
    </TabsContext.Provider>
  );
}

export default App;
