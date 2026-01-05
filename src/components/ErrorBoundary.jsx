// src/components/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A minimal, production-safe error boundary.
 * Prevents a blank screen if a render crashes.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true, errorId: String(Date.now()) };
  }

  componentDidCatch(error, info) {
    // Log in dev only. In prod, you could wire this to Sentry/LogRocket.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, errorId: null });
  };

  render() {
    const { hasError, errorId } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) return children;

    if (fallback) {
      return typeof fallback === 'function' ? fallback({ errorId, reset: this.handleReset }) : fallback;
    }

    return (
      <div style={{ padding: 24, color: '#fff' }}>
        <h1 style={{ margin: '0 0 8px' }}>Something went off-script.</h1>
        <p style={{ margin: '0 0 16px', opacity: 0.9 }}>
          Refresh the page — and if it happens again, use this reference:
          <strong style={{ marginLeft: 8 }}>{errorId}</strong>
        </p>
        <button
          type="button"
          onClick={this.handleReset}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(0,0,0,0.35)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

ErrorBoundary.defaultProps = {
  fallback: null,
};

export default ErrorBoundary;
