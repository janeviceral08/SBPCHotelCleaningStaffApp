import colors from "./colors";
import {StyleSheet} from 'react-native'
import ApplicationStyles from "./ApplicationStyles";
import {fontSize} from "./const";


export default StyleSheet.create({
    ...ApplicationStyles,
    body: {
        flex: 1,
        backgroundColor: colors.bgRoot
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
      },

    // List
    viewList: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },

    // Item
    viewWrapItem: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: colors.charcoalGrey,
        borderRadius: 5
    },
    textTitle: {
        fontSize: fontSize.medium,
        fontWeight: 'bold',
        color: colors.charcoalGrey
    },
    textDescription: {
        fontSize: fontSize.small,
        color: colors.charcoalGrey,
        marginTop: 10
    },
    textTime: {
        fontSize: fontSize.small,
        color: colors.boldGrey,
        marginTop: 5
    },

    // Btn
    btnAddNew: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    btnAddNew1: {
        position: 'absolute',
        right: 20,
        bottom: 70
    }
})
