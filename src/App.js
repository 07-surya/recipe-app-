import React,{useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';



const App=()=>{

  const APP_ID='c61d012f';
  const APP_KEY='92793b774367f742b3cc4379492faee3';

 const [recipes,setRecipes]=useState([]);
 const [search,setSearch]=useState('');   
 const [query,setQuery]=useState('chicken');                   //it submits itself

useEffect(()=>{
  getRecipes();
},[query]);
  
  const getRecipes = async()=>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits); 
  }; 
  const updateSearch=e=>{
    setSearch(e.target.value);
    console.log(search);
  }
  const getSearch=e=>{
      e.preventDefault();
      setQuery(search);
      setSearch('');                       
  }
  
  return(
    <div className="App">
      <form  onSubmit={getSearch}  className="search-form">
      <input className="search-bar" type='text' value={search} onChange={updateSearch}/>
      <button className="search-button" type='submit'>  Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe=>(
        <Recipe 
        title={recipe.recipe.label }
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
       
      ))}</div>
      </div>
      
  );   
};
export default App;
 