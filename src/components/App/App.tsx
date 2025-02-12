import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Flow from '../Flow/Flow';
import ProfilePage from '../../pages/profile/profilePage';
import NotFound404 from '../../pages/not-found-404/not-found-404';

import { HOME, NUMBER, USER } from '../../utils/constants';

function App(): React.JSX.Element {
  return (
    <div className="app">
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
