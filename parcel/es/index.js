import React, { Component } from 'react'
import { render } from 'react-dom'
import App from './app'

class AppContainer extends Component {
  state = {
    name: 'Parcel 打包案例~~~'
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ name: 'Parcel 打包了!!!' })
    },1999)
  }

  render() {
    return <App name={this.state.name} />
  }
}


render(
  <AppContainer />,
  document.getElementById('app')
)
