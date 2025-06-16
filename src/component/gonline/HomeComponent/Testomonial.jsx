import ComingSoonBanner from "../../common/ComingSoon";
import testimonials from "../../../data/testomonial";
import { Star } from "lucide-react";

const TestimonialsSection = () => {

  return (
    <section className="py-20 bg-gradient-to-br  bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 blur-sm">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Merchants Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful shop owners who have transformed their businesses with GoLine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-purple-600 font-medium">{testimonial.business}</div>
                </div>
              </div>
            </div>
          ))} 
        </div>
          {/* Coming Soon Overlay */}
      </div>
     <ComingSoonBanner 
        text1={"We're collecting amazing testimonials from our merchant community."}
        text2={"Real stories from real businesses will be featured here"}
    />    
    </section>
  );
};

export default TestimonialsSection