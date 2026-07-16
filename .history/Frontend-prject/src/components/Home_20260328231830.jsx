import {Link} from "react-router-dom";

function Home() {

     return (
         <>
             <div className="app">
  <div className="container">
                     <img src="https://images.pexels.com/photos/2318966/pexels-photo-2318966.jpeg"/>
                     {/*<button>Login</button>*/}
                 </div>
                 <br/>
                 <h1>Products</h1>
                 <ul>
                     <li>
                         <Link className={"Element"} to="/element">  <img src="https://images.pexels.com/photos/2119758/pexels-photo-2119758.jpeg"/></Link> {" "}

                     </li>
                     <li>
                         <Link className={"Element2"} to="/element2"> <img src="https://recipes.timesofindia.com/photo/52532656.cms"/></Link> {" "}
                     </li>
                     <li>
                         <img
                             src={"https://static.vecteezy.com/system/resources/previews/047/831/550/non_2x/delicious-plate-of-chicken-chow-mein-featuring-noodles-and-fresh-vegetables-in-a-dark-bowl-vibrant-and-appetizing-chinese-cuisine-png.png"}/>
                     </li>
                     <li>
                         <img
                             src={"https://static.vecteezy.com/system/resources/previews/038/972/466/large_2x/ai-generated-veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and-served-with-sauce-over-a-rustic-wooden-background-selective-focus-photo.jpg"}/>
                     </li>
                     <li>
                         <img
                             src={"https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg"}/>
                     </li>
                     <li>
                         <img src={"https://images.alphacoders.com/105/1050377.jpg"}/>
                     </li>
                 </ul>
             </div>

             <br/><h1>Products-sec</h1>
             <div className="card-body">
                 <ul>
                     <li>
                         <img
                             src={"https://brookrest.com/wp-content/uploads/2020/05/AdobeStock_282247995-scaled.jpeg"}/>
                         <h3>Burger</h3>
                         <h5> This is the Burgur
                         </h5>
                     </li>
                     <li><img src={"https://www.cookinwithmima.com/wp-content/uploads/2023/04/honey-chilli-fries.jpg"}/>
                         <h3>Chilli
                             Patato</h3>
                         <h5>This is the Chilli patato
                         </h5></li>

                     <li><img
                         src={"https://static.vecteezy.com/system/resources/thumbnails/038/561/425/small_2x/ai-generated-a-slice-of-gourmet-cheese-pizza-being-lifted-with-hot-melted-cheese-stretching-from-the-pie-generative-ai-photo.jpeg"}/>
                         <h3>Pizza</h3>
                         <h5>This is the Pizza
                         </h5></li>
                 </ul>
                 <ul>
                     <li><img src={"https://cdn.pixabay.com/photo/2023/09/22/18/53/ai-generated-8269635_1280.jpg"}/>
                         <h3>Pasta</h3>
                         <h5>This is the Pasta
                         </h5></li>
                     <br/>
                     <br/>
                     <li><img src={"https://cdn.pixabay.com/photo/2023/07/18/19/19/spring-rolls-8135469_1280.jpg"}/>
                         <h3>Spring Roll</h3>
                         <h5>This is the Roll
                         </h5></li>
                     <li><img src={"https://www.crazymasalafood.com/wp-content/images/pudina-4.jpg"}/>
                         <h3>Chaap</h3>
                         <h5>This is the chaap
                         </h5></li>
                 </ul>
             </div>
             <hr/>

         </>
     );
 }

export default Home;