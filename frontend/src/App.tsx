import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MusicPage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CreateMusic from "./pages/CreateMusic";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route element={<MusicPage />} path="/"/>
            <Route element={<CreateMusic />} path="/add-music"/>

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
