import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/levelupModal';


interface Challenge{
    type:'body'|'eye'
    description:string
    amount:number
}

    interface ChallengesContextData{
         level:number
         currentxp:number
         challengescompleted:number
         activechallenge:Challenge
         xptonextlvl:number
        levelUp:()=>void
        startNewChallenge:()=>void
        resetChallenge:()=>void
        completeChallenege:()=>void
        closeLevelUP:()=>void
    }

    interface ChallengeProviderProps{
        children:ReactNode;
        level:number
        currentXp:number
        challengesCompleted:number
    }
    export  const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({children, ...rest}:ChallengeProviderProps){
    const [level, setLevel] = useState(rest.level??1)
    const [currentxp, setCurrentxp] = useState(rest.currentXp??0)
    const [challengescompleted, setChallengescompleted] = useState(rest.challengesCompleted??0)
    const [activechallenge, setActiveChallenge] = useState(null)
    const xptonextlvl = Math.pow((level+1)*4,2)
    const [isLevelUPModalOpen, setisLevelUpModalOpen] = useState(false)

    useEffect(()=>{
        Notification.requestPermission();
    },[])
    useEffect(()=>{
         Cookies.set('level', String(level))
         Cookies.set("currentXp", String(currentxp))
         Cookies.set("challengesCompleted", String(challengescompleted))
    },[level,currentxp,challengescompleted])
    function levelUp(){
        setLevel(level+1);
        setisLevelUpModalOpen(true)
    }
    
    function closeLevelUP(){
        setisLevelUpModalOpen(false);
    }

    function startNewChallenge(){

        new Audio('notification.mp3').play();

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio \O/', {
                body:`Valendo ${challenge.amount}XP`
            })
        }
    }
    function resetChallenge(){
        setActiveChallenge(null)
    }
    function completeChallenege(){
        if (!activechallenge){
            return
        }
        const {amount} = activechallenge
        let finalXP = currentxp + amount
        
        if(finalXP > xptonextlvl){
            finalXP = finalXP - xptonextlvl
            levelUp();
        }
        setCurrentxp(finalXP)
        setActiveChallenge(null)
        setChallengescompleted(challengescompleted+1)
    }

    return(
        <ChallengesContext.Provider value={{level,
         currentxp,
          challengescompleted,
          xptonextlvl,
           levelUp,
           activechallenge,
        startNewChallenge, 
        resetChallenge,
        completeChallenege,
        closeLevelUP
        }}>
            {children}
            {isLevelUPModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}