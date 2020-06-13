import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function NavTab({ title, setPage }) {
    const handleChangePage = () => setPage(title.toLowerCase())

    return (
        <TouchableOpacity onPress={handleChangePage}>
            <Text style={styles.tab}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tab: {
        fontSize: 20,
        marginBottom: 40,
    },
})
