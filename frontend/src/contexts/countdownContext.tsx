import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./challengesContexts";

interface CountdownProviderProps{
    children:ReactNode
}
interface CountdownContextData{
    minutes:number;
    seconds:number;
    finished:boolean;
    active:boolean;
    startCountdown:()=>void;
    resetCountdown:()=>void;

}
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}:CountdownProviderProps){
    let countdownTimeout:NodeJS.Timeout
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(25*60);
    const [active, setActive] = useState(false)
    const [finished, setFinished] = useState(false)
    const minutes = Math.floor(time/60);
    const seconds =  time % 60;

    function startCountdown(){
        setActive(true)
    }
    function resetCountdown(){
        clearTimeout(countdownTimeout)
        setActive(false)
        setTime(25*60)
        setFinished(false)
    }
        useEffect(()=>{
            if (active && time > 0){
               countdownTimeout = setTimeout(()=>{
                    setTime(time-1)
                }, 1000)
            }else if(active && time === 0){
                setActive(false);
                setFinished(true);
                startNewChallenge();
            }
        }, [active, time])
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            finished,
            active,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}