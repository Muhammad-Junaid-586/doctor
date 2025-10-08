import React from 'react'
import Header from '../components/Header'
import SpecialMenu from '../components/SpecialMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialMenu/>
      <TopDoctors/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home