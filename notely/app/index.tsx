import { UserStorage } from '@/libs/user-storage'
import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from '@/constants/colors'

export default function Index() {
    const [user, setUser] = useState<any>(null)

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        try {
            const currentUser =
                await UserStorage.getUser()

            setUser(currentUser)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                        COLORS.background,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                />
            </View>
        )
    }

    if (!user) {
        return (
            <Redirect href="/sign-in" />
        )
    }

    return <Redirect href="/home" />
}
