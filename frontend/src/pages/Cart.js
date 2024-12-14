import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({ cartItems, SetcartItems }) {
  console.log(cartItems);
  const [placecomplete, Setplacecomplete] = useState(false);

  function increaseqty(items) {
    if (items.qty === items.product.stock) {
      return;
    }

    const updateitems = cartItems.map((i) =>
      i.product._id === items.product._id ? { ...i, qty: i.qty + 1 } : i
    );
    SetcartItems(updateitems);
  }

  function decreaseqty(items) {
    if (items.qty === 1) {
      return;
    }
    const updateitems = cartItems.map((i) =>
      i.product._id === items.product._id ? { ...i, qty: i.qty - 1 } : i
    );
    SetcartItems(updateitems);
  }

  function deleteitem(items) {
    const exceptdeleteitem = cartItems.filter((i) => {
      return i.product._id !== items.product._id;
    });
    SetcartItems(exceptdeleteitem);
  }

  function placeorder() {
    fetch(process.env.REACT_APP_API + "/v1/orders/postorder", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(cartItems),
    }).then(() => {
      SetcartItems([]);
      Setplacecomplete(true);
      toast.success("Your Order has been Successfully placed");
    });
  }
  return cartItems.length > 0 ? (
    <Fragment>
      <div class="container container-fluid">
        <h2 class="mt-5">
          Your Cart: <b>{cartItems.length}</b>
        </h2>

        <div class="row d-flex justify-content-between">
          <div class="col-12 col-lg-8">
            <hr />
            {cartItems.map((item) => (
              <Fragment>
                <div class="cart-item">
                  <div class="row">
                    <div class="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt="{item.product.name}"
                        height="90"
                        width="115"
                      />
                    </div>

                    <div class="col-5 col-lg-3">
                      <Link to={"/product" + item.product._id}>
                        {item.product.description}
                      </Link>
                    </div>

                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div class="stockCounter d-inline">
                        <span
                          class="btn btn-danger minus"
                          onClick={() => decreaseqty(item)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          class="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span
                          class="btn btn-primary plus"
                          onClick={() => increaseqty(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        class="fa fa-trash btn btn-danger"
                        onClick={() => deleteitem(item)}
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}

            <hr />
          </div>

          <div class="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span class="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}(Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span class="order-summary-values">
                  $
                  {Math.floor(
                    cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.qty,
                      0
                    )
                  )}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                class="btn btn-primary btn-block"
                onClick={placeorder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : placecomplete ? (
    <Fragment>
      <h2 className="mt-5">Your Order has been Successfully placed</h2>
    </Fragment>
  ) : (
    <h2 className="mt-5">Your Order is Empty</h2>
  );
}
