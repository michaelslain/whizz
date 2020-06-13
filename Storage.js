import AsyncStorage from '@react-native-community/async-storage'

// gets data from local storage
async function getData(keyword) {
    try {
        return new Promise(async resolve => {
            const data = await AsyncStorage.getItem('data')
            const json = await JSON.parse(data)

            if (keyword == null) {
                resolve(json)
                return
            }
            if (json[keyword] == null) {
                resolve(json)
                return
            }

            resolve(json[keyword])
        })
    } catch (err) {
        throw err
    }
}

export default {
    // checks if the key "data" has already been set in local storage
    storageInit: async () => {
        try {
            return new Promise(async resolve => {
                const data = await AsyncStorage.getItem('data')

                if (data == null) {
                    const object = {
                        notes: [],
                    }

                    await AsyncStorage.setItem('data', JSON.stringify(object))
                }

                resolve()
            })
        } catch (err) {
            throw err
        }
    },
    getData,
    // functions that have to do with manupulating note data
    notes: {
        // creates new note
        createNote: async () => {
            try {
                return new Promise(async resolve => {
                    const data = await getData()
                    const { notes } = data

                    let id
                    while (true) {
                        const num = Math.floor(Math.random() * 100000000)
                        let isUnique = true

                        notes.forEach(item => {
                            if (item.id === num) isUnique = false
                        })

                        if (isUnique) {
                            id = num
                            break
                        }
                    }
                    const defaultTitle = 'New Note'
                    const defaultText =
                        'Wassup my good sir wanna sip on that fizz?'
                    const date = Date.now()

                    const newNote = {
                        id,
                        title: defaultTitle,
                        text: defaultText,
                        date,
                    }

                    notes.push(newNote)
                    data.notes = notes

                    await AsyncStorage.setItem('data', JSON.stringify(data))

                    resolve()
                })
            } catch (err) {
                throw err
            }
        },
        // removes a note by id
        deleteNote: async ({ id }) => {
            try {
                return new Promise(async resolve => {
                    const data = await getData()
                    let { notes } = data

                    notes = notes.filter(note => note.id !== id)
                    data.notes = notes

                    await AsyncStorage.setItem('data', JSON.stringify(data))

                    resolve()
                })
            } catch (err) {
                throw err
            }
        },
        // changes title of note by id
        changeTitle: async ({ id, text }) => {
            try {
                return new Promise(async resolve => {
                    const data = await getData()
                    const { notes } = data

                    data.notes = notes.map(note => {
                        if (note.id === id) {
                            note.title = text
                            return note
                        }
                        return note
                    })

                    await AsyncStorage.setItem('data', JSON.stringify(data))

                    resolve()
                })
            } catch (err) {
                throw err
            }
        },
        // changes body text of note by id
        changeText: async ({ id, text }) => {
            try {
                return new Promise(async resolve => {
                    const data = await getData()
                    const { notes } = data

                    data.notes = notes.map(note => {
                        if (note.id === id) {
                            note.text = text
                            return note
                        }
                        return note
                    })

                    await AsyncStorage.setItem('data', JSON.stringify(data))

                    resolve()
                })
            } catch (err) {
                throw err
            }
        },
        // changes last date edited of note by id
        changeDate: async ({ id }) => {
            try {
                return new Promise(async resolve => {
                    const data = await getData()
                    const { notes } = data

                    const date = Date.now()

                    data.notes = notes.map(note => {
                        if (note.id === id) {
                            note.date = date
                            return note
                        }
                        return note
                    })

                    await AsyncStorage.setItem('data', JSON.stringify(data))

                    resolve()
                })
            } catch (err) {
                throw err
            }
        },
        // gets specific note data by id
        getNote: async ({ id }) => {
            try {
                return new Promise(async resolve => {
                    const data = await getData('notes')
                    const note = await data.find(item => item.id === id)
                    resolve(note)
                })
            } catch (err) {
                throw err
            }
        },
    },
}
