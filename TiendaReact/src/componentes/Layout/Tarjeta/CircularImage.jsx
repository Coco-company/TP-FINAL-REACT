const CircularImage = (id, imageUrl) => {
  return (
    <svg width="150" height="150" viewBox="0 0 200 200">
        <defs>
        <mask id="circleMask">
            {/* White reveals, black hides */}
            <circle cx="100" cy="100" r="200" fill="white" />
        </mask>
        </defs>
        <image href={imageUrl} key={id} width="100%" height="100%" mask="url(#circleMask)" preserveAspectRatio="xMidYMid slice" />
    </svg>
  )
};

export default CircularImage;