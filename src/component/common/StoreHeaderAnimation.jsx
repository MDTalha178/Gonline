
const StoreSectionHederAnimation = ({mainHeading, subHeading, footerText }) => {

    return (
        <div className=" bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-300/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gray-100/10 to-transparent rounded-full blur-2xl animate-spin-slow"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gray-400/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header Section with Animation */}
                <div className="text-center mb-16 transform transition-all duration-1000 ease-out">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full mb-8 shadow-2xl animate-bounce-slow">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    
                    <h1 className="text-6xl font-thin text-gray-900 mb-6 tracking-tight animate-fade-in-up">
                        Upcoming Sales
                        <span className="block text-4xl font-light text-gray-600 mt-2">
                            Grab The Deals
                        </span>
                    </h1>
                    
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto animate-pulse"></div>
                </div>

                {/* Footer Animation */}
                {/* <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-2 text-gray-500 animate-fade-in-up delay-500">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
                        <span className="text-sm font-light tracking-wider">SALES MANAGEMENT</span>
                        <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
                    </div>
                </div> */}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes spin-slow {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-1000 { animation-delay: 1s; }
            `}</style>
        </div>
    )
}

export default StoreSectionHederAnimation