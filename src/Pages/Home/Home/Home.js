import React from "react";
import Footer from "../../Shared/Footer/Footer";
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
      <Footer></Footer>
    </div>
  );
};

export default Home;
