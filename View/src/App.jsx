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
import HomeDashboard from './components/user/Dashboard/pages/Home/Home';
import FileUpload from './components/user/Dashboard/pages/FileUpload/FileUpload'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <>
      
      
      <Routes>
        <Route path='/' element={
          <div className='app'>
          <div className='app-nested'>
          <Navbar setAuth={setIsAuthenticated}/>
          <Home/>
          </div>
          <Footer/> 
          </div>
          }/>
          <Route path='/login' element={
          <div className='app'> 
          <div className='app-nested'>
          <Login setAuth={setIsAuthenticated} />
          </div>
          <Footer/> 
          </div> 
          }/>
        <Route path='/models' element={
          <div className='app'> 
          <div className='app-nested'>
          <Navbar setAuth={setIsAuthenticated}/>
          <Models/>
          </div>
          <Footer/> 
          </div>
          }/>
        <Route path='/defects' element={
          <div className='app'> 
          <div className='app-nested'>
          <Navbar setAuth={setIsAuthenticated}/>
          <Defects/>
          </div>
          <Footer/> 
          </div>
          }/>
          <Route path='/dashboard' element={
          <div className='dashboard-index'> 
            <div className='dashboard-app'>
          <HomeDashboard/>
          </div> 
          </div>
          }/>
          <Route path='/dashboard/fileupload' element={
          <div className='dashboard-index'> 
            <div className='dashboard-app'>
          <FileUpload />
          </div> 
          </div>
          }/>
          
        <Route path='/admin'>

          <Route path='home' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AdminMain />
            </div>
            <Footer/> 
            </div>
          } />
          <Route path='models' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AdminModels />
            </div>
            <Footer/> 
            </div>
          } />
          <Route path='models/add' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddModel />
            </div>
            <Footer/> 
            </div>
          } />
          <Route path='models/edit' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddModel />
            </div>
            <Footer/> 
            </div>
          } />
          <Route path='defects' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AdminDefects />
            </div>
            <Footer/> 
            </div>
          } />
          <Route path='defects/add' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddDefect />
            </div>
            <Footer/> 
            </div>
          } />
          <Route path='defects/edit' element={
            <div className='app'> 
            <div className='app-nested-admin'>
              <AdminNavBar setAuth={setIsAuthenticated}/>
              <AddDefect/>
            </div>
            <Footer/> 
            </div>
          } />
        </Route>
        
      </Routes>
     
    </>
  )
}

export default App;
