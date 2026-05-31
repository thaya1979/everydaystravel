import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServicesGrid from '../components/ServicesGrid'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <Hero
        badge="Our Services"
        lines={[
          { text: 'Transport',     accent: false },
          { text: 'Solutions for', accent: false },
          { text: 'Every Journey', accent: true  },
        ]}
        subtext="From airport transfers to weddings and school trips — we have the right vehicle and the right team for every occasion."
      />
      <ServicesGrid />
      <Testimonials />
      <Footer />
    </>
  )
}
