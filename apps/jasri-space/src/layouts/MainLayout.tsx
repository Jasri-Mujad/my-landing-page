import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
