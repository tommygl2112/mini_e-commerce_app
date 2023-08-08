import { TextInput, View, StyleSheet, Button, Alert } from "react-native"
import { useState } from "react"
import axios from "axios";
import { userSlice } from "../store/userSlice";
import { useDispatch } from "react-redux"

export const LoginScreen = ({ navigation }) => {
    const [user, setUser] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log(user);
        console.log(password);
        if (user != '' || password != '') {
            try {
                const response = await axios.post('https://fakestoreapi.com/auth/login', {
                    username: user,
                    password: password
                });
                if (response.status === 200) {
                    dispatch(userSlice.actions.login(true));
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert('Wrong credentials');
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <TextInput onChangeText={(value) => setUser(value)} placeholder="User" style={styles.textInput}></TextInput>
            <TextInput onChangeText={(value) => setPassword(value)} placeholder="Password" style={styles.textInput}></TextInput>
            <View style={styles.loginButtonContainer}>
                <Button onPress={() => handleLogin()} color={"white"} title="Log In" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomWidth: 0.5,
        width: "80%",
        padding: 9,
        fontSize: 24,
        borderRadius: 8,
        marginTop: 36,
    },
    mainContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    loginButtonContainer: {
        backgroundColor: "green",
        padding: 9,
        marginTop: 36,
        width: "80%",
        borderRadius: 8
    }
})