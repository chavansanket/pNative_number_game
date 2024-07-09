import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { useState, useEffect } from "react";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude){//max is excluded here 
    const rndNum = Math.floor(Math.random() * (max-min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const {width, height} = useWindowDimensions();

    useEffect(()=>{
       if (currentGuess === userNumber){
            onGameOver(guessRounds.length);
       } 
    },[currentGuess, userNumber, onGameOver]);

    useEffect(()=>{
        minBoundary=1;
        maxBoundary=100;
    },[])
    
    function nextGuessHandler(direction){// direction => 'lower', 'greater'
        if(
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ){
            Alert.alert("Don't lie!",'You know this is wrong...',[
                { text: 'Sorry', style: 'cancel'},
            ]);
            return;
        }
        if (direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
                minBoundary = currentGuess+1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber); 
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }
    const guessRoundListLength = guessRounds.length; //this is recalculated every time the component is reevaluated,which will happen whenever a new round is evaluated 
    
    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                    <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='remove' color='white'/></PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}><Ionicons name="add" color='white'/></PrimaryButton>
                        </View>
                    </View>
            </Card>
        </>
    )

    if (width>500){
        content = (
            <>
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='remove' color='white'/></PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}><Ionicons name="add" color='white'/></PrimaryButton>
                    </View>
                </View>
                
            </>
        )
    }

    return (
        <View style={styles.screen}>
                <Title>Opponent's Guess</Title>
                {content}
                <View style={styles.listContainer}>
                    {/* {guessRounds.map(
                        guess=>{
                        return (
                            <Text key={guess}>{guess}</Text>
                        ) 
                        }
                    )} */}
                    <FlatList 
                        data={guessRounds} 
                        renderItem={(itemData)=>(
                                <GuessLogItem 
                                        roundNumber={guessRoundListLength - itemData.index } 
                                        guess={itemData.item}
                                />
                        )}
                        keyExtractor={(item)=> item} 
                    />
                </View>
        </View>)
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    buttonContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    listContainer: {
        flex: 1,
        padding: 16,
    },
})