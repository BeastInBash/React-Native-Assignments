
import { ThemeContext } from '@/app/context/theme-context'
import { useContext } from 'react'

export const useTheme = () =>
    useContext(ThemeContext)
