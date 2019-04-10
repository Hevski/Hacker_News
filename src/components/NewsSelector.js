import React from 'react';
import NewsDetail from './NewsDetail';
const NewsSelector = ({articles, handleSelected}) => {

  const options = articles.map((article, index) => {
    return (
      <option value={index} key={index}>{article.title}</option>
    )
  })

  function handleChange(event){
  handleSelected(event.target.value);
}

  return(
    <select id="article-selector" defaultValue="default" onChange={handleChange}>
      <option disabled value="default">Choose an article...</option>
      {options}
    </select>
  )
}

export default NewsSelector;
