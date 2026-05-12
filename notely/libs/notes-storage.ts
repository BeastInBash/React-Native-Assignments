// This is to store the notes in local storage of the device. Untill I build Backend for the application 
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Note } from '@/types/notes'

const NOTES_KEY = 'notes'

export const NotesStorage = {
    async getNotes(): Promise<Note[]> {
        try {
            const notes = await AsyncStorage.getItem(NOTES_KEY)

            return notes ? JSON.parse(notes) : []
        } catch (error) {
            console.error(error)
            return []
        }
    },

    async saveNotes(notes: Note[]) {
        try {
            await AsyncStorage.setItem(
                NOTES_KEY,
                JSON.stringify(notes)
            )
        } catch (error) {
            console.error(error)
        }
    },

    async addNote(note: Note) {
        const notes = await this.getNotes()

        const updated = [note, ...notes]

        await this.saveNotes(updated)
    },

    async deleteNote(id: string) {
        const notes = await this.getNotes()

        const filtered = notes.filter(
            (note) => note.id !== id
        )

        await this.saveNotes(filtered)
    },

    async updateNote(updatedNote: Note) {
        const notes = await this.getNotes()

        const updated = notes.map((note) =>
            note.id === updatedNote.id
                ? updatedNote
                : note
        )

        await this.saveNotes(updated)
    }
}
