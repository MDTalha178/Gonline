import { ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Launch Your Online Empire?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
          Join over 10,000 successful merchants who have transformed their businesses with Gonline. 
          Start your free trial today - no credit card required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
            Schedule Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-3" />
            <div className="text-white font-semibold">14-Day Free Trial</div>
            <div className="text-purple-100">No commitment required</div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-3" />
            <div className="text-white font-semibold">Setup in Minutes</div>
            <div className="text-purple-100">Launch your shop today</div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-3" />
            <div className="text-white font-semibold">24/7 Support</div>
            <div className="text-purple-100">We're here to help</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection