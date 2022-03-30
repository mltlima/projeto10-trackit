import dayjs from "dayjs";
import { useContext } from "react";
import Header from "./header";
import UserContext from "./userContext";

export default function Today() {
    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    const date = dayjs();
    const {user, setUser} = useContext(UserContext)
    console.log(user.token);
    return (
        <>
            <Header/>
            <div>
                <h1>{date.format("dddd, DD/MM")}</h1>
            </div>
        </>
    )
}