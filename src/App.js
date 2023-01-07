import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginIndex from './components/login';
import SingUpIndex from './components/singUp/singUpIndex';
import HomePage from './components/task/home';
import Protected from './protectedRoutes/routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SingUpIndex />} />
          <Route path='/' element={<LoginIndex />} />
          <Route path='/home' element={<Protected Component={HomePage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
