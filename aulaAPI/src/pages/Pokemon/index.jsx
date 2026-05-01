import { useState } from "react"
import "./style.css"

const pokemonList = [
    { id: 0, nome: '' },
]

function PokemonProcurar({ item, onSearch }) {
    const [inputValue, setInputValue] = useState("")

    return (
        <div className="procurar">
            <label>Digite o nome ou número do Pokemon:</label>
            <br />
            <input type="text" placeholder="Digite o nome ou número do Pokemon" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <br />
            <button onClick={() => onSearch(inputValue)}>Saiba Mais</button>
        </div>
    )
}

function Pokemon() {
    const [pokemonGlobal, setPokemonGlobal] = useState(null)

    const getPokemonData = (nomePokemon) => {
        if (nomePokemon.trim() === "") {
            return
        }

        const uri = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`
        const hhh = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`

        fetch(uri)
            .then(res => res.json())
            .then(json => {
                const pokemonFetch = {
                    nome: json.name,
                    numero: json.id,
                    peso: json.weight / 10,
                    vida: json.stats[0].base_stat,
                    ataque: json.stats[1].base_stat,
                    defesa: json.stats[2].base_stat,
                    spAtaque: json.stats[3].base_stat,
                    spDefesa: json.stats[4].base_stat,
                    velocidade: json.stats[5].base_stat,
                    imagem: json.sprites.other['official-artwork'].front_default,
                    imagemshiny: json.sprites.other['official-artwork'].front_shiny,
                    gif: json.sprites.other['showdown'].front_default,
                    gifshiny: json.sprites.other['showdown'].front_shiny,
                    tipo1: json.types[0]['type'].name,
                    tipo2: json.types[1]?.['type'].name || '',
                    altura: json.height / 10,
                }
                setPokemonGlobal(pokemonFetch)
            })
            .catch(() => alert("Não foi possivel acessar os dados do Pokémon. Por favor digite o nome certo."))
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Página de Pokémon!</h1>
                <p>Faça a sua escolha!</p>
            </div>

            <br />

            {pokemonList.map((item) => (
                <PokemonProcurar key={item.id} item={item} onSearch={getPokemonData} />
            ))}

            {pokemonGlobal && (
                <div className="pokemon-info">
                    <h2>Nome: {pokemonGlobal.nome}</h2>
                    <h3>Número: {pokemonGlobal.numero}</h3>
                    <h4>Padrão</h4>
                    <h4>Shiny</h4>
                    <br/>
                    <img
                        src={pokemonGlobal.imagem}
                        alt={pokemonGlobal.nome}
                    />
                    <img
                        src={pokemonGlobal.imagemshiny}
                        alt={pokemonGlobal.nome}
                    />
                    <br />
                    <img
                        src={pokemonGlobal.gif}
                        alt={pokemonGlobal.nome}
                    />
                    <img
                        src={pokemonGlobal.gifshiny}
                        alt={pokemonGlobal.nome}
                    />
                    <br />
                    <h4>{pokemonGlobal.tipo1} {pokemonGlobal.tipo2 !== '' ? `/ ${pokemonGlobal.tipo2}` : ''}</h4>
                    <p>Peso: {pokemonGlobal.peso} Kg</p>
                    <p>Altura: {pokemonGlobal.altura} m</p>
                    <br/>
                    <table>
                        <caption>Base Stats</caption>
                        <tbody>
                            <tr>
                                <td>Vida:</td>
                                <td>{pokemonGlobal.vida}</td>
                            </tr>
                            <tr>
                                <td>Ataque:</td>
                                <td>{pokemonGlobal.ataque}</td>
                            </tr>
                            <tr>
                                <td>Defesa:</td>
                                <td>{pokemonGlobal.defesa}</td>
                            </tr>
                            <tr>
                                <td>Ataque Especial:</td>
                                <td>{pokemonGlobal.spAtaque}</td>
                            </tr>
                            <tr>
                                <td>Defesa Especial:</td>
                                <td>{pokemonGlobal.spDefesa}</td>
                            </tr>
                            <tr>
                                <td>Velocidade:</td>
                                <td>{pokemonGlobal.velocidade}</td>
                            </tr>
                        </tbody></table>

                </div>
            )}
        </div>
    )
}

export default Pokemon