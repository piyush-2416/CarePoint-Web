import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import ProductPage from './ProductPage'
import Doctorid from './Doctorid'
function Appointment() {
    const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get(`http://localhost:3000/api/Doctorid/${id}`) // 👈 Backend se single product fetch
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Product nahi mila!");
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  // Error state
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
        <Link to="/" style={{ color: "blue" }}>
          ← Home par wapas jao
        </Link>
      </div>
    );

  // Product nahi mila
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product nahi mila 😕</h2>
        <Link to="/">← Home par wapas jao</Link>
      </div>
    );
  return (
    <div>
      <Navbar/>

      <div className='appointment-sec'> <img src='https://themighty.com/wp-content/uploads/2018/01/GettyImages-533227522-1280x640.jpg'/>
    
</div>
    </div>
  )
}

export default Appointment
