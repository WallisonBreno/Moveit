import {GetServerSideProps} from 'next';
import { CompletedChallenges } from "../components/completedChallenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar";
import { Profile } from "../components/profile";
import { ChallengeBox} from "../components/challengeBox";
import styles from '../styles/pages/home.module.css';
import Head from 'next/head';
import { CountdownProvider } from "../contexts/countdownContext";
import { ChallengeProvider } from '../contexts/challengesContexts';
import { prependOnceListener } from 'process';

interface HomeProps{
  level:number
  currentXp:number
  challengesCompleted:number
}

export default function Home(props:HomeProps) {
  return (
    <ChallengeProvider 
    level={props.level} 
    currentXp={props.currentXp} 
    challengesCompleted={props.challengesCompleted}>
    <div className={styles.container}>
      <Head>
        <title>Moveit</title>
      </Head>
      <ExperienceBar/>
      <CountdownProvider>
      <section>
        <div className={styles.profile}>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
        </div>
             
        <div className={styles.challengeBox}>
    <ChallengeBox/>
        </div>
      </section>
      </CountdownProvider>
  </div>
  </ChallengeProvider>
  )
}
export const getServerSideProps:GetServerSideProps = async (ctx)=>{
const {level, currentXp, challengesCompleted} = ctx.req.cookies;
  return {
    props:{
      level:Number(level),
      currentXp:Number(currentXp),
      challengesCompleted:Number(challengesCompleted)
    }
  }
}