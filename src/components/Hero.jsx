import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to T25Apps
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Building innovative apps that make a difference. 
            Explore our collection of cutting-edge applications designed to solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg inline-block"
            >
              View Our Apps
            </a>
            <Link
              to="/contribution"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors shadow-lg"
            >
              Support Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

