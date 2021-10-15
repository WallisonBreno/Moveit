import '../styles/globals.css'
import {ChallengeProvider} from '../contexts/challengesContexts'
import { CountdownProvider } from '../contexts/countdownContext'
function MyApp({ Component, pageProps }) {
  return (
   
        <Component {...pageProps} />
  
    )
}

export default MyApp
