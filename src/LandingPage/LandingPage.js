import React from 'react';
import './LandingPage.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: 'https://img.icons8.com/color/48/conference-call--v1.png', title: 'Role-Based Access', desc: 'Admins, managers, and staff see only what they need.' },
  { icon: 'https://img.icons8.com/color/48/combo-chart--v1.png', title: 'Data Visualization', desc: 'Charts and graphs for instant inventory insights.' },
  { icon: 'https://img.icons8.com/color/48/edit-property.png', title: 'Easy CRUD Operations', desc: 'Add, edit, and remove items with ease.' },
  { icon: 'https://img.icons8.com/color/48/time-machine.png', title: 'Real-Time Updates', desc: 'Stay in sync with instant inventory changes.' },
  { icon: 'https://img.icons8.com/color/48/privacy.png', title: 'Secure & Reliable', desc: 'Your data is protected and always available.' },
  { icon: 'https://img.icons8.com/color/48/manager--v1.png', title: 'Staff Management', desc: 'Admins can manage, assign roles, and regulate staff and employee actions.' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />
      <section className="hero minimal-hero">
        <div className="hero-content">
          <h1>Rule Your Warehouse</h1>
          <p>Modern inventory management for teams that want to move fast.</p>
          <button className="cta-btn" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="section-content-inner">
          <div className="about-img-col">
            <img src="https://picsum.photos/400/300?random=1" alt="About InventoryAce" className="about-img" />
          </div>
          <div className="about-text-col">
            <div className="section-heading">About</div>
            <p className="section-paragraph">InventoryAce is a modern warehouse inventory management system that empowers your team to track, manage, and optimize stock with ease. Role-based dashboards, real-time data, and intuitive controls make inventory management effortless for admins, managers, and staff alike.</p>
          </div>
        </div>
      </section>
      <section id="problem-solution" className="problem-section">
        <div className="section-content-inner">
          <div className="problem-text-col">
            <div className="section-heading">Problem & Solution</div>
            <p className="section-paragraph"><strong>Common Challenges:</strong> Manual tracking, stockouts, overstock, and lack of real-time visibility can cripple warehouse operations.</p>
            <p className="section-paragraph"><strong>How InventoryAce Helps:</strong> Our platform automates tracking, provides instant updates, and delivers actionable insights—eliminating guesswork and boosting efficiency.</p>
          </div>
          <div className="problem-img-col">
            <img src="https://picsum.photos/400/300?random=2" alt="Warehouse Problem Solution" className="problem-img" />
          </div>
        </div>
      </section>
      <section id="features" className="features-section">
        <div className="section-heading">Key Features</div>
        <div className="features-list grid-features">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <img src={f.icon} alt={f.title} className="icon" />
              <div className="title">{f.title}</div>
              <div className="desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
      <footer id="contact" className="footer">
        <div className="section-heading" style={{color: '#eafff3'}}>Contact & Socials</div>
        <div style={{fontSize: '2rem', margin: '1rem 0'}}>
          <a href="mailto:info@InventoryAce.com" target="_blank" rel="noopener noreferrer" aria-label="Email" style={{margin: '0 1rem'}}>
            <img src="https://img.icons8.com/doodle/48/new-post.png" alt="Email" className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{margin: '0 1rem'}}>
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" style={{margin: '0 1rem'}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" className="social-icon"><path fill="#212121" fill-rule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clip-rule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon></svg>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{margin: '0 1rem'}}>
            <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" className="social-icon" />
          </a>
        </div>
        <div style={{fontSize: '1rem', color: '#eafff3'}}>© {new Date().getFullYear()} InventoryAce. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPage; 