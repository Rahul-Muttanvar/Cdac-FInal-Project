import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BidderHomeHome() {
  const user_id = JSON.parse(localStorage.getItem("loggedUser")).user_id;
  useEffect(() => {
    fetch("http://localhost:8080/getbidderhome/" + user_id)
      .then((resp) => resp.json())
      .then((data) => setBiddings(data));
  }, []);
  const navigate = useNavigate();
  const [biddings, setBiddings] = useState([]);

  return (
    <div>
      {/* <p>{biddings}</p> */}
      <h1> Auctions Ended</h1>
      <table className="table table-bordered">
        {biddings.map((v) => {
          if (v.bidding_status != "Payement not done yet")
            return (
              <tr>
                <td>
                  Product Name:{v.p_Id.product_name}
                  <br />
                  Product Name:{v.p_Id.category_id.category_name}
                  <br />
                  Product Description:{v.p_Id.desciption}
                  <br />
                  Seller Name:{" "}
                  {v.p_Id.seller_id.fname + " " + v.p_Id.seller_id.lname}
                  <br />
                  Base Price: {v.p_Id.base_price}
                  <br />
                  Seller Mobile Number: {v.p_Id.seller_id.mobile}
                  <br />
                  Seller Email: {v.p_Id.seller_id.email}
                </td>
                <td width={280} height={200}>
                  <img
                    className="d-block"
                    src={`data:image/png;base64,${v && v.p_Id.product_image_3}`}
                    width="280"
                    height="200"
                    alt="Third slide"
                  />
                </td>
                <td>
                  {/* Bidder Name: {v.bidder_id.fname + " " + v.bidder_id.lname}
                <br /> */}
                  <h5>You Won the Bid</h5>
                  Final Bid Price: {v.final_bid_price}
                  <br />
                  Payment status:{" " + v.bidding_status}
                  <br />
                  {/* {v.bidding_status!= "Payement not done yet":?} */}
                  <button
                    type="button"
                    id="btn1"
                    style={{ color: "blue", backgroundColor: "green" }}
                    className="btn btn-success"
                  >
                    Make Payment
                  </button>
                </td>
              </tr>
            );
          else
            return (
              <tr>
                <td>
                  Product Name:{v.p_Id.product_name}
                  <br />
                  Product Name:{v.p_Id.category_id.category_name}
                  <br />
                  Product Description:{v.p_Id.desciption}
                  <br />
                  Seller Name:{" "}
                  {v.p_Id.seller_id.fname + " " + v.p_Id.seller_id.lname}
                  <br />
                  Base Price: {v.p_Id.base_price}
                  <br />
                </td>
                <td width={280} height={200}>
                  <img
                    className="d-block"
                    src={`data:image/png;base64,${v && v.p_Id.product_image_3}`}
                    width="280"
                    height="200"
                    alt="Third slide"
                  />
                </td>
                <td>
                  {/* Bidder Name: {v.bidder_id.fname + " " + v.bidder_id.lname}
              <br /> */}
                  <h5>You Won the Bid</h5>
                  Final Bid Price: {v.final_bid_price}
                  <br />
                  Payment status:{v.bidding_status}
                  <br />
                  {/* {v.bidding_status!= "Payement not done yet":?} */}
                  You have received delivery and payment is done.
                </td>
              </tr>
            );
        })}
      </table>
    </div>
  );
}
