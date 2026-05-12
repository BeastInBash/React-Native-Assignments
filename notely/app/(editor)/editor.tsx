import { useTheme } from '@/libs/hooks/useTheme'
import { NotesStorage } from '@/libs/notes-storage'
import { Note } from '@/types/notes'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import Toast from 'react-native-toast-message'
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    actions,
    RichEditor,
    RichToolbar,
} from 'react-native-pell-rich-editor'
import * as Crypto from 'expo-crypto'

export default function Editor() {
    const { theme } = useTheme()

    const styles = createStyles(theme)

    const richText =
        useRef<RichEditor>(null)

    const [title, setTitle] =
        useState('')

    const [content, setContent] =
        useState('')

    const handleSave = async () => {
        try {
            if (!title.trim()) {
                Toast.show({
                    type: 'error',
                    text1:
                        'Validation Error',
                    text2:
                        'Title missing',
                })

                return
            }

            if (!content.trim()) {
                Toast.show({
                    type: 'error',
                    text1:
                        'Validation Error',
                    text2:
                        'Please write some content',
                })

                return
            }

            const note: Note = {
                id: Crypto.randomUUID(),
                title,
                content,
                createdAt:
                    new Date().toISOString(),
                updatedAt:
                    new Date().toISOString(),
            }

            await NotesStorage.addNote(
                note
            )

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2:
                    'Note saved successfully',
            })

            router.back()
        } catch (error) {
            console.error(error)

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    'Failed to save note',
            })
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
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

                    <Text
                        style={styles.heading}
                    >
                        New Note
                    </Text>

                    <Pressable
                        style={
                            styles.saveButton
                        }
                        onPress={
                            handleSave
                        }
                    >
                        <Ionicons
                            name="checkmark"
                            size={22}
                            color="#fff"
                        />
                    </Pressable>
                </View>

                <ScrollView
                    style={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={
                        false
                    }
                >
                    <TextInput
                        style={
                            styles.titleInput
                        }
                        placeholder="Note title..."
                        placeholderTextColor={
                            theme.text
                        }
                        value={title}
                        onChangeText={
                            setTitle
                        }
                    />

                    <View
                        style={
                            styles.editorContainer
                        }
                    >
                        <RichEditor
                            ref={richText}
                            placeholder="Start writing your thoughts..."
                            onChange={
                                setContent
                            }
                            style={
                                styles.editor
                            }
                            initialHeight={
                                400
                            }
                            editorStyle={{
                                backgroundColor:
                                    theme.surface,

                                color:
                                    theme.textBright,

                                caretColor:
                                    theme.primary,

                                placeholderColor:
                                    theme.text,

                                contentCSSText: `
                                    font-size: 16px;
                                    color: ${theme.textBright};
                                    padding: 16px;
                                    line-height: 26px;
                                    background-color: ${theme.surface};
                                    font-family: JetBrains-Regular;
                                `,
                            }}
                        />
                    </View>
                </ScrollView>

                <RichToolbar
                    editor={richText}
                    selectedIconTint={
                        theme.primary
                    }
                    iconTint={theme.text}
                    actions={[
                        actions.undo,
                        actions.redo,
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.heading1,
                        actions.heading2,
                        actions.insertLink,
                        actions.keyboard,
                    ]}
                    style={styles.toolbar}
                />
            </KeyboardAvoidingView>
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

        header: {
            paddingHorizontal: 18,
            paddingVertical: 14,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
                'space-between',

            borderBottomWidth: 1,
            borderBottomColor:
                theme.border,
        },

        heading: {
            color: theme.textBright,
            fontSize: 20,
            fontFamily:
                'JetBrains-Bold',
        },

        iconButton: {
            width: 42,
            height: 42,

            borderRadius: 14,

            backgroundColor:
                theme.surface,

            alignItems: 'center',
            justifyContent: 'center',

            borderWidth: 1,
            borderColor: theme.border,
        },

        saveButton: {
            width: 42,
            height: 42,

            borderRadius: 14,

            backgroundColor:
                theme.primary,

            alignItems: 'center',
            justifyContent: 'center',
        },

        content: {
            flex: 1,
            paddingHorizontal: 18,
            paddingTop: 20,
        },

        titleInput: {
            color: theme.textBright,
            fontSize: 24,
            fontFamily:
                'JetBrains-Bold',

            marginBottom: 10,
            marginTop: 20,
        },

        editorContainer: {
            minHeight: 500,

            borderRadius: 24,
            overflow: 'hidden',

            borderWidth: 1,
            borderColor: theme.border,

            backgroundColor:
                theme.surface,
        },

        editor: {
            backgroundColor:
                theme.surface,
        },

        toolbar: {
            backgroundColor:
                theme.surface,

            borderTopWidth: 1,
            borderTopColor:
                theme.border,

            paddingVertical: 10,
        },
    })
