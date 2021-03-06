import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import UserContext from "./userContext";
import logo from './assets/logo.svg';


export {
    LoginDiv,
    InputForm
}

export default function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();


    //Recover token in localStorage
    useEffect(() => {
        if (window.localStorage.getItem("token") !== null) {
            setUser({...user, token: window.localStorage.getItem("token")});
            navigate('/today');
        }
    },[])



    function submitLogin(event) {
        event.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", (userData));            
            promise.then((response) => {
                //Save token in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("image", response.data.image);
                setUser({...user, token: response.data.token});
                setUser({...user, image: response.data.image});
                navigate('/today');
            }).catch((error) => {
                console.log(error);
                setUserData({
                    email: '',
                    name: '',
                    image: '',
                    password: '',
                });
                setLoading(false);
                alert('Erro ao logar usuário');
            });
            setLoading(true);
        }

      
    return(
        <LoginDiv>
            <img src={logo} alt="TrackIt logo"/>
            <InputForm onSubmit={submitLogin}>
                <input type="email" placeholder="email" onChange={(e) => setUserData({...userData, email: e.target.value})} disabled={loading} required/>
                <input type="password" placeholder="senha" onChange={(e) => setUserData({...userData, password: e.target.value})} disabled={loading} required/>
                <button type="submit">{loading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={50} width={80}/> : <p>Entrar</p>}</button>
            </InputForm>
            <Link to="/signUp"><h1>Não tem uma conta? Cadastre-se!</h1></Link>
        </LoginDiv>
    )
}


const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin: 68px 0 32px;
    }

    h1 {
        margin-top: 25px;
        font-size: 14px;
    }
`

const InputForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;

    input {
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        font-size: 20px;
        height: 45px;
        margin-bottom: 6px;
    }

    input::placeholder{
        color: #DBDBDB;
    }

    button {
        height: 45px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
    }

`