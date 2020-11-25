import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Library from './Library';
import HeaderBar from '../HeaderBar';
import 'bootstrap/dist/css/bootstrap.css';
import Toolbar from '../Toolbar';
import { Redirect } from 'react-router-dom';
import { isStateLoaded } from '../../redux/store-utils';


// Presentational Component
class PLibraryController extends React.Component {
    render() {
        if (!this.props.userToken) return <Redirect to={"/"} />
        if (!isStateLoaded(this.props.loadingStatus)) return <Redirect to={"/loading"} />;
        return <div><HeaderBar />
                 <Container>
                    <Row style={{marginTop: "25px", marginBottom: "10px"}}><Toolbar /></Row>
                    <Row>
                        <Col>
                            <Library />
                        </Col>
                    </Row>
                </Container>
            </div>;
    }
}
PLibraryController.propTypes = {
    userToken: PropTypes.string.isRequired,
    loadingStatus: PropTypes.object.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        userToken: state.userToken,
        loadingStatus: state.loadingStatus
    };
}
const LibraryController = connect(
    mapStateToProps
  )(PLibraryController)


export default LibraryController