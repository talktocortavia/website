import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="h1">That page is not here.</h1>
        <p className="lead">It may have moved, or the address may have a typo.</p>
        <div className="actions">
          <Link className="btn btn-primary" to="/">
            Back to the home page
          </Link>
          <Link className="btn btn-ghost" to="/use-cases/">
            Browse use cases
          </Link>
        </div>
      </div>
    </section>
  );
}
