/* eslint-disable */
'use client'

import React from 'react'

export default function GoogleMap() {
  return (
    <div className="relative w-full opacity-80 h-[600px] rounded-lg overflow-hidden md:my-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449186.751234347!2d-113.28176712882805!3d59.86855603547167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2s!4v1728923495946!5m2!1sen!2s"
        className="absolute top-0 left-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <style jsx>{`
        iframe {
          clip-path: inset(105px 0 0 0);
        }
      `}</style>
    </div>
  )
}
