import React from "react";
import Baner from "../Baner/Baner";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews";
import Navigation from "./../../Shared/Navigation/Navigation";

const Home = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Baner></Baner>
      <Products></Products>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
