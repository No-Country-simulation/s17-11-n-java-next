import FooterGeneral from '@/components/containers/footer-general'
import TopbarHome from '@/components/containers/topbar-home'
import React from 'react'

function Page() {
  return (
    <div className='flex flex-col'>
      <TopbarHome />
      <FooterGeneral />
    </div>
  )
}

export default Page