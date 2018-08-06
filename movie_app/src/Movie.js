//import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import './Movie.css';

function Movie({title, poster, genres, synopsis}){
    return(
        <div className="Movie">
            <div className="Movie__Columns">
                <MoviePoster poster={poster} alt={title} />
            </div>
            <div className="Movie__Columns">
                <h1>{title}</h1>
                <div className="Movie__Genres">
                   {genres.map((genre, index) => <MovieGenre genre={genre} key={index} /> )}
                </div>
                <div className="Movie__Synopsis">
                <LinesEllipsis
                  text = {synopsis}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                />
                </div>
            </div>
        </div> 
    )
}

Movie.propTypes = {
    title : PropTypes.string.isRequired,
    poster : PropTypes.string.isRequired,
    genres : PropTypes.array.isRequired,
    synopsis : PropTypes.string.isRequired
}

// 그냥 return만 하고, state필요 없고, props만 있으면 되고 1개의 html 태그만 필요하면 아래 같이 functional component를 만들면됨
//functional componenet는 render 없고 lifecycle도 없음..
function MoviePoster({poster, alt}){
    return(
        <img src={poster} alt={alt} title={alt} className="Movie__Poster" />
    )
}
// functional component 사용할때 아래와 같이 proptypes validating해주면됨
MoviePoster.propTypes = {
    poster : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
}


function MovieGenre({genre}){
    return(
        <span className="Movie__Genre">{genre}</span>
    )
}

MovieGenre.protoTypes = {
    genre : PropTypes.string.isRequired
}

export default Movie;