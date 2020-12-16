import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {


  render() {
    let pokeCards = 
      this.props.filtered.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))
    return (
      <Card.Group itemsPerRow={6}>
        <h1>Pokemon Collection</h1>
        {pokeCards}
      </Card.Group>
    )
  }
}

export default PokemonCollection
