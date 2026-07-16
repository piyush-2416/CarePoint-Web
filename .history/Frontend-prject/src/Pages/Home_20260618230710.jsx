// import {Link} from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [students, setStudents] = useState([]);
// useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/students") // 👈 backend URL
//       .then((res) => {
//         setStudents(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//      return (
//          <>
//              <div className="app">
//   <div className="container">
//                      <img src="https://images.pexels.com/photos/2318966/pexels-photo-2318966.jpeg"/>
//                      {/*<button>Login</button>*/}
//                  </div>
//                  <br/>
//                  <h1>Products</h1>

//                  <ul>
//                      <li>
//                          <Link className={"Element"} to="/element">  <img src="https://images.pexels.com/photos/2119758/pexels-photo-2119758.jpeg"/></Link> {" "}

//                      </li>
//                      <li>
//                          <Link className={"Element2"} to="/element2"> <img src="https://recipes.timesofindia.com/photo/52532656.cms"/></Link> {" "}
//                      </li>
//                      <li>
//                          <img
//                              src={"https://static.vecteezy.com/system/resources/previews/047/831/550/non_2x/delicious-plate-of-chicken-chow-mein-featuring-noodles-and-fresh-vegetables-in-a-dark-bowl-vibrant-and-appetizing-chinese-cuisine-png.png"}/>
//                      </li>
//                      <li>
//                          <img
//                              src={"https://static.vecteezy.com/system/resources/previews/038/972/466/large_2x/ai-generated-veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and-served-with-sauce-over-a-rustic-wooden-background-selective-focus-photo.jpg"}/>
//                      </li>
//                      <li>
//                          <img
//                              src={"https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg"}/>
//                      </li>
//                      <li>
//                          <img src={"https://images.alphacoders.com/105/1050377.jpg"}/>
//                      </li>
//                  </ul>
//              </div>

//              <br/><h1>Products-sec</h1>
//                <Link className={"Product"} to="/Product">

//              <div className="card-body">
//                  <ul>
//                      <li>
//                          <img
//                              src={"https://brookrest.com/wp-content/uploads/2020/05/AdobeStock_282247995-scaled.jpeg"}/>
//                          <h3>Burger</h3>
//                          <h5> This is the Burgur
//                          </h5>
//                      </li>
//                      <li><img src={"https://www.cookinwithmima.com/wp-content/uploads/2023/04/honey-chilli-fries.jpg"}/>
//                          <h3>Chilli
//                              Patato</h3>
//                          <h5>This is the Chilli patato
//                          </h5></li>

//                      <li><img
//                          src={"https://static.vecteezy.com/system/resources/thumbnails/038/561/425/small_2x/ai-generated-a-slice-of-gourmet-cheese-pizza-being-lifted-with-hot-melted-cheese-stretching-from-the-pie-generative-ai-photo.jpeg"}/>
//                          <h3>Pizza</h3>
//                          <h5>This is the Pizza
//                          </h5></li>
//                  </ul>
//                  <ul>
//                      <li><img src={"https://cdn.pixabay.com/photo/2023/09/22/18/53/ai-generated-8269635_1280.jpg"}/>
//                          <h3>Pasta</h3>
//                          <h5>This is the Pasta
//                          </h5></li>
//                      <br/>
//                      <br/>
//                      <li><img src={"https://cdn.pixabay.com/photo/2023/07/18/19/19/spring-rolls-8135469_1280.jpg"}/>
//                          <h3>Spring Roll</h3>
//                          <h5>This is the Roll
//                          </h5></li>
//                      <li><img src={"https://www.crazymasalafood.com/wp-content/images/pudina-4.jpg"}/>
//                          <h3>Chaap</h3>
//                          <h5>This is the chaap
//                          </h5></li>
//                  </ul>
//              </div></Link> {" "}
//              <hr/>
//    <div>
//             <h1 >Student Data</h1>
//           {students.map((item) => (
//          <div key={item._id}>
//         <h2>{item.age}</h2>
//         <h2>{item.Rank}</h2>
//          <img src={item.image}/>
//          <h3>{item.name}</h3>
//          <h4>{item.surname}</h4>l
//         <h2>{item.description}</h2>
//         </div>
//       ))}
//     </div>

//          </>
//      );
//  }
//  export default Home

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  // const [datasend,setDatasend]=useState();
  // document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list");
  const [products, setProducts] = useState([]);
  const [add,setAdd]=useState(0);

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

  // setDatasend(document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list"))
  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;




  return (
    <>


    <div className="Navbar">
        <Link className={"home"} to="/">
          Home
        </Link>
        {""}
        <Link className={"about"} to="/about">
          About
        </Link>{" "}
        <Link className={"contact"} to="/contact">
          Contact
        </Link>
        <div className="shop-login">
          <Link className={"Shop"} to="/shop">
           🛍️
          </Link>
          <Link className={"Login"} to="/login">
            Login🔒
          </Link>
        </div>
      </div> 
      <div>
        <div>
          {/* <br/> */}
          <div className="Main-sec">
            <div className="Main-image">
              {" "}
              <ul>
                <li>
                  <h1 className="text-amber-800">Welcome</h1>
                  {/* <h2>Food Corner</h2> */}
           <button>Buy Now</button>
                </li>
              </ul>{" "}
            </div>
          </div>
{/* <hr/> */}
<hr></hr><br/>
          <h1 className="">Category🍟</h1>
        

         {/* <Link  */}
        {/* className={"shop"} to="/shop"  */}
          <div onClick={() => document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list")
 }className="producta">
          <img onClick={() => document.getElementsByClassName("producta").document.getElementsByClassName("Shop-list")} src="https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg" />
            <img src="https://wallpaperbat.com/img/295451-fast-food-wallpaper.jpg" />
            <img src=" https://images7.alphacoders.com/396/396289.jpg" />
            <img src="https://lishcreative.com/wp-content/uploads/2020/09/IMG_9618-scaled.jpg " />
            <img src="https://vegecravings.com/wp-content/uploads/2023/08/Honey-Chilli-Potato-Recipe-Step-By-Step-Instructions-scaled.jpg " />
            <img src=" https://png.pngtree.com/background/20230528/original/pngtree-coffees-and-shots-of-coffees-on-a-table-picture-image_2783645.jpg" />
          </div>
          {/* </Link> */}
          <hr/>
          <h1 className="">Food-Offer👌</h1>
          <img
            className="offer-image"
            src=" https://res.cloudinary.com/pofi-technologies-pvt-ltd/image/upload/v1615881625/Shopurfood/restaurant-deals_ov41lu.jpg"
          />
          <div style={{ padding: "20px" }}>
            <h1>🍔 Food List</h1>

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
                      border: "2px solid #d24545",
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
                    <button className="text-2px">Details</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
<hr/>
          <h1>Shop 🛍️</h1>
        <Link className={"Shop"} to="/shop">  <div className="shop-sec">
            <ul className="Shop-list">
              <br />{" "}
              <li>
                <img src="https://i.pinimg.com/originals/96/cf/a9/96cfa90eb13daac9eab2c4ac59740c1d.jpg" />
                <h2>Shop-1</h2>
                <h3>We have Freshing Food </h3> <h3>⭐⭐⭐</h3>
                <button className="bg-blue-200">Contect us</button>
              </li>
              <br />
              <li>
                <img src="https://www.laurelbankjoinery.ie/wp-content/uploads/2015/03/Shopfront-Nourish-Wicklow-Street-Dublin-2.jpg" />
                <h2>Shop-2</h2>
                <h3>We have amazing Food</h3>
                <h3>⭐⭐⭐</h3> <button>Contect us</button>
              </li>
              <br />
              <li>
                <img src="https://www.mauryaindianrestaurants.com/wp-content/uploads/2022/10/IMG_3326_11-1536x1152.jpg" />
                <h2>Shop-3</h2>
                <h3>We have awesome food</h3> <h3>⭐⭐⭐</h3>
                <button>Contect us</button>
              </li>
              <br />
            </ul>
          </div>
      </Link>
        </div>    <br /><hr/>
        <h1>Some-Blogs📝</h1>
        <div className="Blog-sec">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
         <div className="" >   <button
            className="Blog-btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          ><img src="https://img.freepik.com/premium-photo/delicious-fast-food-black-background-4k-hd-photos-creative-projects_1193781-1845.jpg"/>
         Blog-1
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="top-2 right-2 absolute btn btn-lg btn-circle btn-ghost">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Fast Food Blog</h3>
              <img
                className="blog-img"
                src="https://img.freepik.com/premium-photo/delicious-fast-food-black-background-4k-hd-photos-creative-projects_1193781-1845.jpg"
              ></img>
              <p className="py-1 font-stretch-200%">
                Fast food is so amazing in taste{" "}
              </p>
            </div>
          </dialog>
<br/>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="Blog-btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          ><img src="https://static.vecteezy.com/system/resources/previews/031/765/138/non_2x/free-fruit-and-juice-generative-ai-free-photo.jpg"/> 
            Blog-2
          </button>
          <dialog
            id="my_modal_5"
            className="modal-bottom modal sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Fruit juices</h3>
              <img src="https://static.vecteezy.com/system/resources/previews/031/765/138/non_2x/free-fruit-and-juice-generative-ai-free-photo.jpg"></img>
              <p className="py-4">Fruit juices can make the strong body</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
       <button
            className="Blog-btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <img  className="Blog-img"src="https://www.mashed.com/img/gallery/the-best-new-fast-food-menu-items-weve-tried-in-2023-so-far/l-intro-1682446897.jpg"/>
            Blog-3
          </button>
          <dialog
            id="my_modal_5"
            className="modal-bottom modal sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg"></h3>
              <img src="https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg" />
              <p className="py-4">Vegs are so imp for healt</p>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* The button to open modal */}

          </div>
        </div>
        
      </div>
     <br/> <hr/><br/>
      <footer className="bg-base-200 p-10 text-base-content footer sm:footer-horizontal">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="w-80">
      <label>Enter your email address</label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button className="border-t-neutral-800 btn join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
<br/>

    </>
  );
}

export default Home;
