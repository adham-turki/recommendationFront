
const YouTubeVideo = ({ url, title, description }) => {
  // Extract the video ID from the URL
  const videoId = url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-video-wrapper flex flex-col md:flex-row items-center justify-center p-6 rounded-lg border-black space-y-6 md:space-y-0">
      {/* Video and Text Content in a single card */}
      <div className="w-full md:w-2/3 rounded-lg overflow-hidden shadow-lg">
        {/* Video */}
        <div className="youtube-video-container" style={{ aspectRatio: '16/9' }}>
          <iframe
            title={title || "YouTube Video"}
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', borderRadius: '8px 8px 0 0' }}
          ></iframe>
        </div>

        {/* Text Content */}
        <div className="video-content-container p-6 text-center text-[#1D3557]  bg-slate-50">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-lg text-[#5342a9] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideo;
