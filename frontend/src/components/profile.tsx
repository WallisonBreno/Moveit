import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContexts'
import styles from '../styles/components/profile.module.css'
export function Profile(){
    const {level} = useContext(ChallengesContext)
    return(
        
        <div className={styles.profileContainer}><img src="icons/userIcon.svg" alt=""/>
            
            <div>
                <strong>Usuário</strong>
                <p>
                    <img src="icons/level.svg" alt="lvl:"/>
                   Level {level}
                </p>
            </div>
        </div>
        
    )
}