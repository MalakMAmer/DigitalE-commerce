import React from 'react'
import Hero from '../components/Hero'
import About from '../sections/About'
import ProductsList from '../sections/ProductsList'
import Team from '../sections/Team'
import CTA from '../sections/CTA'
import SignUpSection from '../sections/SignUpSection'
import NewestOffers from '../sections/NewestOffers'
import WhyUs from '../sections/WhyUs'
import DigitalProductsSection from '../sections/DigitalProductsSection'
import FAQSection from '../sections/FAQSection'
import SalesHeader from '../components/SalesHeader'
import ContactButton from '../components/ContactButton'

function Home() {
  return (
        <div>
            <Hero />
            {/* <About /> */}
            <WhyUs />
            {/* <NewestOffers /> */}
            {/* <ProductsList /> */}
            <DigitalProductsSection />
            <SalesHeader />
            {/* <Team /> */}
            {/* <SignUpSection /> */}
            <FAQSection />
            {/* <CTA /> */}
            <ContactButton />
        </div>
    )
}

export default Home