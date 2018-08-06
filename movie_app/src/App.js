import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'

class App extends Component {

  /* ----------------------------------------Component lifecycle---------------------------------------- */
  // Render : componentWillMount() -> render() -> componentDidMount()
  /*
    componentWillMount() : 사이클이 시작되었을 알게되는거고
    render() : 컴포넌트가 리액트 세계에 '존재'하게 되었음을 알게되는거고
    componentDidMount() : 성공적으로 리액트 세계에 컴포넌트가 자리잡았다는것을 알게되지. 
  */

  // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  /*
      componentWillReceiveProps() : 컴포넌트가 새로운 props를 받았다는거
      shouldComponentUpdate() : old props랑 new props를 비교하여 다르면 리액트는 update = true라고 생각함, 그 다음 컴포넌트가 업데이트 할 거라는 단계로 넘어가
      componentWillUpdate() : 컴포넌트가 업데이트 할 거라는 단계
      render() : 컴포넌트가 업데이트가 됨
      componentDidUpdate() : 컴포넌트 업데이트가 완료됨
  */

  state = {};

  componentDidMount(){ this._getMovies(); }
  
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => { 
      return (
       <Movie 
          title={movie.title_english} 
          poster={movie.medium_cover_image} 
          key={movie.id} 
          genres={movie.genres}
          synopsis={movie.synopsis}  
        />
      ); 
    });
    return movies;
  }

  /* async = asynchoronus(비동기) await=비동기 함수가 작업하고 끝나기를 기다린다. */

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({ movies });
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;