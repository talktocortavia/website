import { Link } from 'react-router-dom';
import { getPolicy } from '../content/policies';
import NotFound from './NotFound';

export default function Privacy({ slug }: { slug: string }) {
  const p = getPolicy(slug);
  if (!p) return <NotFound />;
  return (
    <section className="policy section-tight">
      <div className="container policy-wrap">
        <div className="policy-body" dangerouslySetInnerHTML={{ __html: p.html }} />
        <p className="policy-back">
          <Link to="/">← Back to Cortavia</Link>
        </p>
      </div>
    </section>
  );
}
