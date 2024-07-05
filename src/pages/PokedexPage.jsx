import { useSelector } from "react-redux"
import UseFetch from "../hooks/UseFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import '../components/styles/PokedexPage.css'
import HeaderPages from "../components/HeaderPages"
import Pagination from "../components/Pagination"
import BackToTopButton from "../components/BackToTopButton"



const PokedexPage = () => {


const trainer = useSelector(state => state.trainer)
const [searchedName, setSearchedName] = useState('')
const [typeSelect, setTypeSelect] = useState('allPokemons')

const [pokemons, getPokemons, getTypePokemon] = UseFetch()





useEffect(() => {
if(typeSelect === 'allPokemons') {

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
    getPokemons(url)
  } else {
    getTypePokemon(typeSelect)
  }

},[typeSelect])



const inputName = useRef()

const handleSearch = e => {
  e.preventDefault()
  setSearchedName(inputName.current.value.trim().toLowerCase())
}

const callbackFilter = poke => {
  const filterName = poke.name.includes(searchedName)
  return filterName
}

const [currentPage, setCurrentPage] = useState(1)
const [quantsPages, setQuantsPages] = useState(20)


const limitPages = currentPage * quantsPages
const startPages = limitPages - quantsPages



const pages= pokemons?.results.filter(callbackFilter).slice(startPages, limitPages)

const totalPages = Math.ceil((pokemons?.results.length) / quantsPages)



const inputPages = useRef()

const handlePages = e => {
  e.preventDefault()
  setQuantsPages(inputPages.current.value)


}


  return (
    
    <div className="two_container">
      
      <HeaderPages />
     <BackToTopButton/>

      <section className="two_body">
          
        <p className="two_welcome"><span className="two_welcom_i">Welcome {trainer}</span>, <span className="two_welcom_p">here you will find your favorite pokemon</span></p>
       
        <div className="two_form_container">
              <form className="two_form" onSubmit={handleSearch} action="">
                <input className="two_input" ref={inputName} type="text" placeholder="Look for a pokemón" />
                <button className="two_btn">Search</button>
              </form>

              <form className="quantity_form" onSubmit={handlePages} action="">
                <input className="two_input quantiy quantity_input" ref={inputPages} type="text" placeholder="Quantity per page?" />
                <button className="two_btn quantity_btn">Search</button>
              </form>

              <form className="two_form_select" action="">
                <SelectType
                setTypeSelect = {setTypeSelect}
                />
              </form>
        </div>

        <div className="pagination_container">
          <Pagination 
          currentPage = {currentPage}
          setCurrentPage = {setCurrentPage}
          totalPages = {totalPages}
          />

        </div>

        <div className="two_container_card">
            {
              pokemons && pokemons.results.filter(callbackFilter).length === 0
              ? <h2 className="two_title_error">There are no pokemon that meet the filters </h2>
              :
              ( pages?.map(poke =>(
                <PokeCard 
                key={poke.url}
                poke = {poke}
                />
              )
            ) )
          }
        </div>
         
      </section>

    </div>
  )
}

export default PokedexPage