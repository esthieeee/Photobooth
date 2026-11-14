import { useEffect, useRef, useState} from 'react'

function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMirrored, setIsMirrored] = useState(false)

    useEffect(() => {
        let stream: MediaStream | null = null
        let cancelled = false

        async function startCamera() {
            try {
                const cameraStream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false,
                    })

                if (cancelled) {
                    cameraStream.getTracks().forEach((track) => track.stop())
                    return
                }

                stream = cameraStream

                if (videoRef.current) {
                    videoRef.current.srcObject = cameraStream
                }
            } catch (error) {
                console.error('Could not access the camera:', error)
            }
        }

        startCamera()

        return () => {
            cancelled = true
            stream?.getTracks().forEach((track) => track.stop())
        }
    }, [])

    return (
        <div className ="camera-container">
            <video
                ref={videoRef}
                className="camera-preview"
                style = {{
                    transform: isMirrored ? 'scalex(-1)' : 'none',
                }}
                autoPlay
                playsInline
                muted
            />
            <button
                type='button'
                onClick={() => setIsMirrored((previous) => !previous)}
                >
                Flip preview
            </button>
        </div>

    )
}

export default Camera