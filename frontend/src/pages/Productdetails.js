import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Productdetails({ cartItems, SetcartItems }) {
  const [product, Setdata] = useState(null);
  const { id } = useParams();

  const [qty, setqty] = useState(1);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "/v1/products/getsingleproduct/" + id)
      .then((res) => res.json())
      .then((res) => Setdata(res.product));
  }, []);

  function addtoCart() {
    if (!product) {
      console.error("product is not loaded yet.");
      return; // Prevent the function from running if product is undefined
    }
    const itemexist = cartItems.find((items) => items.product._id === product._id);
    if (!itemexist) {
      const newItems = { product, qty };
      SetcartItems((items) => [...items, newItems]);
      toast.success("Cart item added Successfully");
    }

    console.log(cartItems);
  }
  return (
    product && (
      <div class="container container-fluid">
        <div class="row f-flex justify-content-around">
          <div class="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].image}
              alt="product.name"
              height="500"
              width="500"
            />
          </div>

          <div class="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product {product._id}</p>

            <hr />

            <div class="rating-outer">
              <div
                class="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>

            <hr />

            <p id="product_price">${product.price}</p>
            <div class="stockCounter d-inline">
              <span
                class="btn btn-danger minus"
                onClick={() =>
                  setqty((val) => (val <= 1 ? (val = 1) : val - 1))
                }
              >
                -
              </span>

              <input
                type="number"
                class="form-control count d-inline"
                value={qty}
                readOnly
              />

              <span
                class="btn btn-primary plus"
                onClick={() => {
                  if (product.stock <= qty) {
                    return qty;
                  }
                  return setqty((val) => val + 1);
                }}
              >
                +
              </span>
            </div>
            <button
              onClick={addtoCart}
              type="button"
              id="cart_btn"
              class="btn btn-primary d-inline ml-4"
              disabled={Number(product.stock) === 0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock <= 0 ? "text-danger" : "text-success"}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 class="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>

            <div class="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}
