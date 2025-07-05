import { useEffect, useState } from "react";
import{ Menu, X , Store, ShoppingCart} from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({leftContent, rightContent, leftbutton=[], rightbutton=[], options={}}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {setUserTypeModal} = options

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
             <Link to={'/'}><Store className="w-6 h-6 text-white" /></Link> 
            </div>

            {/* Left side conent for navabar */}
            {leftContent && leftContent.map((item, index) => 
            <span key={index} className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {item}
            </span>
            )}
           
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* left side conent for navbar */}
            {rightContent && rightContent.map((item, index) => 
                <a key={index} href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">{item}</a>
            )}
            
            {rightbutton  && rightbutton.map((item, index) =>
                <button key={index} onClick={() => setUserTypeModal(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    {item}   
                </button>
                
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl">
            <nav className="flex flex-col p-6 space-y-4">
              {rightContent && rightContent.map((item, index) => 
                <a key={index} href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">{item}</a>
              )}
              {rightbutton  && rightbutton.map((item, index) =>
                <button key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  <Link to={"/login"}>{item} </Link>   
                </button>
                
            )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
