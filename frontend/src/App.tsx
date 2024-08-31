import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MusicPage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CreateMusic from "./pages/CreateMusic";
import styled from "@emotion/styled";
import GenresPage from "./pages/GenresPage";
import GenreMusicPage from "./pages/GenreMusicPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const Container = styled("div")`
  margin-top: 100px;
`;
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Container>
            <Routes>
              <Route element={<MusicPage />} path="/" />
              <Route element={<CreateMusic />} path="/add-music" />
              <Route element={<GenresPage />} path="/genres" />
              <Route path="/genres/:genre" element={<GenreMusicPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
