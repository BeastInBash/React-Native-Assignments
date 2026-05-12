import { useTheme } from '@/libs/hooks/useTheme'
import { NotesStorage } from '@/libs/notes-storage'
import { Note } from '@/types/notes'
import { Ionicons } from '@expo/vector-icons'
import {
    router,
    useLocalSearchParams,
} from 'expo-router'
import {
    useCallback,
    useEffect,
    useState,
} from 'react'
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RenderHtml from 'react-native-render-html'

export default function NoteDetails() {
    const { theme } = useTheme()

    const styles = createStyles(theme)

    const { id } =
        useLocalSearchParams()

    const [note, setNote] =
        useState<Note | null>(null)

    const [loading, setLoading] =
        useState(true)

    const { width } =
        useWindowDimensions()

    const loadNote = useCallback(
        async () => {
            try {
                const notes =
                    await NotesStorage.getNotes()

                const foundNote =
                    notes.find(
                        (note) =>
                            note.id === id
                    )

                if (foundNote) {
                    setNote(foundNote)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        },
        [id]
    )

    useEffect(() => {
        loadNote()
    }, [loadNote])

    if (loading) {
        return (
            <SafeAreaView
                style={
                    styles.loaderContainer
                }
            >
                <ActivityIndicator
                    size="large"
                    color={theme.primary}
                />
            </SafeAreaView>
        )
    }

    if (!note) {
        return (
            <SafeAreaView
                style={
                    styles.loaderContainer
                }
            >
                <Text
                    style={
                        styles.emptyText
                    }
                >
                    Note not found
                </Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View style={styles.header}>
                <Pressable
                    style={
                        styles.iconButton
                    }
                    onPress={() =>
                        router.back()
                    }
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={
                            theme.textBright
                        }
                    />
                </Pressable>

                <Pressable
                    style={
                        styles.iconButton
                    }
                >
                    <Ionicons
                        name="create-outline"
                        size={22}
                        color={
                            theme.textBright
                        }
                    />
                </Pressable>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={
                    false
                }
            >
                <Text style={styles.title}>
                    {note.title}
                </Text>

                <Text style={styles.date}>
                    {new Date(
                        note.createdAt
                    ).toLocaleDateString()}
                </Text>

                <View
                    style={
                        styles.htmlContainer
                    }
                >
                    <RenderHtml
                        contentWidth={
                            width
                        }
                        source={{
                            html: note.content,
                        }}
                        systemFonts={[
                            'JetBrains-Regular',
                            'JetBrains-Bold',
                        ]}
                        baseStyle={{
                            color:
                                theme.textBright,

                            fontSize: 16,

                            lineHeight: 28,

                            fontFamily:
                                'JetBrains-Regular',
                        }}
                        tagsStyles={{
                            body: {
                                color:
                                    theme.textBright,

                                fontFamily:
                                    'JetBrains-Regular',
                            },

                            p: {
                                color:
                                    theme.textBright,

                                fontSize: 16,

                                lineHeight: 28,

                                marginBottom: 12,

                                fontFamily:
                                    'JetBrains-Regular',
                            },

                            h1: {
                                color:
                                    theme.primary,

                                fontSize: 26,

                                textTransform:
                                    'capitalize',

                                marginBottom: 16,

                                fontFamily:
                                    'JetBrains-Bold',
                            },

                            h2: {
                                color:
                                    theme.secondary,

                                fontSize: 24,

                                marginBottom: 14,

                                fontFamily:
                                    'JetBrains-Bold',
                            },

                            strong: {
                                color:
                                    theme.textBright,

                                fontFamily:
                                    'JetBrains-Bold',
                            },

                            em: {
                                fontStyle:
                                    'italic',
                            },

                            ul: {
                                marginVertical: 12,
                            },

                            ol: {
                                marginVertical: 12,
                            },

                            li: {
                                color:
                                    theme.textBright,

                                marginBottom: 8,

                                fontFamily:
                                    'JetBrains-Regular',
                            },

                            blockquote: {
                                borderLeftWidth: 4,

                                borderLeftColor:
                                    theme.primary,

                                paddingLeft: 16,

                                opacity: 0.8,

                                marginVertical: 16,
                            },

                            code: {
                                backgroundColor:
                                    theme.surface,

                                color:
                                    theme.warning,

                                paddingHorizontal: 8,

                                paddingVertical: 4,

                                borderRadius: 8,

                                fontFamily:
                                    'JetBrains-Regular',
                            },

                            a: {
                                color:
                                    theme.primary,

                                textDecorationLine:
                                    'none',
                            },
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                theme.background,
        },

        loaderContainer: {
            flex: 1,
            justifyContent:
                'center',

            alignItems: 'center',

            backgroundColor:
                theme.background,
        },

        emptyText: {
            color: theme.textBright,
            fontSize: 18,
        },

        header: {
            paddingHorizontal: 18,
            paddingVertical: 14,

            flexDirection: 'row',

            justifyContent:
                'space-between',

            alignItems: 'center',

            borderBottomWidth: 1,

            borderBottomColor:
                theme.border,
        },

        iconButton: {
            width: 42,
            height: 42,

            borderRadius: 14,

            backgroundColor:
                theme.surface,

            justifyContent:
                'center',

            alignItems: 'center',

            borderWidth: 1,

            borderColor:
                theme.border,
        },

        content: {
            flex: 1,
            padding: 20,
        },

        title: {
            color: theme.textBright,

            fontSize: 32,

            lineHeight: 42,

            fontFamily:
                'JetBrains-Bold',
        },

        date: {
            color: theme.text,

            marginTop: 12,

            marginBottom: 30,

            fontSize: 13,

            fontFamily:
                'JetBrains-Regular',
        },

        htmlContainer: {
            borderTopColor:
                theme.secondary,

            borderTopWidth: 2,

            padding: 18,
        },
    })
