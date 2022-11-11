import logo from './logo.svg';
import './App.css';
import { Landing } from './components/landing/Landing';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
            <Router>
      <Landing />
      </Router>
    </div>
  );
}

export default App;
