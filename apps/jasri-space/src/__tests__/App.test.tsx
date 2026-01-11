import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // App should render and contain some content
        expect(document.body).toBeDefined();
    });
});
