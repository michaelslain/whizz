import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import TrashImage from '../assets/trash.png'
import Storage from '../Storage'

export default function NotesTab({
    title,
    date,
    id,
    handleReload,
    setCurrentTab,
}) {
    const handleDeleteNote = async () => {
        await Storage.notes.deleteNote({ id })
        handleReload()
    }

    const openTab = () => setCurrentTab(id)

    date = new Date(date).toUTCString()

    return (
        <TouchableOpacity onPress={openTab}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
                <TouchableOpacity
                    style={styles.deleteContainer}
                    onPress={handleDeleteNote}
                >
                    <Image style={styles.deleteImage} source={TrashImage} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        display: 'flex',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        position: 'absolute',
        left: 0,
    },
    date: {
        color: 'grey',
        fontSize: 15,
        width: '50%',
        position: 'relative',
        left: 150,
    },
    deleteContainer: {
        position: 'absolute',
        right: 0,
    },
    deleteImage: {
        width: 18,
        height: 28,
        overflow: 'visible',
    },
})
