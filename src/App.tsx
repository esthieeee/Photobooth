import { useState } from 'react'
import Camera from './components/Camera'
import Decorations from './components/Decorations'
import './App.css'

function App() {
    const [photos, setPhotos] = useState<string[]>([])

    function addPhoto(photo: string) {
        setPhotos(previous => {
            if (previous.length >= 3) return previous

            return [...previous, photo]
        })
    }

   return (
    <main>
        <h1>My Photobooth</h1>
        <Camera onCapture={addPhoto} />
        <Decorations photos={photos} />
    </main>
)
}

export default App
