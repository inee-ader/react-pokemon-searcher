import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

// for some reason it is giving me errors and I can't figure out why so I have to move on. 

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    display: [], 
    searchInput: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokeArr => this.setState({pokemon: pokeArr, display: pokeArr}))
  }

  searchPokemon = (e) => {
    this.setState({searchInput: e.target.value})
    if(e.target.value === ''){
      this.setState({display: this.state.pokemon})
    }else{
      this.setState({display: this.state.pokemon.filter(pokemon => pokemon.name.includes(e.target.value))})
    }
  }

  handleSubmit = (target) => {
    const { name, hp, frontUrl, backUrl } = target
    let newPokemon = {
      name: name.value, 
      hp: hp.value, 
      sprites: {
        front: frontUrl.value, 
        back: backUrl.value
      }
    }
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
        this.setState((prevState) => {
        return {pokemon: [...data, prevState.pokemon], display: [...data, prevState.display]}
      })
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm form={this.handleSubmit}/>
        <br />
        <Search search={this.searchPokemon} />
        <br />
        <PokemonCollection search={this.searchPokemon} pokemon={this.state.pokemon} filtered={this.state.display} />
      </Container>
    )
  }
}

export default PokemonPage
