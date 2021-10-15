import {useContext, useState} from 'react'
import { ChallengesContext } from '../contexts/challengesContexts';
import styles from '../styles/components/experienceBar.module.css'
export function ExperienceBar(){
    const [color, setColor] = useState('#4CD62B');
    const {currentxp, xptonextlvl} = useContext(ChallengesContext)
    const percentToNextLevel = Math.round(currentxp * 100)/xptonextlvl
    return(
        <div>
        <header className={styles.experienceBar}>
            <span>0xp</span>
                <div>
                    <div style={{width:`${percentToNextLevel}%`, background:color}} />
                    <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>{currentxp}xp</span>
                </div>
            <span>{xptonextlvl}xp</span>
           
        </header>
        <div className={styles.customSelect}>
            <label className={styles.colorPicker} htmlFor='colors'>Escolha uma cor:</label>
            <select className={styles.selectColor} name="colors" onChange={(e)=>{setColor(e.target.value)}}>
                <option value="#4CD62B">Green</option>
                <option value="#5965E0">Blue</option>
                <option value="#E83F5B">Red</option>
            </select>
         </div>
        </div>
    );
}