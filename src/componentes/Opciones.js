/*****************************************************************************/
import React, { Component } from 'react';
/*****************************************************************************/
class Opciones extends Component {
  render() {
    return (
      <div className="opciones">
        <div className="opcion">
          <button id="A" className="botones" onClick={() => { this.props.handleClick("A") }}>A</button>
          <h2>{this.props.primerOpcion}</h2>
        </div>
        <div className="opcion">
          <button id="B" className="botones" onClick={() => { this.props.handleClick("B") }}>B</button>
          <h2>{this.props.segundaOpcion}</h2>
        </div>
      </div>
    )
  }
}
/*****************************************************************************/
export default Opciones;