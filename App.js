import React, { useState, useEffect } from 'react'
import Storage from './Storage'

import Nav from './components/pages/nav'
import Notes from './components/pages/notes'

export default function App() {
    const [page, setPage] = useState('nav')
    const [canStorage, setCanStorage] = useState(false)

    useEffect(() => {
        handleStorageInit()
    }, [])

    const handleStorageInit = async () => {
        await Storage.storageInit()
        setCanStorage(true)
    }

    switch (page) {
        case 'nav':
            return <Nav setPage={setPage} />
        case 'notes':
            return <Notes setPage={setPage} canStorage={canStorage} />
        default:
            return <Nav setPage={setPage} />
    }
}
