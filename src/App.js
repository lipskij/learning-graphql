import DisplayMortys from "./components/displayMortys";
import LazyLoaded from "./components/lazyLoaded";

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <LazyLoaded />
      <DisplayMortys />
    </div>
  );
}
