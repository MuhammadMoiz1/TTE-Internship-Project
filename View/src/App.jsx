import React,{useEffect,useState} from 'react';
import Navbar from './components/user/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/user/Pages/home/Home';
import Footer from './components/user/Footer/Footer'
import Models from './components/user/Pages/Models/Models';
import Defects from './components/user/Pages/Defects/Defects';
import AddModel from './components/admin/AddModel/AddModel';
import AddDefect from './components/admin/AddDefects/AddDefect';
import AdminNavBar from './components/admin/adminNavBar/AdminNavBar';
import AdminMain from './components/admin/AdminMain/AdminMain';
import AdminModels from './components/admin/AdminModels/AdminModels';
import AdminDefects from './components/admin/AdminDefects/AdminDefects';
import Login from './components/user/login/Login';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <div className='app'>
      
      
      <Routes>
        <Route path='/' element={
          <div className='app-nested'>
          <Navbar setAuth={setIsAuthenticated}/>
          <Home/>
          </div>
          }/>
          <Route path='/login' element={
          <div className='app-nested'>
          <Login setAuth={setIsAuthenticated} />
          </div>
          }/>
        <Route path='/models' element={
          <div className='app-nested'>
          <Navbar setAuth={setIsAuthenticated}/>
          <Models/>
          </div>
          }/>
        <Route path='/defects' element={
          <div className='app-nested'>
          <Navbar setAuth={setIsAuthenticated}/>
          <Defects/>
          </div>
          }/>
        <Route path='/admin'>
          <Route path='home' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AdminMain />
            </div>
          } />
          <Route path='models' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AdminModels />
            </div>
          } />
          <Route path='models/add' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddModel />
            </div>
          } />
          <Route path='models/edit' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddModel />
            </div>
          } />
          <Route path='defects' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AdminDefects />
            </div>
          } />
          <Route path='defects/add' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddDefect />
            </div>
          } />
          <Route path='defects/edit' element={
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddDefect/>
            </div>
          } />
        </Route>
        
      </Routes>
    <Footer/>  
    </div>
  )
}

export default App;
