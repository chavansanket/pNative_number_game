import { Text, StyleSheet, Platform } from "react-native";

import Colors from "../../constants/colors";

function Title({children}){
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        // borderWidth: Platform.select({ios: 0, android: 2}),
        borderWidth: 0,
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',//80% refer to the parent container that holds the title
        width: 300, //if this default width is exceeds then due to maxWidth it only take 80% of parent container
    },
})