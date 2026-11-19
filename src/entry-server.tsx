import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { allPages, metaFor, NOT_FOUND } from './seo';
import { redirects } from './content/policies';
import { SITE } from './data/site';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}

export { allPages, metaFor, NOT_FOUND, redirects, SITE };
