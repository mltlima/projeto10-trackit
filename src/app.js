import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContext from './userContext'
import { useState } from "react";
import Login from './login'
import SignUp from './signUp'
import Today from './today'
import Habits from './habits'
import History from './history'

export default function App() {
    const [user, setUser] = useState({})
    return(
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>  
                <Routes>
                    <Route path='/' element={<Login/>}></Route>;  
                    <Route path='/signUp' element={<SignUp/>}></Route>;
                    <Route path='/today' element={<Today/>}></Route>; 
                    <Route path='/habits' element={<Habits/>}></Route>; 
                    <Route path='/history' element={<History/>}></Route>;   
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}