import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserList from './Pages/UserList/UserList';
import UserDetail from './Pages/UserDetail/UserDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<UserList/>} />
        <Route path="/user/:userId" element={<UserDetail/>} />
      </Routes>
    </>
  );
}

export default App;
