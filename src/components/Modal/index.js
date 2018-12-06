import React, { Component } from "react";

import "./styles.scss";

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    const { close } = this.props;
    if (this.node.contains(e.target)) {
      return
    }
    if (close) {
      close();
    }
  }

  render() {
    return <div className="modal">
      <div className="content" ref={node => this.node = node}>
        {this.props.children}
      </div>
    </div>
  }
}
