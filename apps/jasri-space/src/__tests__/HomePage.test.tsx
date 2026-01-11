import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

// Mock axios to avoid actual API calls
vi.mock('axios', () => ({
    default: {
        create: () => ({
            get: vi.fn().mockResolvedValue({ data: [] }),
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
        }),
    },
}));

describe('HomePage', () => {
    it('renders the homepage', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        // HomePage should render
        expect(document.body).toBeDefined();
    });
});
