import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {


    return (
        <>
            {/* common Header */}
            <Header />
            {children}
            <Footer />

        </>
    )
}


export default Layout;
