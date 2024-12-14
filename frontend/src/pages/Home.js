import { Fragment, useEffect, useState } from "react";
import ProductCards from "../components/ProductCards";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [Product, SetProduct] = useState([]);
  const [searchparam,Setsearchparam] = useSearchParams();
  console.log(searchparam);

  console.log(process.env.REACT_APP_API + "/v1/products/getproduct");

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "/v1/products/getproduct?"+searchparam)
      .then((res) => res.json())
      .then((res) => SetProduct(res.product));
  }, [searchparam]);
  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" class="container mt-5">
        <div class="row">
          {Product.map((product)=> <ProductCards product ={product} />)}

        </div>
      </section>
    </Fragment>
  );
}
