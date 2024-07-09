import { TextInput, View, Text, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";



function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('')

    const {width, height} = useWindowDimensions();
   
    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            //prompt method have input field
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
         
            );
            return;
        }

        onPickNumber(chosenNumber);
        
    }
    const marginTopDistance = height < 380 ? 30 : 100;
    
    return(
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView behavior='position'>
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput 
                                style={styles.numberInput} 
                                maxLength={2}
                                keyboardType='number-pad'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={numberInputHandler}
                                value={enteredNumber}
                        />
                        <View style={styles.buttonsContainer}>
                                {/*separate view-> so new flexbox containers for each button->so available space is distributed in buttons  */}
                            <View style={styles.buttonContainer}> 
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}> 
                                <PrimaryButton 
                                    onPress={confirmInputHandler}>Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer:{
        flex:1,
        // marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: 'center'
    },

    numberInput: {
        height: 50,
        width:50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex:1,
    },
    

}
)