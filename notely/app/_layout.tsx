import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import { useEffect, useState } from 'react'
import CustomSplash from './splash'
import { useFonts } from 'expo-font'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

    const [loaded] = useFonts({
        'JetBrains-Regular': require(
            '../assets/fonts/JetBrainsMono-Regular.ttf'
        ),

        'JetBrains-Bold': require(
            '../assets/fonts/JetBrainsMono-Bold.ttf'
        ),
    })

    const [isReady, setIsReady] = useState(false)

    const colorScheme = useColorScheme()

    useEffect(() => {

        async function prepare() {

            await new Promise(resolve =>
                setTimeout(resolve, 2500)
            )

            setIsReady(true)

            await SplashScreen.hideAsync()
        }

        prepare()

    }, [])

    if (!isReady || !loaded) {
        return <CustomSplash />
    }

    return (
        <>
            <StatusBar
                style={
                    colorScheme === 'dark'
                        ? 'light'
                        : 'dark'
                }
            />

            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </>
    )
}
