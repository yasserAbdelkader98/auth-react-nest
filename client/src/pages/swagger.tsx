import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function DocsPage() {
  return <SwaggerUI url={`${import.meta.env.VITE_API_BASE_URL}/api-docs-json`} />;
}
