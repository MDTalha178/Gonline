const AuthFooter = ({currentPage, setCurrentPage}) => {
  return (
     <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
            {currentPage === 'signup' ? (
            <>
                Already have an account?{' '}
                <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 hover:text-purple-700 font-medium"
                >
                Sign In
                </button>
            </>
            ) : (
            <>
                Don't have an account?{' '}
                <button
                onClick={() => setCurrentPage('signup')}
                className="text-purple-600 hover:text-purple-700 font-medium"
                >
                Sign Up
                </button>
            </>
            )}
        </p>
     </div>
  );
}

export default AuthFooter;