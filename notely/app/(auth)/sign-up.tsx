import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { Link } from 'expo-router';
// import { Container } from './styles';
interface IUSER {
    username: string;
    email: string;
    password: string;

}
export default function SignUp() {
    const [form, setForm] = useState<IUSER>({
        username: "",
        email: "",
        password: ""
    })
    return (
        <ImageBackground
            source={require('../../assets/images/background.png')}
            style={styles.background}
            resizeMode='cover'
        >
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.container}>
                        <Text style={{
                            color: COLORS.primary, marginBottom: 22, fontSize: 32,
                            fontWeight: '600'
                        }}>NOTE.exe</Text>
                        <BlurView
                            intensity={60}
                            tint="dark"

                            style={styles.glassCard}
                        >
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}>
                                    Sign Up
                                </Text>
                                <Text style={styles.paragraph}>Begin your Journey into the wild</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputBox} >
                                    <Text style={styles.label}>
                                        Username
                                    </Text>

                                    <TextInput
                                        placeholder="Enter your username"
                                        placeholderTextColor="#cfcfcf"
                                        value={form.username}
                                        onChangeText={(text) => setForm((prev) => ({ ...prev, username: text }))}
                                        style={styles.input}
                                        autoCapitalize="none"
                                    /></View>

                                <View style={styles.inputBox}>
                                    <Text style={styles.label}>
                                        Email
                                    </Text>

                                    <TextInput
                                        placeholder="Enter your Email"
                                        placeholderTextColor="#cfcfcf"
                                        value={form.email}
                                        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                                        style={styles.input}
                                        autoCapitalize="none"
                                    /></View>

                                <View style={styles.inputBox}>
                                    <Text style={styles.label}>
                                        Password
                                    </Text>

                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor="#cfcfcf"
                                        textContentType="password"
                                        value={form.password}
                                        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                                        secureTextEntry
                                        style={styles.input}
                                        autoCapitalize="none"
                                    /></View>
                            </View>
                            <Pressable
                                style={styles.submit}
                                onPress={() => alert(`Username : ${form.username} , Email : ${form.email}`)} >
                                <Text style={styles.submitText}>Submit</Text>
                            </Pressable>
                            <Link href="/sign-in" asChild style={{ borderTopWidth:1, borderTopColor : '#23262f', marginTop : 20 }}>
                                <Pressable>
                                    <Text style={styles.linkText}>
                                        Already have an account? <Text style={{color : COLORS.primary}}>Sign In</Text>
                                    </Text>
                                </Pressable>
                            </Link>
                        </BlurView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView></ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },

    linkText: {
        color: COLORS.secondary,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: "JetBrains-Regular"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    headingContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,

    },

    heading: {
        color: COLORS.secondary,
        fontSize: 24,
        lineHeight : 26,
        fontFamily: "JetBrains-Regular",
        marginBottom: 8,
        textAlign: "center",
    },
    inputContainer: {

    },
    inputBox: {
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        color: '#c29ca8',
        fontFamily: "JetBrains-Regular",
    },
    safeArea: {
        flex: 1,
    },

    keyboardView: {
        flex: 1,
    },


    glassCard: {
        width: "100%",
        padding: 24,
        borderRadius: 28,
        overflow: "hidden",

        backgroundColor: "rgba(15,17,23,0.7)",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,

        elevation: 10,
    },


    label: {
        color: "white",
        fontSize: 12,
        fontFamily: "JetBrains-Regular",
        marginBottom: 10,
        fontWeight: "400",
    },

    input: {
        color: "white",
        fontSize: 12,
        fontFamily: "JetBrains-Regular",
        fontWeight: 300,
        paddingHorizontal: 18,
        paddingVertical: 16,

        borderRadius: 14,


        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    submit: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',

    },
    submitText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "JetBrains-Bold",
    }
})
