export default function Footer(){

  return (
    
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">About the App</a></li>
            <li><a href="#">Our Team</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Information</h4>
          <ul>
            <li><a href="mailto:contact@example.com">contact@example.com</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Help & FAQs</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><img src="/icons/facebook.svg" alt="Facebook" /></a>
            <a href="#" aria-label="Twitter"><img src="/icons/twitter.svg" alt="Twitter" /></a>
            <a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="Instagram" /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Language</h4>
          <select>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
    
  );
}

  
  
