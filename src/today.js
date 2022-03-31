import dayjs from "dayjs";
import { useContext } from "react";
import UserContext from "./userContext";
import styled from "styled-components";
import Header from "./header";
import Footer from "./footer";

export default function Today() {
    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    const date = dayjs();
    const {user, setUser} = useContext(UserContext)
    console.log(user.token);
    return (
        <>
            <Header/>
            <Test>
                <h1>{date.format("dddd, DD/MM")}</h1>
            </Test>
            <Footer/>
        </>
    )
}

const Test = styled.div`
    margin-top: 100px;
`