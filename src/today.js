import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import styled from "styled-components";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { HabitsDiv, MyHabits, HabitsBox } from "./habits";

export default function Today() {
    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    let date = dayjs();
    date.format("dddd, DD/MM");
    date = date.format("dddd, DD/MM").charAt(0).toUpperCase() + date.format("dddd, DD/MM").slice(1);
    const {user, setUser} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [completedCounter, setCompletedCounter] = useState(0);
    const [totalHabits, setTotalHabits] = useState(0);

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", 
        {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        promise.then((response) => {
            //setUser({...user, todayHabits: response.data});
            setTodayHabits(...todayHabits, response.data);
            setTotalHabits(response.data.length);
            let habitsDone = 0;
            response.data.map((habit) => {
                if (habit.done) habitsDone++;
            });
            setCompletedCounter(habitsDone);
        }).catch((error) => console.log(error))
    }, []);
    
    function percentageCalculation() {
            const percentageCalculate = (completedCounter / totalHabits) * 100;
            setPercentage(Math.round(percentageCalculate));
            setUser({...user, updatedPercentage: Math.round(percentageCalculate)});
    } 

    useEffect(() => {
        percentageCalculation();
    }, [completedCounter]);

    return (
        <>
            <Header/>
                <HabitsDiv>
                    <MyHabits>
                        <h1>{date}</h1>
                        {todayHabits.length < 1 ? <p>"Nenhum hábito concluído ainda"</p> : <p className="green-text">{percentage}% dos hábitos concluídos</p>}
                    </MyHabits>
                    <MyHabits>
                        {todayHabits.map((habit) => <ShowTodayHabits habit={habit} completedCounter={completedCounter} 
                        setCompletedCounter={setCompletedCounter}/>)}
                    </MyHabits>
                </HabitsDiv>
            <Footer/>
        </>
    )
}

function ShowTodayHabits(props) {
    const {habit, completedCounter, setCompletedCounter} = props;
    const {user, setUser} = useContext(UserContext);
    const [selected, setSelected] = useState(false);

    function sendHabitDone() {
       
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`,{ }, 
        {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        promise.then(() => {   
            setSelected(true);
            setCompletedCounter(completedCounter + 1);
            habit.currentSequence++;
        }).catch((error) => console.log(error))
    }

    function removeHabitDone() {
        
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`,{ }, 
        {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        promise.then(() => {   
            setSelected(false);
            habit.done = false;
            setCompletedCounter(completedCounter - 1);
            habit.currentSequence--;
        }).catch((error) => console.log(error))
    }



    return (
        <HabitsBox>
            <h4>{habit.name}</h4>
            <p>Sequência atual: <span className={selected ? "green-text": null}>{habit.currentSequence} dias</span></p>
            <p>Seu recorde: <span className={habit.currentSequence === habit.highestSequence ? "green-text": null}>{habit.highestSequence} dias</span></p>
            {habit.done || selected ? <Selected><ion-icon onClick={removeHabitDone}  name="checkbox"></ion-icon></Selected> : 
            <Check><ion-icon onClick={sendHabitDone}  name="checkbox"></ion-icon></Check>}
        </HabitsBox>
    )
}

const Selected = styled.div`
    ion-icon {
        font-size: 80px;
        color: #8FC549;
    }
`

const Check = styled.div`
    ion-icon {
        font-size: 80px;
        color: #EBEBEB;
    }
`