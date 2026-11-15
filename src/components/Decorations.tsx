
import { useState } from 'react'
import './Decorations.css'

function Decorations() {
    const [frameColor, setFrameColor] = useState('white')

    return (
        <div>
            <h2>Decorate Your Photostrip</h2>

            <h3>Choose a Frame</h3>

            <button onClick={() => setFrameColor('white')}>
                Classic White
            </button>

            <button onClick={() => setFrameColor('black')}>
                Vintage Black
            </button>

            <button onClick={() => setFrameColor('#86182e')}>
                Cherry Red
            </button>

            <div className="photostrip"
                 style={{ backgroundColor: frameColor }}>

                <div className="photo-placeholder">
                    Photo 1
                </div>

                <div className="photo-placeholder">
                    Photo 2
                </div>

                <div className="photo-placeholder">
                    Photo 3
                </div>

            </div>
        </div>
    )
}

export default Decorations
