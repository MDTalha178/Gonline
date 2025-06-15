const AuthToogle = ({currentPage, setCurrentPage}) =>{
    return(
     <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
            onClick={() => setCurrentPage('signup')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 'signup'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
        >
            Sign Up
        </button>
        <button
            onClick={() => setCurrentPage('login')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 'login'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
        >
            Login
        </button>
    </div>
    )
}

export default AuthToogle;