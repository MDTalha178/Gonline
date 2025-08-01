const HeaderTab = ({activeTab}) =>{
    return(
        <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
            Welcome {activeTab === 'login' ? 'Back' : ''}
            </h1>
            <p className="text-gray-600 font-light">
            {activeTab === 'login' 
                ? 'Sign in to continue shopping' 
                : 'Create your account to get started'
            }
            </p>
        </div>
    )
}

export default HeaderTab;