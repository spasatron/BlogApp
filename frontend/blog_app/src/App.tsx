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
                <div>
                  <h1>Home</h1>
                  <HackyListPost />
                </div>
              }
            ></Route>
            <Route
              path="/about"
              element={<RandomSizedDivs count={360} />}
            ></Route>
            <Route
              path="/post"
              element={
                <div>
                  <p>Create a new Post!</p>
                  <div>
                    <PostEditor />
                  </div>
                </div>
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
