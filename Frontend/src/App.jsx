import {BrowserRouter,Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage'
import GeminiInterviewerBot from './pages/GeminiInterviewerBot'
import LoginPage from './pages/LoginPage'
import TurnersInterviewPage from './pages/TurnersInterviewPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/GeminiInterviewerBot" element={<GeminiInterviewerBot />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/TurnersInterviewPage" element={<TurnersInterviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
