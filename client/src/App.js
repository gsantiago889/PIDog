import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Home from "./components/Home";
import CreateDog from "./components/CreateDog";
import DogDetail from "./components/DetailDog";

function App() {
  return (
    <div className="App">
      <Route path="/home" component={Nav} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/dog/:id" component={DogDetail} />
      <Route exact path="/dog" component={CreateDog} />
    </div>
  );
}

export default App;
