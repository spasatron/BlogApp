import "./App.css";
import RandomSizedDivs from "./components/RandomSizedDivs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostEditor from "./components/PostEditor";

function App() {
  return (
    <div className="App bg-background">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<div>Home</div>}></Route>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
