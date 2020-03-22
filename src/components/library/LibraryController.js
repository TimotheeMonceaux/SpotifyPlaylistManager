import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../redux/actions';
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
    environment: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
    userProfile: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    library: PropTypes.array.isRequired,
    loadingStatus: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        environment: state.environment,
        userToken: state.userToken,
        userProfile: state.userProfile,
        userPlaylists: state.userPlaylists,
        library: state.library,
        loadingStatus: state.loadingStatus
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadUserProfile: (token) => {dispatch(ActionCreator.loadUserProfile(token))},
        loadUserPlaylists: (token) => {dispatch(ActionCreator.loadUserPlaylists(token))},
        loadLibraryTracks: (token) => {dispatch(ActionCreator.loadLibraryTracks(token))},
    }
}
const LibraryController = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PLibraryController)


export default LibraryController