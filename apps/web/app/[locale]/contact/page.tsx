import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { ContactPageContent } from './components/contact-page-content';

const ContactPage = () => (
  <div className="min-h-screen bg-white">
    <SiteHeader />
    <ContactPageContent />
    <SiteFooter />
  </div>
);

export default ContactPage;
