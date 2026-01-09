import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Impact from '@/components/sections/Impact'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Services />
      <Impact />
      <Team />
      <Contact />
    </main>
  )
}