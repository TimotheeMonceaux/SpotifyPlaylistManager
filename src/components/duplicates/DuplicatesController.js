import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../redux/actions';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderBar from '../headerbar/HeaderBar';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router-dom';
import { isStateLoaded } from '../../redux/store-utils';


// Presentational Component
class PDuplicatesController extends React.Component {
    render() {
        if (!this.props.userToken) return <Redirect to={"/"} />
        if (!isStateLoaded(this.props.loadingStatus)) return <Redirect to={"/loading"} />;
        return <div><HeaderBar />
                 <Container>
                    <Row>
                        <Col>
                            <p>Hello, World!</p>
                        </Col>
                    </Row>
                </Container>
            </div>;
    }
}
PDuplicatesController.propTypes = {
    environment: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
    userProfile: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    library: PropTypes.array.isRequired,
    loadingStatus: PropTypes.object.isRequired
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
const DuplicatesController = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PDuplicatesController)


export default DuplicatesController