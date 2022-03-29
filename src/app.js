import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login'


export default function App() {
    return(
        <BrowserRouter>  
            <Routes>
                <Route path='/' element={<Login/>}></Route>  
            </Routes>
        </BrowserRouter>
    )
}