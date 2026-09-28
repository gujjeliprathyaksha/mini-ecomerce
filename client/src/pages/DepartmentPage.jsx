import { Link, useParams } from 'react-router-dom';
import { departments, slugify } from '../data/departments.js';

const categoryImages = [
  'photo-1610030469983-98e550d6193c', 'photo-1496747611176-843222e1e57c', 'photo-1541099649105-f69ad21f3246', 'photo-1529139574466-a303027c1d8b', 'photo-1490481651871-ab68de25d43d', 'photo-1515886657613-9f3515b0c78f', 'photo-1503602642458-232111445657', 'photo-1497366754035-f200968a6e72',
];

export default function DepartmentPage() {
  const { department: routeDepartment } = useParams();
  const data = departments[routeDepartment];
  if (!data) return <section className="content-page"><div className="state-panel">Department not found.<Link to="/">Return home</Link></div></section>;
  return <section className="content-page department-page">
    <div className="page-heading"><div><p className="eyebrow">LUMORA / Department</p><h1>{data.title}</h1><p>{data.description}</p></div><img className="department-cover" src={data.image} alt={data.title} /></div>
    <div className="department-groups">{Object.entries(data.categories).map(([key, [title, items]]) => <section className="department-group" key={key}><div className="section-title"><div><p className="eyebrow">Explore the edit</p><h2>{title}</h2></div><Link className="quiet-link" to={`/browse/${routeDepartment}/${key}`}>View all</Link></div><div className="subcategory-grid">{items.map((item, index) => <Link className="subcategory-card" key={item} to={`/browse/${routeDepartment}/${key}/${slugify(item)}`}><img src={`https://images.unsplash.com/${categoryImages[index % categoryImages.length]}?auto=format&fit=crop&w=700&q=85`} alt={item} /><span>{item}</span><small>Explore collection ↗</small></Link>)}</div></section>)}</div>
  </section>;
}
