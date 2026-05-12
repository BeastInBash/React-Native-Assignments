import { BlurView } from 'expo-blur'
import { useState } from 'react'
import {
    ImageBackground,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Link,
    router,
} from 'expo-router'

import { UserStorage } from '@/libs/user-storage'
import { useTheme } from '@/libs/hooks/useTheme'

interface IUSER {
    username: string
    password: string
}

export default function SignIn() {
    const { theme, mode, toggleTheme } =
        useTheme()

    const styles = createStyles(theme)

    const [form, setForm] =
        useState<IUSER>({
            username: '',
            password: '',
        })

    const handleSubmit = async () => {
        try {
            if (
                !form.username.trim() ||
                !form.password.trim()
            ) {
                return
            }

            await UserStorage.saveUser({
                username: form.username,
                password: form.password,
            })

            router.replace('/home')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ImageBackground
            source={
                mode === 'dark'
                    ? require('../../assets/images/background.png')
                    : undefined
            }
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <KeyboardAvoidingView
                    style={
                        styles.keyboardView
                    }
                >
                    <View
                        style={styles.container}
                    >
                        <Pressable
                            style={
                                styles.themeButton
                            }
                            onPress={
                                toggleTheme
                            }
                        >
                            <Text
                                style={{
                                    color:
                                        theme.textBright,
                                    fontSize: 18,
                                }}
                            >
                                {mode ===
                                'dark'
                                    ? '☀️'
                                    : '🌙'}
                            </Text>
                        </Pressable>

                        <Text
                            style={
                                styles.logoText
                            }
                        >
                            NOTELY
                        </Text>

                        <BlurView
                            intensity={60}
                            tint={
                                mode ===
                                'dark'
                                    ? 'dark'
                                    : 'light'
                            }
                            style={
                                styles.glassCard
                            }
                        >
                            <View
                                style={
                                    styles.headingContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.heading
                                    }
                                >
                                    Sign In 
                                </Text>

                                <Text
                                    style={
                                        styles.paragraph
                                    }
                                >
                                    Begin your
                                    Journey into
                                    the wild
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.inputContainer
                                }
                            >
                                <View
                                    style={
                                        styles.inputBox
                                    }
                                >
                                    <Text
                                        style={
                                            styles.label
                                        }
                                    >
                                        Username
                                    </Text>

                                    <TextInput
                                        placeholder="Enter your username"
                                        placeholderTextColor={
                                            theme.text
                                        }
                                        value={
                                            form.username
                                        }
                                        onChangeText={(
                                            text
                                        ) =>
                                            setForm(
                                                (
                                                    prev
                                                ) => ({
                                                    ...prev,
                                                    username:
                                                        text,
                                                })
                                            )
                                        }
                                        style={
                                            styles.input
                                        }
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View
                                    style={
                                        styles.inputBox
                                    }
                                >
                                    <Text
                                        style={
                                            styles.label
                                        }
                                    >
                                        Password
                                    </Text>

                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor={
                                            theme.text
                                        }
                                        textContentType="password"
                                        value={
                                            form.password
                                        }
                                        onChangeText={(
                                            text
                                        ) =>
                                            setForm(
                                                (
                                                    prev
                                                ) => ({
                                                    ...prev,
                                                    password:
                                                        text,
                                                })
                                            )
                                        }
                                        secureTextEntry
                                        style={
                                            styles.input
                                        }
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <Pressable
                                style={
                                    styles.submit
                                }
                                onPress={
                                    handleSubmit
                                }
                            >
                                <Text
                                    style={
                                        styles.submitText
                                    }
                                >
                                    Submit
                                </Text>
                            </Pressable>

                            <Link
                                href="/sign-up"
                                asChild
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor:
                                        theme.border,
                                    marginTop: 20,
                                }}
                            >
                                <Pressable>
                                    <Text
                                        style={
                                            styles.linkText
                                        }
                                    >
                                        Don&apos;t
                                        have
                                        account?
                                        <Text
                                            style={{
                                                color:
                                                    theme.primary,
                                            }}
                                        >
                                            {' '}
                                            Sign
                                            Up
                                        </Text>
                                    </Text>
                                </Pressable>
                            </Link>
                        </BlurView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    )
}

const createStyles = (theme: any) =>
    StyleSheet.create({
        background: {
            flex: 1,
            backgroundColor:
                theme.background,
        },

        keyboardView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        container: {
            flex: 1,
            justifyContent:
                'center',

            alignItems: 'center',

            paddingHorizontal: 10,

            width: '100%',
        },

        themeButton: {
            position: 'absolute',
            top: 20,
            right: 20,

            width: 50,
            height: 50,

            borderRadius: 18,

            backgroundColor:
                theme.surface,

            justifyContent:
                'center',

            alignItems: 'center',

            borderWidth: 1,

            borderColor:
                theme.border,
        },

        logoText: {
            color: theme.primary,

            marginBottom: 22,

            fontSize: 22,

            fontFamily:
                'JetBrains-Bold',
        },

        glassCard: {
            width: '100%',

            padding: 24,

            borderRadius: 28,

            overflow: 'hidden',

            backgroundColor:
                modeBackground(theme),

            borderWidth: 1,

            borderColor:
                theme.border,
        },

        headingContainer: {
            justifyContent:
                'center',

            alignItems: 'center',

            marginBottom: 40,
        },

        heading: {
            color: theme.secondary,

            fontSize: 24,

            lineHeight: 26,

            fontFamily:
                'JetBrains-Regular',

            marginBottom: 8,

            textAlign: 'center',
        },

        paragraph: {
            fontSize: 14,

            textAlign: 'center',

            color: theme.text,

            fontFamily:
                'JetBrains-Regular',
        },

        inputContainer: {},

        inputBox: {
            marginBottom: 20,
        },

        label: {
            color:
                theme.textBright,

            fontSize: 12,

            fontFamily:
                'JetBrains-Regular',

            marginBottom: 10,
        },

        input: {
            color:
                theme.textBright,

            fontSize: 12,

            fontFamily:
                'JetBrains-Regular',

            paddingHorizontal: 18,

            paddingVertical: 16,

            borderRadius: 14,

            borderWidth: 1,

            borderColor:
                theme.border,

            backgroundColor:
                theme.surface,
        },

        submit: {
            backgroundColor:
                theme.primary,

            paddingVertical: 14,

            paddingHorizontal: 14,

            borderRadius: 14,

            justifyContent:
                'center',

            alignItems: 'center',
        },

        submitText: {
            color: '#ffffff',

            fontSize: 14,

            fontFamily:
                'JetBrains-Bold',
        },

        linkText: {
            color: theme.secondary,

            fontSize: 12,

            textAlign: 'center',

            marginTop: 20,

            fontFamily:
                'JetBrains-Regular',
        },
    })

const modeBackground = (theme: any) => {
    if (
        theme.background ===
        '#282c34'
    ) {
        return 'rgba(15,17,23,0.7)'
    }

    return 'rgba(255,255,255,0.7)'
}
