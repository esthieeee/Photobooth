
import { useState } from 'react'
import './Decorations.css'

type Sticker = {
    id: number
    emoji: string
    x: number
    y: number
}

function Decorations() {
    const [frameColor, setFrameColor] = useState('white')
    const [stickers, setStickers] = useState<Sticker[]>([])

    function addSticker(emoji: string) {
    setStickers(previous => [
        ...previous,
        {
            id: Date.now(),
            emoji: emoji,
            x: 50,
            y: 50
        }
    ])
}

function moveSticker(id: number, x: number, y: number) {
    setStickers(previous =>
        previous.map(sticker =>
            sticker.id === id
                ? { ...sticker, x: x, y: y }
                : sticker
        )
    )
}

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

           <button onClick={() => setFrameColor('gingham')}>
    Blue Gingham
</button>

<button onClick={() => setFrameColor('polkadot')}>
    Vintage Polka Dot
</button>

<button onClick={() => setFrameColor('denim')}>
    Denim Filmstrip
</button>


<button onClick={() => setFrameColor('denim')}>
    Denim Filmstrip
</button>

<h3>Choose Stickers</h3>

<button onClick={() => addSticker('🎀')}>🎀</button>

<button onClick={() => addSticker('⭐')}>⭐</button>

<button onClick={() => addSticker('🤍')}>🤍</button>

<button onClick={() => addSticker('🍒')}>🍒</button>

<button onClick={() => addSticker('🌸')}>🌸</button>

<button onClick={() => addSticker('🦋')}>🦋</button>

<button onClick={() => setStickers([])}>
    Clear All Stickers
</button>
 
<div
    className={`photostrip ${
        frameColor === 'gingham'
            ? 'frame-gingham'
            : frameColor === 'polkadot'
                ? 'frame-polkadot'
                : frameColor === 'denim'
                    ? 'frame-denim'
                    : ''
    }`}
    style={{
        backgroundColor:
            frameColor === 'gingham' ||
            frameColor === 'polkadot' ||
            frameColor === 'denim'
                ? 'white'
                : frameColor
    }}
>





                <div className="photo-placeholder">
                    Photo 1
                </div>

                <div className="photo-placeholder">
                    Photo 2
                </div>

                <div className="photo-placeholder">
    Photo 3
</div>

<div className="sticker-area">
    {stickers.map(sticker => (
        <span
            key={sticker.id}
            className="sticker"
            style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`
            }}
            onPointerDown={event => {
                event.currentTarget.setPointerCapture(
                    event.pointerId
                )
            }}
            onPointerMove={event => {
                if (event.buttons !== 1) return

                const strip = event.currentTarget.closest(
                    '.photostrip'
                )

                if (!strip) return

                const rect = strip.getBoundingClientRect()

                const x =
                    ((event.clientX - rect.left) / rect.width) * 100

                const y =
                    ((event.clientY - rect.top) / rect.height) * 100

                moveSticker(
                    sticker.id,
                    Math.max(0, Math.min(100, x)),
                    Math.max(0, Math.min(100, y))
                )
            }}
            onDoubleClick={() =>
                setStickers(previous =>
                    previous.filter(s => s.id !== sticker.id)
                )
            }
            title="Drag to move, double-click to remove"
        >
            {sticker.emoji}
        </span>
    ))}
</div>



            </div>
        </div>
    )
}

export default Decorations
