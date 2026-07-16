// import React from 'react'
// import App from '../App'
// import Home from './Home'
// function Doctors() {
//   return (
//     <div>
//       <h1>hello piyush </h1>
//                        {/* <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//                 gap: "20px",
//                 marginTop: "20px",
//               }}
//             >
//               {products.map((product) => (
//                 // 👇 Click karo toh /product/:id pe jayega
//                 <Link
//                   to={`/product/${product._id}`}
//                   key={product._id}
//                   style={{ textDecoration: "none", color: "black" }}
//                 >
//                   <div
//                     style={{
//                       border: "2px solid #d24545",
//                       borderRadius: "10px",
//                       padding: "15px",
//                       cursor: "pointer",
//                       transition: "box-shadow 0.2s",
//                       backgroundColor: "#fff",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.boxShadow =
//                         "0 4px 15px rgba(0,0,0,0.15)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.boxShadow = "none")
//                     }
//                   >
//                     {product.image && (
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         style={{
//                           width: "100%",
//                           height: "150px",
//                           objectFit: "cover",
//                           borderRadius: "8px",
//                         }}
//                       />
//                     )}
//                     <h3 style={{ margin: "10px 0 5px" }}>{product.name}</h3>
//                     <p style={{ color: "#666", fontSize: "14px" }}>
//                       {product.description}
//                     </p>
//                     {product.price && (
//                       <p style={{ fontWeight: "bold", color: "#e44" }}>
//                         ${product.price}
//                       </p>
//                     )}
//                     <button className="text-2px">Details</button>
//                   </div>
//                 </Link>
//               ))} 
//             {/* </div> 
//           </div>*/}
// <hr/>
//      </div>
//   )
// }

// export default Doctors
import React from 'react'
import Home from './Home'
function Doctors() {
  return (
    <>
      <h1>HEllo</h1>
    </>
  )
}

export default Doctors
