import { useEffect, useRef, useState} from 'react'

function Camera({ onCapture }: { onCapture: (photo: string) => void }) {    const videoRef = useRef<HTMLVideoElement>(null)
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

    function capturePhoto() {
    const video = videoRef.current

    if (!video || !video.videoWidth) return

    const canvas = document.createElement('canvas')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')

    if (!context) return

    if (isMirrored) {
        context.translate(canvas.width, 0)
        context.scale(-1, 1)
    }

    context.drawImage(video, 0, 0)

    const photo = canvas.toDataURL('image/png')

    onCapture(photo)
}

   return (
    <div className="camera-container">
        <video
            ref={videoRef}
            className="camera-preview"
            style={{
                transform: isMirrored ? 'scaleX(-1)' : 'none',
            }}
            autoPlay
            playsInline
            muted
        />

        <button
            type="button"
            onClick={() => setIsMirrored((previous) => !previous)}
        >
            Flip preview
        </button>

        <button
            type="button"
            onClick={capturePhoto}
        >
            Take Photo
        </button>
    </div>
)
}

export default Camera