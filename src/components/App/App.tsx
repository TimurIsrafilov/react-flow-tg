import './App.css';
import Flow from '../Flow/Flow';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from '../../pages/profile/profilePage';
import { HOME, NUMBER, USER } from '../../utils/constants';
import Header from '../Header/Header';
import NotFound404 from '../../pages/not-found-404/not-found-404';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={HOME} element={<Flow />} />
        <Route path={`${USER}${NUMBER}`} element={<ProfilePage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
