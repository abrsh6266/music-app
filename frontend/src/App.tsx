import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Provider store={store}>
      <div>
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
