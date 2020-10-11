
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
        backgroundColor: "pink",

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
        marginLeft: 20,
        marginTopTop: 20,
    },
    backButton: {
        width: 20
    }
});

// Sets the default style for the senior status page.
export const homeStyles = StyleSheet.create({
    houseImage: {
        width: 305,
        height: 215, 
        alignSelf: 'center'
    },
    viewStyle: { 
        width: '98%', 
        marginLeft: '1%'
    }
})

// Sets the default style for the battery status page.
export const batteryStyles = StyleSheet.create({
    listCard: {
        width: '98%',
        borderWidth: 2,
        borderColor: 'black',
        padding: 5,
        marginBottom: 20,
    },
    listView: {
        paddingTop: 20,
        width: '98%',
        borderWidth: 2,
        borderColor: 'black',
        paddingLeft: '1.7%',
        marginTop: -10,
        backgroundColor: 'white',
    },
    cardDate: {
        fontFamily: 'bebas-neue',
        opacity: 0.4,
        fontSize: 16,
        marginLeft: 1,
        marginTop: 2,
    },
    batteryTitle: {
        fontFamily: 'bebas-neue',
        opacity: 0.4,
        fontSize: 26,
        marginLeft: 1,
        marginTop: 2,
    },
    batteryPercentageText: {
        fontFamily: 'bebas-neue',
        fontSize: 26,
        marginTop: -75,
        marginRight: 160,
        alignSelf: 'flex-end',
        paddingVertical: 18,
        paddingTop: 26
    },
    batteryImage: {
        width: 120,
        height: 60, 
        marginTop: -33, 
        marginRight: 20, 
        alignSelf: "flex-end",
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


