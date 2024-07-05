import { useState } from "react"
import '../components/styles/BackToTopButton.css'


const BackToTopButton = () => {

   const [isVisible, setIsVisible] = useState(false)

const handleScroll = () => {
  const scrollTop = window.pageYOffset
    if (scrollTop > 300) {
        setIsVisible(true)
    }else {
        setIsVisible(false)
    }
}
const scrollToTop = () => {
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
}
window.addEventListener('scroll', handleScroll)
  return (
    <button className={`back-to-top-btn ${isVisible ? 'show' : ''}`}
    onClick={scrollToTop}
    >
      Back to Top
    </button>
   
  )
}

export default BackToTopButton