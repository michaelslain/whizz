import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
import Storage from '../Storage'
import BackImage from '../assets/back.png'

export default function NotesEditor({ id, setCurrentTab, handleReload }) {
    const [textValue, setTextValue] = useState(null)
    const [titleValue, setTitleValue] = useState(null)
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)

    useEffect(() => {
        handleUpdateDate()

        return () => handleUpdateDate()
    }, [])

    useEffect(() => {
        if (id != null) handleGetData()
    }, [id])

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', handleOnKeyboardOpen)
        Keyboard.addListener('keyboardDidHide', handleOnKeyboardClose)

        return () => {
            Keyboard.removeListener('keyboardDidShow', handleOnKeyboardOpen)
            Keyboard.removeListener('keyboardDidHide', handleOnKeyboardClose)
        }
    }, [setKeyboardIsOpen])

    const handleGetData = async () => {
        const note = await Storage.notes.getNote({ id })
        setTextValue(note.text)
        setTitleValue(note.title)
    }

    const handleGoBack = () => setCurrentTab(null)

    const handleUpdateText = value => {
        setTextValue(value)
        Storage.notes.changeText({ id, text: value })
    }
    const handleUpdateTitle = async value => {
        setTitleValue(value)
        await Storage.notes.changeTitle({ id, text: value })
        handleReload()
    }
    const handleUpdateDate = async () => {
        await Storage.notes.changeDate({ id })
        handleReload()
    }

    const handleOnKeyboardOpen = () => setKeyboardIsOpen(true)
    const handleOnKeyboardClose = () => setKeyboardIsOpen(false)

    if (textValue == null || titleValue == null) return <View></View>

    const extraStyle = keyboardIsOpen ? { height: '53%' } : {}

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={BackImage} style={styles.back} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleLable}>Title: </Text>
                    <TextInput
                        style={styles.title}
                        value={titleValue}
                        onChangeText={handleUpdateTitle}
                    />
                </View>
            </View>
            <TextInput
                style={{ ...styles.input, ...extraStyle }}
                multiline={true}
                onChangeText={handleUpdateText}
                value={textValue}
                onPresss={handleOnKeyboardOpen}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginBottom: 30,
        width: '100%',
        height: '90%',
    },
    header: {
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        bottom: 10,
    },
    input: {
        backgroundColor: '#f5f5f5',
        height: '90%',
        borderRadius: 5,
        fontSize: 18,
        lineHeight: 30,
        padding: 20,
    },
    back: {
        height: 30,
        width: 20,
        overflow: 'visible',
    },
    titleContainer: {
        position: 'absolute',
        right: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    titleLable: { fontSize: 30 },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: 'lightgrey',
    },
})
