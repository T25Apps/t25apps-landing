import React from 'react'

function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gray-900 dark:bg-white mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Who We Are
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              T25Apps is an idea to focus and solve real world problems by creating 
              innovative applications. We believe in the power 
              of technology to make people's lives easier and more enjoyable.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our mission is to develop high-quality apps that combine functionality, 
              user-friendliness, and beautiful design. We focus on creating solutions that 
              are not just technically impressive, but also genuinely useful for our users.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              From productivity tools to entertainment apps, we're constantly working on 
              new projects and improving our existing ones based on user feedback and 
              emerging technologies.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Our Values
            </h3>
            <ul className="space-y-6">
              {[
                'Innovation and creativity in every project',
                'User-centered design approach',
                'Commitment to quality and performance',
                'Continuous improvement and learning'
              ].map((value, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-4 text-lg text-gray-700 dark:text-gray-300">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

