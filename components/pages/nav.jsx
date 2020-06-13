import React from 'react'
import { StyleSheet, View } from 'react-native'

import NavTab from '../navTab'

export default function Nav({ setPage }) {
    const tabs = ['Notes', 'Todo', 'Daily', 'Workout']

    return (
        <View style={styles.container}>
            {tabs.map((title, i) => (
                <NavTab key={i} setPage={setPage} title={title} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
})
