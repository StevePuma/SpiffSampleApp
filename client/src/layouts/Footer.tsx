import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid>
                <Row>
                    <Col md={6}>
                        {new Date().getFullYear()} &copy; Demo by <a href="https://www.sisense.com" target="_blank" rel="noreferrer">Sisense</a>
                    </Col>
                    <Col md={6}>
                        <div className="text-md-end footer-links d-none d-md-block">
                            <a href="https://www.sisense.com/about/" target="_blank" rel="noreferrer">About Us</a>
                            <a href="https://www.sisense.com/marketplace/" target="_blank" rel="noreferrer">Marketplace</a>
                            <a href="https://sisense.dev" target="_blank" rel="noreferrer">Developers</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
