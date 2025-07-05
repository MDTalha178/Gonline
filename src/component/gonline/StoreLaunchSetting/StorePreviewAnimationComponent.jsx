const ConfettiPiece = ({ delay, duration }) => (
        <div 
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
            }}
        />
    );

export default ConfettiPiece