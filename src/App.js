import AddTodo from "./components/addTodo.jsx";
import DisplayMortys from "./components/displayMortys.jsx";
import LazyLoaded from "./components/lazyLoaded.jsx";

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <hr />
      <h2>Queries</h2>
      {/* <LazyLoaded /> */}
      {/* <DisplayMortys /> */}
      <hr />
      <h2>Mutations</h2>
      <AddTodo />
    </div>
  );
}
