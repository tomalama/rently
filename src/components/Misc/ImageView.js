// React
import React, { Component } from "react";

export default class ImageView extends Component {

  render() {
    return (
      <div className="image-view">
        <img src={this.props.image} alt="Property" />
      </div>
    );
  }

}