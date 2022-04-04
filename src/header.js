import styled from "styled-components"
import { useContext, useEffect } from "react";
import UserContext from "./userContext";

export default function Header() {
    const {user, setUser} = useContext(UserContext)

    //Recover image in localStorage
    useEffect(() => {
        if (window.localStorage.getItem("image") !== null) {
            setUser({...user, image: window.localStorage.getItem("image")});
        }
    },[])

    return (
        <HeaderStyle>
            <p>TrackIt</p>
            <img src={user.image} alt="profile image"/>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #126BA5;

    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 39px;
    color: #FFFFFF;

    img {
        width: 51px;
        height: 51px;
        border-radius: 99px;
        margin-right: 18px;
    }

    p{
        margin-left: 18px;
    }
`