import "./App.css";
import RandomSizedDivs from "./components/RandomSizedDivs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostEditor from "./components/PostEditor";
import { UserProvider } from "./contexts/UserContext";
import HackyLogin from "./components/HackyLogin";
import HackyListPost from "./components/HackyListPost";

function App() {
  return (
    <div className="App bg-background">
      <UserProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HackyListPost />
                </>
              }
            ></Route>
            <Route
              path="/about"
              element={<RandomSizedDivs count={360} />}
            ></Route>
            <Route
              path="/post"
              element={
                <>
                  <PostEditor />
                </>
              }
            ></Route>
            <Route path="/login" element={<HackyLogin />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
