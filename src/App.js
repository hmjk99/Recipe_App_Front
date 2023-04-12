import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Recipes from "./components/recipes";
import Add from "./components/add";
import Edit from "./components/edit";
import NotFound from "./components/404";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);

  // need the url from back end
  const getRecipes = () => {
    axios.get("http://localhost:8000/api/recipes").then(
      (response) => setRecipes(response.data),
      (err) => console.log(err)
    );
  };

  const getUsers = () => {
    axios.get("http://localhost:8000/api/userprofiles").then(
      (response) => setUsers(response.data),
      (err) => console.log(err)
    );
  };

  const handleCreate = (addRecipe) => {
    axios
      .post("http://localhost:8000/api/recipes", addRecipe)
      .then((response) => {
        console.log(response);
        getRecipes();
      });
  };

  const handleUpdate = (editRecipe) => {
    console.log(editRecipe);
    axios
      .put("http://localhost:8000/api/recipes/" + editRecipe.id, editRecipe)
      .then((response) => {
        getRecipes();
      });
  };

  const handleDelete = (deletedRecipe) => {
    axios
      .delete("http://localhost:8000/api/recipes/" + deletedRecipe._id)
      .then((response) => {
        getRecipes();
      });
  };

  useEffect(() => {
    getRecipes();
    getUsers();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Recipes recipes={recipes} handleDelete={handleDelete} />}
      />
      <Route path="/add" element={<Add handleCreate={handleCreate} />} />
      <Route path="/:id" element={<Edit handleUpdate={handleUpdate} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
