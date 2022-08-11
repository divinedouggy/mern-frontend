import Nav from './Nav';
import Footer from './Footer';


const Layout = (props) => {

    return (
        <div>
            <h1>Items App</h1>
            <Nav />

            {props.children}
            {/* ^^ renders h4 we put in Home: <Layout/> */}

            <Footer />
        </div>
    )
}

export default Layout
