"use client"
import React from 'react'
import SlidingImages from './SlidingImage'

const Sponsors = () => {
  return (
    <section className='py-20 bg-[#F5F5F5]'>
      <div className='mx-auto w-full max-w-7xl px-6 sm:px-16'>
        <h2 className='mb-12 text-center text-3xl font-semibold text-brand'>Parnters and Collaborator</h2>
        <SlidingImages images={[
          '/blender.png',
          '/microsoft.png',
          '/blender.png',
          '/microsoft.png',
          '/blender.png',
          '/microsoft.png',
        ]} />
      </div>
    </section>
  )
}

export default Sponsors