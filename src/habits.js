import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "./userContext";
import styled from "styled-components";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

const weekDays = [
    {
      "id": 0,
      "day": "D"
    },
    {
      "id": 1,
      "day": "S"
    },
    {
      "id": 2,
      "day": "T"
    },
    {
      "id": 3,
      "day": "Q"
    },
    {
      "id": 4,
      "day": "Q"
    },
    {
      "id": 5,
      "day": "S"
    },
    {
      "id": 6,
      "day": "S"
    }
  ];

export default function Habits() {
    const [createHabit, setCreateHabit] = useState(false);
    const [habits, setHabits] = useState([]);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        promise.then((response) => {
            setUser({...user, habits: response.data});
            setHabits(...habits, response.data);
        }).catch((error) => console.log(error))
    }, []);

    return (
        <>
            <Header/>
            <HabitsDiv>
                <MyHabits>
                    <header>
                        <p>Meus hábitos</p>
                        <ion-icon onClick={() => setCreateHabit(true)} name="add-circle"></ion-icon>
                    </header>
                </MyHabits>
                <MyHabits>
                    {createHabit ? <CreateNewHabit setCreateHabit={setCreateHabit} habits={habits} setHabits={setHabits}/> : null}
                </MyHabits>
                <MyHabits>
                    {habits.map((habit) => <ShowHabits habit={habit}/>)}
                    {!habits.length ? <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1> : 
                    null}
                </MyHabits>
            </HabitsDiv>
            <Footer/>
        </>
    )
}

function CreateNewHabit(props) {
    const {setCreateHabit, setHabits, habits} = props;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState();
    const {user, setUser} = useContext(UserContext);
    const [newHabit, setNewHabit] = useState({
        name: "",
        days: [],
    });

    function submitHabit() {
        console.log("submitHabit");
        setValue(() => "");
        const habitToSubmit = {
            name: newHabit?.name,
            days: newHabit?.days,
        }

        setHabits([...habits, habitToSubmit]);

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        habitToSubmit,
        {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });
        promise.then((response) => {
            setUser({...user, habits: response.data});
        }).catch((error) => console.log(error))
    }
    

    return (
        <HabitsBox>
            <input type={"text"}  value={value} placeholder={"nome do hábito"} disabled={loading} required 
            onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}/>
            <ul>
                {weekDays.map((day) => <DayBox day={day} newHabit={newHabit} setNewHabit={setNewHabit}></DayBox>)}    
            </ul>
            <Buttons>
                <button className="cancel" onClick={() => setCreateHabit(false)}>Cancelar</button>
                <button onClick={() => submitHabit()}>{loading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={10} width={5}/> : <p>Salvar</p>}</button>
            </Buttons>         
        </HabitsBox>
    )
}

function DayBox(props) {
    const {newHabit, setNewHabit, day} = props;
    const [selected, setSelected] = useState(false);
    function selectDay() {
        if (selected) {
            setNewHabit({...newHabit, days: newHabit.days.filter(dayId => dayId !== day.id)});
            setSelected(false);
        } else {
            setSelected(true);
            setNewHabit({...newHabit, days: [...newHabit.days, day.id]}); 
        }
    }

    return(
        <li className={selected ? "selected" : null} key={day.id} onClick={() => selectDay()}>
            {day.day}
        </li>
    )
}

function ShowHabits(props) {
    const {habit} = props;
    const {user, setUser} = useContext(UserContext);
    return (
                
        <HabitsBox>
            <div>{habit.name}</div>
            <ul>  
                {weekDays.map((day) => 
                    <li className={habit.days?.includes(day.id) ? "selected" : null} key={day.id}>{day.day}</li>
                )}
            </ul> 
        </HabitsBox>
    )
}

const HabitsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 130px;
`

const MyHabits = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;

    li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 30px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        color: #DBDBDB;
        margin-right: 4px;
    }

    .selected {
        background: #CFCFCF;
        color: #FFFFFF;
    }

    h1 {
        margin-top: 28px;
        line-height: 22px;
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        color: #126BA5;
        font-size: 28px;
    }

    ion-icon {
        color: #52B6FF;
        font-size: 35px;
    }
`

const HabitsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    background-color: #FFFFFF;
    width: 100%;
    margin-top: 28px;
    padding: 18px;
    
    ul {
        display: flex;
        flex-direction: row;
    }

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
        border-radius: 4.6px;
        font-size: 16px;
        line-height: 20px;
        width: 84px;
        height: 35px;
        border: none;
        background: #FFFFFF;
        color: #52B6FF;
    }

    button:nth-child(2) {
        background: #52B6FF;
        color: #FFFFFF;
        margin-left: 15px;
    }

    div {
        margin-bottom: 10px;
        color: #666666;
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: end;
`

