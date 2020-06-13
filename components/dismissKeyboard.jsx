import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

export default function DismissKeyboard({ children }) {
    const handleCloseKeyboard = () => Keyboard.dismiss()

    return (
        <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
            {children}
        </TouchableWithoutFeedback>
    )
}
