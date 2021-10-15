import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContexts'
import { CountdownContext } from '../contexts/countdownContext'
import styles from '../styles/components/challengeBox.module.css'

export function ChallengeBox(){
    
    const {activechallenge, resetChallenge, completeChallenege} = useContext(ChallengesContext)
    const {resetCountdown} = useContext(CountdownContext)
    function handleChallengeSucceded(){
        completeChallenege();
        resetCountdown();
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }
    return(
        
        <div className={styles.challengeBoxContainer}>
            {activechallenge?(
                <div className={styles.challengeBoxActive}>
                    <header>Ganhe {activechallenge.amount}</header>

                    <main>
                        <img src={`icons/${activechallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activechallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challengeFailed} onClick={handleChallengeFailed}>Falhei</button>
                        <button type="button" className={styles.challengeSucceded} onClick={handleChallengeSucceded}>Completei</button>
                    </footer>
                </div>
            ):(
                <div>
                    <div className={styles.challengeBoxNotActive}>
                    <strong>Inicie um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios.
                    </p>
                    </div>
                </div>
            )}

        </div>
    )
}