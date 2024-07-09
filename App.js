import { StyleSheet, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  //Load fonts
  const [fontsLoaded] =useFonts({ //fontsLoaded is boolean value
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  
  if (!fontsLoaded) {
    return undefined;
  }else {
    SplashScreen.hideAsync();
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
    
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startsNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber= {pickedNumberHandler}/>;

  if (userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }


  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startsNewGameHandler}/>
  }
  

  return (
    <>
      <StatusBar style='light'
      // backgroundColor="transparent"
      translucent={true}
      />
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground 
          source={require('./assets/images/backgroundImage.jpg')}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.androidSafeArea}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  )
}
const styles = StyleSheet.create({
  rootScreen: {
    flex:1,

  },
  backgroundImage: {
    opacity: 0.15
  },
  androidSafeArea: {
    flex:1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

});
