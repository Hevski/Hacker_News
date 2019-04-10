import React from 'react';

const NewsDetail = ({article}) => {

  if(!article){
    return null
  }

  return (
    <div>
    <p>{article.title}</p>
    <a href={article.url}>Read More</a>
    </div>
  )
}

export default NewsDetail;
