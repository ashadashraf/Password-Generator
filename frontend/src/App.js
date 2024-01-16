import './App.css';
import Base from './Components/Base';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ViewAll from './Components/ViewAll';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Base />} />
          <Route path='login' element={<Login />} />
          <Route path='viewall' element={<ViewAll />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
