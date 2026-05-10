import { useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

interface IUSERSIGNIN {
    email?: string,
    username?: string,
    password: string

}
export default function SignUp() {
    const [form, setForm] = useState<IUSERSIGNIN>({
        username: "",
        password: ""
    });

    return (
        <ImageBackground
            source={require("../../assets/images/nimbus.gif")}
            style={styles.background}
            resizeMode="cover"
            imageStyle={{
                alignSelf: "flex-end"
            }}

        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.overlay}>
                    <KeyboardAvoidingView
                        style={styles.keyboardView}
                        behavior={
                            Platform.OS === "ios"
                                ? "padding"
                                : "height"
                        }
                    >
                        <View style={styles.container}>
                            <BlurView
                                intensity={60}

                                tint="dark"
                                experimentalBlurMethod="dimezisBlurView"
                                style={styles.glassCard}
                            >
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>
                                        Sign In
                                    </Text>
                                    <Text style={styles.paragraph}>Begin your Journey into the wild</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputBox}>
                                        <Text style={styles.label}>
                                            Email
                                        </Text>

                                        <TextInput
                                            placeholder="Enter your Email"
                                            placeholderTextColor="#cfcfcf"
                                            value={form.username}
                                            onChangeText={(text) => setForm((prev) => ({ ...prev, username: text }))}
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
                                    onPress={() => alert(`Username : ${form.username}`)} >
                                    <Text style={styles.submitText}>Submit</Text>
                                </Pressable>
                            </BlurView>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    headingContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,

    },

    heading: {
        color: "#f7dce1",
        fontSize: 34,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },
    inputContainer: {

    },
    inputBox: {
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        color: '#c29ca8',
    },
    safeArea: {
        flex: 1,
    },

    overlay: {
        flex: 1,
    },

    keyboardView: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    glassCard: {
        width: "100%",
        padding: 24,

        borderRadius: 28,

        overflow: "hidden",

        backgroundColor: "rgba(255,255,255,0.05)",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,

        elevation: 4,
    },


    label: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "400",
    },

    input: {
        color: "white",
        fontSize: 16,
        fontWeight: 300,
        paddingHorizontal: 18,
        paddingVertical: 16,

        borderRadius: 14,

        // backgroundColor: "rgba(255,255,255,0.12)",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },

    submit: {
        backgroundColor: "#ff4d8d",
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',

    },
    submitText: {

        color: "#ffffff",
        fontSize: 18,
        fontWeight: "500",
    }
});
