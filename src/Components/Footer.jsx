import './Footer.css'
const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div className="logo">
                    <img src="path/to/logo.png" alt="Logo" />
                </div>
                <div className="contact">
                    <p>Contact us at:</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className="icon">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/facebook-icon.png" alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/twitter-icon.png" alt="Twitter" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/instagram-icon.png" alt="Instagram" />
                    </a>
                </div>
            </div>
            <div className="bottom">
                2024 all rights reserved.
            </div>
        </div>
    )
}

export default Footer

