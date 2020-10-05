
import { StyleSheet } from 'react-native';

// Sets the general deafult style that crosses all pages.
export const generalStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontFamily: 'bebas-neue'
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '90%',
    },

});

// Sets the deafult style for the main pages.
export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 26,
        paddingBottom: 10,
        backgroundColor: "#15bf4b",
        borderBottomWidth: 1,
        borderBottomColor: 'black',

    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '90%',
    },
    header: {
        width: "100%",
        paddingHorizontal: "4%",
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        backgroundColor: 'white',
        paddingTop: 30,
        marginTop: -30
    },
    title: {
        fontSize: 30,
        fontFamily: 'bebas-neue',
        marginLeft: 28,
        marginTopTop: 20,
    },
    backButton: {
        width: 20
    }
});

// Sets the default style for the login and registeration pages.
export const loginStyles = StyleSheet.create({
    button: {
        fontSize: 20,
        backgroundColor: "pink",
        borderColor: "black",
        borderWidth: 2,
        marginTop: 30,
        paddingVertical: 6,
        paddingHorizontal: 10,
        width: '80%',
        textAlign: "center",
        fontFamily: 'bebas-neue',
        marginLeft: '10%'
    }
});


