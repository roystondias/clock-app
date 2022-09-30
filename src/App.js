import './App.css';
import 'antd/dist/antd.min.css';
import ClockTabs from './Components/ClockTabs/ClockTabs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div id="outer-container">
      <Router>
        <Routes>
          <Route path="/" element={<ClockTabs tabKey="1"></ClockTabs>}></Route>
        </Routes>
        <Routes>
          <Route path="/worldClock" element={<ClockTabs tabKey="2"></ClockTabs>}></Route>
        </Routes>
        <Routes>
          <Route path="/timer" element={<ClockTabs tabKey="3"></ClockTabs>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
