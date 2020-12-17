import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemon: [], 
    display: 0
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokeArr => this.setState({pokemon: pokeArr}))
  }

  search = (e) => {
    // console.log(e.target.value)
    let filtered; 
    e.target.value.length ? 
      filtered = this.state.pokemon.filter(pokemon => pokemon.name.includes(e.target.value)) 
      : 
      filtered = 0
    this.setState({display: filtered})
  }

  submit = (target) => {
    const {name, hp, frontUrl, backUrl} = target
    let newPokemon = {
      name: name.value, 
      hp: hp.value, 
      sprites: {
        front: frontUrl.value, 
        back: backUrl.value
      }
    }
    console.log(newPokemon)
    fetch('http://localhost:3000/pokemon', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(newPokemon)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({pokemon: [data, ...this.state.pokemon]})
    })
  }

  render() {
    const {pokemon, display} = this.state
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm submit={this.submit}/>
        <br />
        <Search search={this.search}/>
        <br />
        <PokemonCollection pokemon={display ? display : pokemon} />
      </Container>
    )
  }
}

export default PokemonPage
