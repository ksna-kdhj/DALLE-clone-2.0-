import React from 'react'
import{BrowserRouter,Link,Route,Routes} from 'react-router-dom'
import {logo} from './assets'
import {Home,CreatePost} from './pages'
const App = () => {
  return (
    <BrowserRouter>
    <header className='z-20 header sticky top-0 shadow-md w-full flex justify-between
     items-center bg-white sm:px-8 px-4 py-4 border-b bg-opacity-70
      border-b-[#e6ebf4] border-opacity-0
     hover:border-opacity-100'>
      <Link to="/">
        <img src={logo} alt="logo" className='transition ease-in-out delay-250 w-28 object-contain hover:scale-105 hover:shadow-lg'/>
      </Link>
      <Link to="/create-post" className='transition ease-in-out delay-250 font-inter font-medium bg-[#0049B7]
      text-white px-4 py-2 rounded-md hover:scale-105 hover:bg-white hover:shadow-lg hover:text-[#0049B7]'>
        Create
      </Link>
    </header>
    <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App