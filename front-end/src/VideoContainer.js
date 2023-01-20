import './VideoContainer.scss';

function VideoContainer ({ video, children }) {
    return (
        <section className="video-container">
            <video muted loop autoPlay playsInline src={video} />
            <main>{children}</main>
        </section>
    )
}

export default VideoContainer