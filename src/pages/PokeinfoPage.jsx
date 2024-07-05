import { useParams } from "react-router-dom"
import UseFetch from "../hooks/UseFetch"
import { useEffect } from "react"
import '../components/styles/PokeinfoPage.css'
import HeaderPages from "../components/HeaderPages"


const PokeinfoPage = () => {


  const { name } = useParams()

const [ pokemon, getPokemon] = UseFetch()

useEffect( () => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  getPokemon(url)
},[name])



  return (
    <article className="info_article">
      <HeaderPages  />

      <div className="info_body ">

        <section className={`info_card poke border_${pokemon?.types[0].type.name}`}>

          <header className={`bg_${pokemon?.types[0].type.name}`}>
             <img className="info_card_img img_traslate" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
          </header>

          <h3 className="info_card_id"># {pokemon?.id}</h3>

          <div className="info_card_box_name">
            <hr className="info_card_line_name1"/>
             <h2 className="info_card_name">{pokemon?.name}</h2>
            <hr className="info_card_line_name2"/>
          </div>

          <ul className="info_card_size">
            <li > <span className="info_card_size_t">Weight </span> <br /> <span className="info_card_size_weight1">{pokemon?.weight}</span></li>
            <li > <span className="info_card_size_t">Height </span><br /> <span className="info_card_size_weight1">{pokemon?.height}</span></li>
          </ul>
          <div className="info_card_type_container">
              <h3 className="info_card_title">Types</h3>
              <h3 className="info_card_title">Abilities:</h3>
          </div>    
          <div className="info_card_ul_container">

              <ul className="info_card_types_box">
                {
                  pokemon?.types.map( type => (

                    <li className="info_card_types1" key={type.type.url}><span className="info_card_1">{type.type.name}</span></li>
                  ))
                }
              
              </ul>


              <ul className="info_card_types_box">
                {
                  pokemon?.abilities.map(ability => (
                    
                    <li className="info_card_abilities1" key={ability.ability.url}>{ability.ability.name}</li>
                  ))
                }
                
              </ul>
          </div>
            <div className="info_card_stats_container">
                <h3 className="info_card_stats">Stats</h3>
                <hr className="info_card_stats_hr" />
                <img className="info_card_stats_img" src="/Group 232.png" alt="/Group 232.png" />
            </div>

          <ul className="info_card_stats_box">
              {
                
                pokemon?.stats.map(statInfo => (
                  <li className="info_card_stats_list" key={statInfo.stat.url}><span className="stats_label">{statInfo.stat.name} </span > <span className={`poke_stats_value text_${pokemon?.types[0].type.name}`}>{statInfo.base_stat} / 150</span><hr className={`poke_br br_${statInfo.base_stat}`} style={{'--porcentaje': `${statInfo.base_stat}%`}}/></li>
                ))
                
              }
              
            </ul>

        </section>

        <div className={`info_move_container poke border_${pokemon?.types[0].type.name}`}>
        <div className="info_card_stats_container">
                <h3 className="info_card_stats">Movements</h3>
                <hr className="info_card_stats_hr" />
                <img className="info_card_stats_img" src="/Group 232.png" alt="/Group 232.png" />
            </div>

           <ul className="info_move_ul">
              {
                pokemon?.moves.map(statInfo => (
                  <li className="info_move_list" key={statInfo.move.url}><span className="stats_label">{statInfo.move.name} </span ></li>
                ))
              }
            </ul>

         </div>
        </div>
    </article>


  )
}

export default PokeinfoPage

