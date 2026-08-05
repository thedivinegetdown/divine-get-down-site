import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { captureError } from '../utils/errorMonitoring';

jest.mock('../utils/errorMonitoring', () => ({
  captureError: jest.fn(),
}));

beforeEach(() => {
  captureError.mockClear();
});

test('captures React render errors and preserves the existing recovery UI', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  const boundary = new ErrorBoundary({ children: <div>Child</div> });
  const error = new Error('Render failed');
  const info = { componentStack: '\n    at BrokenComponent' };

  boundary.state = { hasError: false, errorId: 'reference-123' };
  boundary.componentDidCatch(error, info);

  expect(captureError).toHaveBeenCalledWith(error, {
    source: 'react_error_boundary',
    componentStack: info.componentStack,
    referenceId: 'reference-123',
  });

  boundary.state = { hasError: true, errorId: 'reference-123' };
  const recoveryView = boundary.render();

  expect(recoveryView.type).toBe('main');
  expect(recoveryView.props.id).toBe('main-content');
  expect(recoveryView.props.tabIndex).toBe(-1);
  expect(consoleError).toHaveBeenCalledWith('ErrorBoundary caught an error:', error, info);

  consoleError.mockRestore();
});
