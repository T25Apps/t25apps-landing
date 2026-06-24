import React from 'react'

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

        {/* Closing Note */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Thanks for stopping by, explore the apps and share your feedback!
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

