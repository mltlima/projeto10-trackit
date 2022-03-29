import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login'
import SignUp from './signUp'


export default function App() {
    return(
        <BrowserRouter>  
            <Routes>
                <Route path='/' element={<Login/>}></Route>;  
                <Route path='/signUp' element={<SignUp/>}></Route>;  
            </Routes>
        </BrowserRouter>
    )
}