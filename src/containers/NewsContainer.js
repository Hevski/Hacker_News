import React, {Component} from 'react';
import NewsSelector from '../components/NewsSelector';
import NewsDetail from '../components/NewsDetail';
class NewsContainer extends Component {
  constructor(props){
    super(props);
      this.state = {
        hackerNewsIds: [],
        articles: [],
        selectedArticle: null
      }
      this.getNewsIds = this.getNewsIds.bind(this);
      this.handleNewsSelected = this.handleNewsSelected.bind(this);
  }

  componentDidMount(){
    //call function which takes the all the hacker news ids and plices the array
    //so there is only 20
    this.getNewsIds()
    .then(() => {
      return this.state.hackerNewsIds.splice(0, 20)
    }).then((ids) => {
      const promises = ids.map(id => {
        //maps over id array and fetches new end point, concatinating the id to the route
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        //turns results into json
        .then(res => res.json())
      })
      //returns them as an array of promises
      return promises;
    })
    .then((promises) => {
      //takes all promises from array and sets them as articles in article array
      Promise.all(promises)
      .then(articles => this.setState({articles}))
    })
  }
//function to fetch all id's from api
  getNewsIds() {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
     return fetch(url)
    .then(res => res.json())
    .then(data => this.setState({hackerNewsIds: data}))
  }

  handleNewsSelected(index){
  const selectedArticle = this.state.articles[index];
  this.setState({selectedArticle: selectedArticle})
}

  render(){
    return(
      <div>
      <NewsSelector
       articles={this.state.articles}
       handleSelected={this.handleNewsSelected}
       />
       <NewsDetail article={this.state.selectedArticle}/>
      </div>
    )
  }
}

export default NewsContainer;
