// React
import React, { Component } from "react";

import './image-view.scss'

export default class ImageView extends Component {

  render() {
    return (
      <div className={"image-view" + (!this.props.image ? ' empty' : '')}>
        <img src={this.props.image}  />
      </div>
    );
  }

}