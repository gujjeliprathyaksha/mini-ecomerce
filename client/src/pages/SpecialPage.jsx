import { Link } from 'react-router-dom';

const content = {
  'new-arrivals': { eyebrow: 'Just landed', title: 'New Arrivals', copy: 'Fresh pieces, first looks and the little details we are loving right now.', cards: ['The soft edit', 'Weekend dressing', 'New accessories'] },
  offers: { eyebrow: 'Limited time', title: 'Special Offers', copy: 'Up to 60% off beautiful pieces, thoughtfully selected for your next wardrobe moment.', cards: ['Ethnic Sale', 'Western Sale', 'Dress Sale', 'Saree Sale'] },
  about: { eyebrow: 'Our story', title: 'About LUMORA', copy: 'LUMORA brings together modern fashion, ethnic elegance and everyday styles in one calm, considered shopping experience.', cards: ['Our Story', 'Our Style', 'Our Promise'] },
  contact: { eyebrow: 'We are here for you', title: 'Contact LUMORA', copy: 'Questions about an order, a style or anything in between? Send us a note and our team will be in touch.', cards: ['hello@lumora.store', 'Customer Support', 'Mon - Sat · 10am - 6pm'] },
};

export default function SpecialPage() {
  const key = window.location.pathname.split('/').pop().replace('.html', '') || 'about';
  const page = content[key] || content.about;
  return <section className="special-page"><Link className="back-link" to="/">LUMORA / Home</Link><div className="special-hero"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.copy}</p></div><div className="special-grid">{page.cards.map((card, index) => <article className={`special-card special-card-${index}`} key={card}><span>0{index + 1}</span><h2>{card}</h2><p>{key === 'contact' ? 'We would love to hear from you.' : 'Beautifully considered, made for your everyday.'}</p></article>)}</div>{key === 'contact' ? <form className="contact-form" onSubmit={(event) => event.preventDefault()}><label>Name<input required /></label><label>Email<input required type="email" /></label><label>Message<textarea required rows="4" /></label><button className="button button-dark">Send Message ↗</button></form> : <Link className="button button-dark special-button" to="/products">Explore the collection ↗</Link>}</section>;
}
