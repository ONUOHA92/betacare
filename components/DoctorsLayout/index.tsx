import React from 'react';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';

function Layout({ children }) {
    return (
        <React.Fragment>
            <Navbar />
            {children}
            <Footer />
        </React.Fragment>
    );
}

export default Layout
