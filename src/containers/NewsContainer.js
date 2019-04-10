import React, {Component} from 'react';

class NewsContainer extends Component {
  constructor(props){
    super(props);
      this.state = {
        hackerNewsIds: [],
        articles: []
      }
      this.getNewsIds = this.getNewsIds.bind(this);
  }

  componentDidMount(){
    this.getNewsIds()
    .then(() => {
      return this.state.hackerNewsIds.splice(0, 20)
    }).then((ids) => {
      const promises = ids.map(id => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res => res.json())
      })
      return promises;
    })
    .then((promises) => {
      Promise.all(promises)
      .then(articles => this.setState({articles}))
    })
  }

  getNewsIds() {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
     return fetch(url)
    .then(res => res.json())
    .then(data => this.setState({hackerNewsIds: data}))
  }

  render(){
    return(
      <h1>Hello</h1>
    )
  }
}

export default NewsContainer;
