import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import MusicPage from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <div>
        <MusicPage />
      </div>
    </Provider>
  );
}

export default App;
