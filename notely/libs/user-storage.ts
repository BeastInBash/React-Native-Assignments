import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
    username: string
    password: string
}

const USER_KEY = 'current_user'

export const UserStorage = {
    async saveUser(user: User) {
        try {
            await AsyncStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            )
        } catch (error) {
            console.error(error)
        }
    },

    async getUser(): Promise<User | null> {
        try {
            const user =
                await AsyncStorage.getItem(
                    USER_KEY
                )

            return user
                ? JSON.parse(user)
                : null
        } catch (error) {
            console.error(error)
            return null
        }
    },

    async removeUser() {
        try {
            await AsyncStorage.removeItem(
                USER_KEY
            )
        } catch (error) {
            console.error(error)
        }
    }
}
