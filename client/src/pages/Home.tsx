import { Link } from 'react-router-dom';
import { useAuth } from '../Context/auth';

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-orb home-orb-one" />
        <div className="home-orb home-orb-two" />

        <div className="container position-relative">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <span className="home-eyebrow">
                Secure authentication starter
              </span>
              <h1 className="home-title">
                Welcome to the <span>application</span>
              </h1>
              <p className="home-lead">
                A focused full-stack authentication experience built with React,
                NestJS, and secure HttpOnly cookie sessions.
              </p>

              {isAuthenticated && user ? (
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <Link
                    className="btn btn-light btn-lg home-primary-action"
                    to="/accountSettings"
                  >
                    Manage account
                  </Link>
                  <span className="home-welcome-note">
                    Signed in as {user.firstName} {user.lastName}
                  </span>
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-3">
                  <Link
                    className="btn btn-light btn-lg home-primary-action"
                    to="/register"
                  >
                    Create an account
                  </Link>
                  <Link className="btn btn-outline-light btn-lg" to="/login">
                    Sign in
                  </Link>
                </div>
              )}

              <div
                className="home-trust-row"
                aria-label="Application highlights"
              >
                <span>HttpOnly cookies</span>
                <span>Protected routes</span>
                <span>Strong validation</span>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="home-preview" aria-hidden="true">
                <div className="home-preview-header">
                  <div className="home-preview-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>auth.app</span>
                </div>
                <div className="home-preview-body">
                  <div className="home-lock">✓</div>
                  <p className="home-preview-label">Session protected</p>
                  <h2>Your account is secure</h2>
                  <p>
                    Authentication is verified by the API and kept outside
                    JavaScript-accessible storage.
                  </p>
                  <div className="home-status">
                    <span className="home-status-dot" />
                    Security checks active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <article className="home-feature-card">
                <span className="home-feature-number">01</span>
                <h2>Secure by default</h2>
                <p>
                  JWT sessions use HttpOnly cookies, server verification, and
                  protected endpoints.
                </p>
              </article>
            </div>
            <div className="col-md-4">
              <article className="home-feature-card">
                <span className="home-feature-number">02</span>
                <h2>Built for clarity</h2>
                <p>
                  A typed, modular frontend communicates with a clean NestJS
                  service architecture.
                </p>
              </article>
            </div>
            <div className="col-md-4">
              <article className="home-feature-card">
                <span className="home-feature-number">03</span>
                <h2>Ready to explore</h2>
                <p>
                  Review the documented API, create an account, and test the
                  complete auth flow.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
