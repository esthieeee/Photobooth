import { useEffect, useRef } from 'react'

function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null)

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
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
        />
    )
}

export default Camera