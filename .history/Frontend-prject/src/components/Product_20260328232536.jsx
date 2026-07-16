import React from 'react'

function Product() {
  return (
    <div>
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
    </div>
  )
}

export default Product
