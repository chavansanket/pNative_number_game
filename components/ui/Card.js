import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({children}){
    return <View style={styles.card}>{children}</View>
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',  
        marginTop: deviceWidth < 380 ? 18 : 34,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, 
        //to add shadow in android 
        //shadow property realated to ios are of shadow---
        shadowOffset: {width: 10, height: 21 },
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,//to control how transparent a shadow is
        //offset from original object, to the left and to the right
        
    },
})