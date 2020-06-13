import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native'
import Storage from '../../Storage'

import Header from '../header'
import NotesTab from '../notesTab'
import Cta from '../cta.jsx'
import NotesEditor from '../notesEditor.jsx'
import DismissKeyboard from '../dismissKeyboard'

export default function Notes({ setPage, canStorage }) {
    const [tabs, setTabs] = useState(null)
    const [reloadCounter, setReloadCounter] = useState(0)
    const [currentTab, setCurrentTab] = useState(null)

    useEffect(() => {
        handleGetNotes()
    }, [canStorage, reloadCounter])

    const handleGetNotes = async () => {
        if (canStorage) {
            const data = await Storage.getData('notes')
            data.sort((a, b) => b.date - a.date)
            setTabs(data)
        }
    }

    const handleCreateNewNote = async () => {
        if (canStorage) {
            await Storage.notes.createNote()
            handleReload()
        }
    }

    const handleReload = () => setReloadCounter(reloadCounter + 1)
    if (currentTab == null) {
        return (
            <View style={styles.contianer}>
                <Header setPage={setPage} title={'Notes'} />
                <SafeAreaView style={styles.tabs}>
                    {tabs != null && tabs.length === 0 ? (
                        <Text style={styles.message}>
                            Press the "ADD" button to create a new note
                        </Text>
                    ) : (
                        <FlatList
                            data={tabs}
                            renderItem={({ item }) => (
                                <NotesTab
                                    id={item.id}
                                    title={item.title}
                                    date={item.date}
                                    handleReload={handleReload}
                                    setCurrentTab={setCurrentTab}
                                />
                            )}
                            keyExtractor={({ id }) => String(id)}
                        ></FlatList>
                    )}
                </SafeAreaView>
                <View style={styles.buttonsContainer}>
                    <Cta callback={handleCreateNewNote}>ADD</Cta>
                </View>
            </View>
        )
    }

    return (
        <DismissKeyboard>
            <View style={styles.contianer}>
                <Header setPage={setPage} title={'Notes'} />
                <NotesEditor
                    id={currentTab}
                    setCurrentTab={setCurrentTab}
                    handleReload={handleReload}
                />
            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        padding: 60,
        paddingLeft: 60,
        paddingRight: 60,
        display: 'flex',
    },
    tabs: {
        marginTop: 60,
        height: '80%',
        marginBottom: 30,
        width: '100%',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    message: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'lightgrey',
        fontSize: 30,
        marginTop: '100%',
    },
})
