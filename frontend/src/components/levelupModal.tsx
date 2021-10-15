import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContexts'
import styles from '../styles/components/levelupModal.module.css'

export function LevelUpModal(){
    const {level, closeLevelUP} = useContext(ChallengesContext)
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>
                <button type="button" onClick={closeLevelUP}>
                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>

            </div>
        </div>
    )
}