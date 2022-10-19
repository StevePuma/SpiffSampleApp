import { Nav, Navbar, Container } from 'react-bootstrap';
import sisense_icon from '../../assets/images/Sisense-Logo-Horizontal.svg'
import regionalConfig from '../../config_region';

const SisenseUrlLink = () => {

    return (
        <Navbar bsPrefix="navbar fixed-height">
            <Container>
                <Navbar.Brand>
                    <a href={regionalConfig.SISENSE_URL} target="_blank" rel="noreferrer">
                        <img
                            src={sisense_icon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </a>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default SisenseUrlLink;
