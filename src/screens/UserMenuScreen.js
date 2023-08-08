import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from "../store/userSlice";
import { useState, useEffect } from "react";

export const UserMenuScreen = ({ navigation }) => {

    const [logedUser, setLogedUser] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        console.log('user: ' + user);

        if (user != '') {
            setLogedUser(true);
        } else if (user === '') {
            setLogedUser(false);
        }
    }, [user]);

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                {logedUser ? <MenuOption text={'Profile'} style={styles.profile} icon={'user'} iconColor={'blue'} /> : null}
                {logedUser ? null : <MenuOption text={'Log In'} style={styles.profile} icon={'sign-in-alt'} iconColor={'green'} onPress={() => navigation.navigate('Login')} />}
                {logedUser ? <MenuOption text={'Log Out'} style={styles.logOut} icon={'sign-out-alt'} iconColor={'red'} onPress={() => dispatch(userSlice.actions.logout(''))} /> : null}
            </View>
        </ScrollView>
    )
}

const MenuOption = ({ text, style, icon, iconColor, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.menuOptionContainer}>
                <Text style={style}>{text}</Text>
                <FontAwesome5 name={icon} size={24} color={iconColor} style={styles.icon} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    logOut: {
        fontSize: 24,
        color: "red",
    },
    profile: {
        fontSize: 24,
        color: "green",
    },
    menuOptionContainer: {
        flexDirection: "row",
        marginTop: 36,
        alignItems: "center"
    },
    icon: {
        marginLeft: 12
    }
});