import React from 'react'

function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              T25Apps is an idea to focus and solve real world problems byreating 
              innovative applications. We believe in the power 
              of technology to make people's lives easier and more enjoyable.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our mission is to develop high-quality apps that combine functionality, 
              user-friendliness, and beautiful design. We focus on creating solutions that 
              are not just technically impressive, but also genuinely useful for our users.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From productivity tools to entertainment apps, we're constantly working on 
              new projects and improving our existing ones based on user feedback and 
              emerging technologies.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Values
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Innovation and creativity in every project</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">User-centered design approach</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Quality and reliability</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Open to feedback and continuous improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

