import ContactForm from 'containers/ContactForm';
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import React from 'react';
import { PATIENTSLINKS } from 'constants/index'
import Layout from 'components/Layout';

function Contact(props) {
    return (
        <Layout>
            <ContactForm />
        </Layout>
    );
}

export default Contact;