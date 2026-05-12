import { useTheme } from '@/libs/hooks/useTheme'
import { NotesStorage } from '@/libs/notes-storage'
import { UserStorage } from '@/libs/user-storage'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import {
    useState,
    useEffect,
    useCallback,
} from 'react'
import Modal from 'react-native-modal'
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    TextInput,
    FlatList,
    Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
    const { theme, mode, toggleTheme } =
        useTheme()

    const styles = createStyles(theme)

    const [search, setSearch] =
        useState('')

    const [deleteModal, setDeleteModal] =
        useState(false)

    const [profileModal, setProfileModal] =
        useState(false)

    const [selectedNote, setSelectedNote] =
        useState<any>(null)

    const [notes, setNotes] = useState<
        any[]
    >([])

    const [user, setUser] = useState({
        username: '',
    })

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const currentUser =
            await UserStorage.getUser()

        //@ts-ignore
        setUser(currentUser)
    }

    useFocusEffect(
        useCallback(() => {
            loadNotes()
        }, [])
    )

    const loadNotes = async () => {
        try {
            const data =
                await NotesStorage.getNotes()

            setNotes(data)
        } catch (error) {
            console.error(error)
        }
    }

    const filteredNotes = notes.filter(
        (note) => {
            const query =
                search.toLowerCase()

            const plainContent =
                note.content
                    ?.replace(
                        /<[^>]*>/g,
                        ''
                    )
                    .toLowerCase()

            return (
                note.title
                    ?.toLowerCase()
                    .includes(query) ||
                plainContent.includes(
                    query
                )
            )
        }
    )

    const handleDelete = async () => {
        try {
            if (!selectedNote) return

            await NotesStorage.deleteNote(
                selectedNote.id
            )

            setNotes((prev) =>
                prev.filter(
                    (note) =>
                        note.id !==
                        selectedNote.id
                )
            )

            setDeleteModal(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = async () => {
        await UserStorage.removeUser()

        setProfileModal(false)

        router.replace('/sign-in')
    }

    const renderItem = ({ item }: any) => (
        <Pressable
            style={styles.noteCard}
            onPress={() =>
                router.push(
                    `/notes/${item.id}`
                )
            }
        >
            <View style={styles.noteHeader}>
                <View
                    style={
                        styles.noteIconContainer
                    }
                >
                    <Ionicons
                        name="document-text-outline"
                        size={20}
                        color={theme.primary}
                    />
                </View>

                <Pressable
                    onPress={() => {
                        setSelectedNote(item)
                        setDeleteModal(true)
                    }}
                    style={
                        styles.noteIconContainer
                    }
                >
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={22}
                        color={theme.error}
                    />
                </Pressable>
            </View>

            <Text style={styles.noteTitle}>
                {item.title}
            </Text>

            <Text
                style={
                    styles.noteDescription
                }
                numberOfLines={2}
            >
                {item.content
                    ?.replace(
                        /<[^>]*>/g,
                        ''
                    )
                    .slice(0, 120)}
            </Text>

            <View style={styles.noteFooter}>
                <Text style={styles.noteDate}>
                    {new Date(
                        item.createdAt
                    ).toLocaleDateString()}
                </Text>

                <View style={styles.tag}>
                    <Text style={styles.tagText}>
                        Note
                    </Text>
                </View>
            </View>
        </Pressable>
    )

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
                style={styles.safeArea}
            >
                <View style={styles.header}>
                    <View
                        style={styles.headerLeft}
                    >
                        <Pressable
                            style={
                                styles.menuButton
                            }
                        >
                            <Ionicons
                                size={24}
                                color={
                                    theme.textBright
                                }
                                name="menu"
                            />
                        </Pressable>

                        <View>
                            <Text
                                style={
                                    styles.heading
                                }
                            >
                                Welcome
                                <Text
                                    style={{
                                        color: theme.secondary,
                                    }}
                                >
                                    {' '}
                                    {
                                        user?.username
                                    }
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection:
                                'row',
                            alignItems:
                                'center',
                            gap: 12,
                        }}
                    >
                        <Pressable
                            style={
                                styles.themeButton
                            }
                            onPress={
                                toggleTheme
                            }
                        >
                            <Ionicons
                                name={
                                    mode ===
                                    'dark'
                                        ? 'sunny'
                                        : 'moon'
                                }
                                size={22}
                                color={
                                    theme.textBright
                                }
                            />
                        </Pressable>

                        <Pressable
                            style={
                                styles.avatarWrapper
                            }
                            onPress={() =>
                                setProfileModal(
                                    true
                                )
                            }
                        >
                            <Image
                                source={require('../../assets/images/pfp.png')}
                                style={
                                    styles.avatar
                                }
                            />
                        </Pressable>
                    </View>
                </View>

                <View
                    style={
                        styles.searchContainer
                    }
                >
                    <Ionicons
                        name="search"
                        size={20}
                        color={theme.text}
                    />

                    <TextInput
                        style={
                            styles.searchInput
                        }
                        placeholder="Search notes..."
                        placeholderTextColor={
                            theme.text
                        }
                        onChangeText={
                            setSearch
                        }
                        value={search}
                    />
                </View>

                <FlatList
                    data={filteredNotes}
                    renderItem={renderItem}
                    keyExtractor={(item) =>
                        item.id
                    }
                    contentContainerStyle={
                        styles.listContent
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    ListEmptyComponent={
                        <View
                            style={{
                                marginTop: 80,
                                alignItems:
                                    'center',
                            }}
                        >
                            <Ionicons
                                name="document-text-outline"
                                size={72}
                                color={
                                    theme.border
                                }
                            />

                            <Text
                                style={{
                                    color: theme.text,
                                    marginTop: 16,
                                    fontSize: 16,
                                }}
                            >
                                No notes found
                            </Text>
                        </View>
                    }
                />

                <Pressable
                    style={styles.fab}
                    onPress={() =>
                        router.push(
                            '/editor'
                        )
                    }
                >
                    <Ionicons
                        name="add"
                        size={30}
                        color="#fff"
                    />
                </Pressable>

                <Modal
                    isVisible={deleteModal}
                    onBackdropPress={() =>
                        setDeleteModal(false)
                    }
                >
                    <View
                        style={
                            styles.modalContainer
                        }
                    >
                        <Text
                            style={
                                styles.modalTitle
                            }
                        >
                            Delete Note
                        </Text>

                        <Text
                            style={
                                styles.modalText
                            }
                        >
                            Are you sure you want
                            to delete this note?
                        </Text>

                        <View
                            style={
                                styles.modalActions
                            }
                        >
                            <Pressable
                                style={
                                    styles.cancelButton
                                }
                                onPress={() =>
                                    setDeleteModal(
                                        false
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.cancelText
                                    }
                                >
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                style={
                                    styles.deleteButton
                                }
                                onPress={
                                    handleDelete
                                }
                            >
                                <Text
                                    style={
                                        styles.deleteText
                                    }
                                >
                                    Delete
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={profileModal}
                    onBackdropPress={() =>
                        setProfileModal(false)
                    }
                >
                    <View
                        style={
                            styles.profileModal
                        }
                    >
                        <Image
                            source={require('../../assets/images/pfp.png')}
                            style={
                                styles.profileImage
                            }
                        />

                        <Text
                            style={
                                styles.profileName
                            }
                        >
                            {user?.username}
                        </Text>

                        <Pressable
                            style={
                                styles.logoutButton
                            }
                            onPress={
                                handleLogout
                            }
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color="#fff"
                            />

                            <Text
                                style={
                                    styles.logoutText
                                }
                            >
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </Modal>
            </SafeAreaView>
        </ImageBackground>
    )
}

const createStyles = (theme: any) =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
            paddingHorizontal: 18,
        },

        background: {
            flex: 1,
            backgroundColor:
                theme.background,
        },

        header: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
                'space-between',
        },

        headerLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
        },

        menuButton: {
            width: 46,
            height: 46,
            borderRadius: 16,
            backgroundColor:
                theme.surface,

            justifyContent: 'center',
            alignItems: 'center',

            borderWidth: 1,
            borderColor: theme.border,
        },

        heading: {
            color: theme.textBright,
            fontSize: 18,
            fontFamily:
                'JetBrains-Bold',
        },

        avatarWrapper: {
            width: 50,
            height: 50,
            borderRadius: 18,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor:
                theme.primary,
        },

        avatar: {
            width: '100%',
            height: '100%',
        },

        themeButton: {
            width: 46,
            height: 46,
            borderRadius: 16,
            backgroundColor:
                theme.surface,

            justifyContent: 'center',
            alignItems: 'center',

            borderWidth: 1,
            borderColor: theme.border,
        },

        searchContainer: {
            marginTop: 28,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
                theme.surface,

            borderRadius: 18,
            paddingHorizontal: 16,

            borderWidth: 1,
            borderColor: theme.border,

            height: 56,
            gap: 10,
        },

        searchInput: {
            flex: 1,
            color: theme.textBright,
            fontSize: 15,
            fontFamily:
                'JetBrains-Regular',
        },

        listContent: {
            paddingTop: 22,
            paddingBottom: 120,
            gap: 16,
        },

        noteCard: {
            backgroundColor:
                theme.surface,

            borderRadius: 10,
            padding: 18,

            borderWidth: 1,
            borderColor: theme.border,
        },

        noteHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
                'space-between',
        },

        noteIconContainer: {
            width: 38,
            height: 38,
            borderRadius: 12,

            backgroundColor:
                'rgba(97,175,239,0.12)',

            justifyContent: 'center',
            alignItems: 'center',
        },

        noteTitle: {
            color: theme.textBright,
            fontSize: 18,
            marginTop: 16,
            fontFamily:
                'JetBrains-Bold',
        },

        noteDescription: {
            color: theme.text,
            marginTop: 8,
            lineHeight: 22,
            fontSize: 14,
            fontFamily:
                'JetBrains-Regular',
        },

        noteFooter: {
            marginTop: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
                'space-between',
        },

        noteDate: {
            color: theme.text,
            fontSize: 12,
            fontFamily:
                'JetBrains-Regular',
        },

        tag: {
            backgroundColor:
                'rgba(198,120,221,0.16)',

            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 100,
        },

        tagText: {
            color: theme.secondary,
            fontSize: 12,
            fontFamily:
                'JetBrains-Medium',
        },

        fab: {
            position: 'absolute',
            bottom: 30,
            right: 24,

            width: 64,
            height: 64,

            borderRadius: 22,

            backgroundColor:
                theme.primary,

            justifyContent: 'center',
            alignItems: 'center',
        },

        modalContainer: {
            backgroundColor:
                theme.surface,

            borderRadius: 24,
            padding: 24,

            borderWidth: 1,
            borderColor: theme.border,
        },

        modalTitle: {
            color: theme.textBright,
            fontSize: 22,
            fontFamily:
                'JetBrains-Bold',
        },

        modalText: {
            color: theme.text,
            marginTop: 12,
            lineHeight: 24,
            fontSize: 14,
        },

        modalActions: {
            flexDirection: 'row',
            justifyContent:
                'flex-end',

            gap: 12,
            marginTop: 28,
        },

        cancelButton: {
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 14,
            backgroundColor:
                theme.background,
        },

        deleteButton: {
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 14,
            backgroundColor:
                theme.error,
        },

        cancelText: {
            color: theme.textBright,
            fontFamily:
                'JetBrains-Medium',
        },

        deleteText: {
            color: '#fff',
            fontFamily:
                'JetBrains-Medium',
        },

        profileModal: {
            backgroundColor:
                theme.surface,

            borderRadius: 24,
            padding: 28,
            alignItems: 'center',

            borderWidth: 1,
            borderColor: theme.border,
        },

        profileImage: {
            width: 90,
            height: 90,
            borderRadius: 100,
            borderWidth: 3,
            borderColor:
                theme.primary,
        },

        profileName: {
            color: theme.textBright,
            fontSize: 20,
            marginTop: 18,
            fontFamily:
                'JetBrains-Bold',
        },

        logoutButton: {
            marginTop: 28,
            backgroundColor:
                theme.error,

            paddingHorizontal: 22,
            paddingVertical: 14,

            borderRadius: 16,

            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },

        logoutText: {
            color: '#fff',
            fontSize: 15,
            fontFamily:
                'JetBrains-Bold',
        },
    })
