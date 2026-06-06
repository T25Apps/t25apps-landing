import React from 'react'

const values = [
  {
    title: 'Simplicity',
    description: 'Keep things clear, intuitive, and easy to use.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Find better ways to solve everyday challenges.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Quality',
    description: 'Build products with care and continuously improve them based on user feedback.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]

function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            About T25Apps
          </h2>
          <div className="w-24 h-1 bg-gray-900 dark:bg-white mx-auto rounded-full"></div>
        </div>

        {/* Personal Intro */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-center">
            Hi, I'm Sriram, the founder and developer behind T25Apps.
          </p>
          <div className="mt-8 space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            <p>
              T25Apps is my personal app studio where I build mobile apps that solve real-world problems 
              in simple and practical ways. Every app is designed, developed, published, and maintained by me.
            </p>
            <p>
              I enjoy creating software that is genuinely useful and continuously improving it based on 
              feedback from users around the world.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            My Mission
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            To build simple, thoughtful apps that solve real problems and make everyday tasks easier.
          </p>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            My Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center mx-auto mb-5">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

