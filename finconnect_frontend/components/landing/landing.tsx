export default function LandingPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white font-sans">
        {/* Hero Section */}
        <section className="text-center py-24 px-5">
          <h1 className="text-6xl font-extrabold leading-tight">Your AI Financial Advisor</h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto opacity-80">
            Smart investment tracking, debt management, and financial planning tailored just for you.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <button 
              className="bg-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/Auth/signin'}
            >
              Get Started
            </button>
            <button className="border border-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition duration-300">
              Learn More
            </button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-5 text-center">
          <h2 className="text-4xl font-bold">Why Choose Us?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold">Investment Tracking</h3>
              <p className="mt-3 opacity-80">Monitor and grow your investments with AI insights.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold">Debt Management</h3>
              <p className="mt-3 opacity-80">Plan and clear debts efficiently with AI strategies.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold">Financial Planning</h3>
              <p className="mt-3 opacity-80">AI-driven financial plans tailored to your goals.</p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 text-center bg-blue-600">
          <h2 className="text-4xl font-bold">Ready to Take Control of Your Finances?</h2>
          <p className="mt-5 text-xl opacity-90">Sign up today and let AI guide your financial future.</p>
          <button 
            className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => window.location.href = '/Auth/signup'}
          >
            Sign Up Now
          </button>
        </section>
      </div>
    );
}
