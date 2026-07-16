function Contact() {
    return (
        <>

            <div className={"contact-sec"}>
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
        </>)
}

export default Contact;