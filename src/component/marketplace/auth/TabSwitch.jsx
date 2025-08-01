const TabSwitch = ({ activeTab, setActiveTab }) => {
    return(
    <div className="relative bg-gray-100 rounded-lg p-1 mb-8">
      <div className="grid grid-cols-2">
        <button
          onClick={() => setActiveTab('login')}
          className={`relative px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'login' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`relative px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'signup' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Sign Up
        </button>
      </div>
      <div
        className={`absolute top-1 bottom-1 w-1/2 bg-gray-900 rounded-md transition-transform duration-300 ease-out ${
          activeTab === 'signup' ? 'transform translate-x-full' : ''
        }`}
      />
    </div>
    )
}

export default TabSwitch;