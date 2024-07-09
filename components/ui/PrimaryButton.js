import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({children, onPress}){


    return(
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                style={({pressed}) => pressed ? [styles.buttonInnerContainer,styles.pressed] : styles.buttonInnerContainer}
                onPress={onPress} 
                android_ripple={{color: Colors.primary600}}
            >
                <Text style={styles.buttonText}>{children}</Text>

            </Pressable>
        </View>
    );

}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation:2,

    },
    //instead of making new buttonText style if we included this in above props, that was not worked for inside text of button (bcuz inheritance will not work here in native )
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75,
    }

});