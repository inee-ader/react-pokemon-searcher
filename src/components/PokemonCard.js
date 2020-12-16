import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    front: true
  }
  
  toggleCard = () => {
    this.setState((prevState)=>{
      return{front: !prevState.front}
    })
  }
    
  render() {
    const {id, name, hp, sprites} = this.props.pokemon
    return (
      <Card onClick={this.toggleCard} >
        <div id={id} >
          <div className="image">
            <img src={this.state.front ? sprites.front : sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
