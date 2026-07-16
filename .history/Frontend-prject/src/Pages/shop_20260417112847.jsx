import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
function shop() {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // 👈 backend URL
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <div className="navbar-image">
        <img src="https://i.pinimg.com/originals/96/cf/a9/96cfa90eb13daac9eab2c4ac59740c1d.jpg"></img>
        <ul>
          <li>
            <h1 className="caret-teal-200">Hello Shop</h1>
           <Link className="" to={"/"}> <button className="bg-amber-400">Shop Now</button></Link>
          </li>
        </ul>
      </div>{" "}
   <br/><hr/>
   <h1>Food Menu📜</h1>
      <img src="https://img.freepik.com/premium-vector/cool-cartoon-hand-drawn-food-menu_98292-40807.jpg?w=1380"></img>
        <br></br> <div className="">
        <h1>Verity</h1>
        <div class="producta2">
          <img src="https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg" />
          <img src="https://watermark.lovepik.com/photo/50077/4812.jpg_wh1200.jpg" />
          <img src=" https://images7.alphacoders.com/396/396289.jpg" />
          <img src="https://lishcreative.com/wp-content/uploads/2020/09/IMG_9618-scaled.jpg " />
          <img src="https://vegecravings.com/wp-content/uploads/2023/08/Honey-Chilli-Potato-Recipe-Step-By-Step-Instructions-scaled.jpg " />
          <img src=" https://png.pngtree.com/background/20230528/original/pngtree-coffees-and-shots-of-coffees-on-a-table-picture-image_2783645.jpg" />
        </div></div><br/><hr/> <h1>About-us</h1>{" "}
      <div className={"About-section"}>
        <img className="border-3" src="https://img.freepik.com/premium-photo/cartoon-chef-holding-plate-food-vector-illustration-white-background_1142-30985.jpg?w=2000"></img>
       <br/> <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          quod aspernatur omnis, veniam ullam quas consequuntur unde aliquid
          eveniet voluptates, aperiam esse iste perferendis atque. Nostrum
          excepturi harum quisquam atque? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fuga delectus dicta eveniet laudantium
          reprehenderit, officiis impedit necessitatibus. Quae esse fugiat, eos
          ad, atque alias itaque exercitationem accusantium totam laboriosam a!
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, rerum
          unde fugiat dolorum fuga magni molestiae eum repellendus sunt expedita
          dolorem aliquam cum est consectetur labore, ducimus nisi saepe. Ullam?
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
          quae, quisquam accusamus voluptatum quibusdam eius ea libero excepturi
          cum vel, natus hic eum harum, quasi veniam modi rem! Adipisci,
          laudantium! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Omnis earum ea commodi aliquid, provident error tempore, modi culpa,
          quae reprehenderit architecto minima harum magnam atque eligendi id.
          Sed, ipsum cumque!
        </p>
      </div>
      <hr />{" "}
         <div style={{ padding: "20px" }}>
            <h1>😋Amazing Food List</h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {products.map((product) => (
                // 👇 Click karo toh /product/:id pe jayega
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      padding: "15px",
                      cursor: "pointer",
                      transition: "box-shadow 0.2s",
                      backgroundColor: "#fff",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0,0,0,0.15)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                    <h3 style={{ margin: "10px 0 5px" }}>{product.name}</h3>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      {product.description}
                    </p>
                    {product.price && (
                      <p style={{ fontWeight: "bold", color: "#e44" }}>
                        ${product.price}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
            <div  className="Map-sec"style={{ marginLeft: "5px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7002.66222368356!2d77.287675455373!3d28.649802867526752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5c19b33adb%3A0xf2081bd56338d441!2sJagat%20Puri%2C%20Krishna%20Nagar%2C%20Delhi%2C%20110051!5e0!3m2!1sen!2sin!4v1764337106896!5m2!1sen!2sin"
        width="650"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
      <div className="map-para"><p> <br/><br/><h2><b>Live-Location</b></h2><br/><br/>Fast & Transparent Delivery with Live Map Tracking
We offer a reliable <br/>and efficient delivery system designed to keep you informed at every step.<br/> Once your order is confirmed, you can track your package in real time through our interactive map,<br/> showing the exact location of your delivery partner.<br/> This live tracking feature helps you know the estimated arrival time, ensures transparency,
 <br/>and gives you complete peace of mind. Our delivery network covers wide locations and is optimized for speed and safety, so your products reach you on time and in perfect condition. With smart route navigation and instant status updates, we make sure your shopping experience remains smooth, secure, and hassle-free from checkout to doorstep.<br/> </p>
   </div> </div>
<div className="Contect-sec">
    <div className={"contact-Sec"}>
                <ul className={"section-1"}>
                <h3>Quick Link</h3>
                <p>Home</p>
                <p>Address</p>
                <p>Contact</p>
                <p>About</p>
                <p>Shop</p>
                    <p>Review</p></ul>
                <br/> <ul  className={"section-2"}>
                <h3>Follow Us</h3>
                <p><i  className="fa-brands fa-square-instagram"
                ></i>Instagram</p>
                <p><i className="fa-brands fa-square-twitter"></i> Twitter</p>
                <p><i className="fa-brands fa-linkedin"></i> Linkedin</p>
                <p><i className="fa-brands fa-facebook"></i>Facebook</p>
                <p><i className="fa-brands fa-square-whatsapp"></i>Whatsapp</p></ul>
                <br/>
              <ul  className={"section-3"}>  <h2>Newsletter</h2>
                <h4>Don't miss any offer</h4>
                <input className="secc" placeholder="Enter your Name"/><br/>
                <input className="secd" placeholder="Enter your Number "/><br/>
                <input className="secd" placeholder="Enter your E-Mail Address "/><br/>
                <input className="secd" placeholder="Enter your current-Addres "/><br/>
            </ul>

            </div>
  
  
  </div>         
    </>
  );
}

export default shop;
