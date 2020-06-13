import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import Burger from '../assets/burger.png'

export default function Header({ setPage, title = 'My Title' }) {
    const handleChangePage = () => setPage('nav')

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleChangePage}>
                <Image style={styles.burger} source={Burger} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 3,
    },
    burger: {
        left: 0,
        width: 30,
        height: 30,
        position: 'absolute',
    },
    title: {
        fontSize: 25,
        color: 'grey',
        position: 'absolute',
        right: 0,
    },
})
