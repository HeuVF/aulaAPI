import { useState } from "react"
import "./style.css"

const pokemonList =[
    {id:691, nome:'Dragalge'},
    {id:748, nome:'Toxapex'},
    {id:849, nome:'Toxtricity'},
    {id:970, nome:'Glimmora'},
    {id:407, nome:'Roserade'},
    {id:454, nome:'Toxicroak'},
    {id:10299, nome:'Mega Dragalge'},
    {id:10038, nome:'Mega Gengar'},
    {id:452, nome:'Drapion'},
    {id:804, nome:'Naganadel'},
    {id:793, nome:'Nihilego'},
]

function Pokemon(){
    const [pokemonGlobal, setPokemonGlobal] = useState(null)

    const getPokemonData = (idPokemon)=>{
        const uri= `https://pokeapi.co/api/v2/pokemon/${idPokemon}`

        fetch(uri)
            .then(res=>res.json())
                .then(json=>{
                    const pokemonFetch ={
                        nome: json.name,
                        peso: json.weight,
                        vida: json.stats[0].base_stat,
                        imagem: json.sprites.other['official-artwork'].front_default,
                        imagemshiny: json.sprites.other['official-artwork'].front_shiny,
                        tipo1: json.types[0]['type'].name,
                        tipo2: json.types[1]['type'].name,
                    }
                    setPokemonGlobal(pokemonFetch)
                    console.log(pokemonFetch)
                })
                .catch(()=>alert("Não foi possivel acessar os dados do Pokémon"))
    }

    return(
        <div className="container">
            <div className="header">
                <h1>Página de Pokémon!</h1>
                <p>Faça a sua escolha!</p>
            </div>

            {pokemonGlobal &&(
                <div className="pokemon-info">
                    <h2>Nome: {pokemonGlobal.nome}</h2>
                    <p>Peso: {pokemonGlobal.peso}</p>
                    <p>VIda: {pokemonGlobal.vida}</p>
                    <img
                        src={pokemonGlobal.imagem}
                        alt={pokemonGlobal.nome}
                    />
                    <img
                        src={pokemonGlobal.imagemshiny}
                        alt={pokemonGlobal.nome}
                    />
                    <h4>{pokemonGlobal.tipo1} and {pokemonGlobal.tipo2}</h4>
                </div>
            )}

            {pokemonList.map((item)=>(
                <div className="card" key={item.id}>
                    <p>{item.nome}</p>
                    <button onClick={()=>getPokemonData(item.id)}>Saiba Mais</button>

                </div>
            ))}
        </div>
    )
}

export default Pokemon