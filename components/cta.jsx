import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function Cta({ children, color = 'blue', callback }) {
    const extraStyle = {
        backgroundColor: color,
    }

    return (
        <TouchableOpacity onPress={callback}>
            <Text style={{ ...styles.button, ...extraStyle }}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        padding: 20,
        marginRight: 30,
        color: 'white',
        borderRadius: 5,
        overflow: 'hidden',
    },
})
