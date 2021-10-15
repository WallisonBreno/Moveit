import { useContext } from 'react';
import { ChallengesContext } from '../contexts/challengesContexts';
import styles from '../styles/components/completedChallenges.module.css';
export function CompletedChallenges(){
    const {challengescompleted} = useContext(ChallengesContext)
    return(
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengescompleted}</span>
        </div>
    )
}