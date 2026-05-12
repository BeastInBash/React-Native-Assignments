import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    createContext,
    useEffect,
    useState,
} from 'react'

import { DARK_THEME } from '@/constants/DARK_THEME'
import { LIGHT_THEME } from '@/constants/LIGHT_THEME'

type ThemeType = 'dark' | 'light'

type ThemeContextType = {
    theme: typeof DARK_THEME
    mode: ThemeType
    toggleTheme: () => void
}

export const ThemeContext =
    createContext<ThemeContextType>(
        {} as ThemeContextType
    )

const THEME_KEY = 'app-theme'

export const ThemeProvider = ({
    children,
}: any) => {
    const [mode, setMode] =
        useState<ThemeType>('dark')

    useEffect(() => {
        loadTheme()
    }, [])

    const loadTheme = async () => {
        const stored =
            await AsyncStorage.getItem(
                THEME_KEY
            )

        if (
            stored === 'dark' ||
            stored === 'light'
        ) {
            setMode(stored)
        }
    }

    const toggleTheme = async () => {
        const next =
            mode === 'dark'
                ? 'light'
                : 'dark'

        setMode(next)

        await AsyncStorage.setItem(
            THEME_KEY,
            next
        )
    }

    return (
        <ThemeContext.Provider
            value={{
                mode,
                toggleTheme,

                theme:
                    mode === 'dark'
                        ? DARK_THEME
                        : LIGHT_THEME,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
