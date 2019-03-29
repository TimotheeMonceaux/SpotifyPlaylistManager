import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../redux/actions';
import { Container, Row, Col } from 'react-bootstrap';
import Library from './Library';
import HeaderBar from './HeaderBar';
import 'bootstrap/dist/css/bootstrap.css';
import Toolbar from './library/Toolbar';


// Presentational Component
class PController extends React.Component {
    componentWillMount() {
        if (this.props.environment !== "TEST") {
            this.props.loadUserProfile(this.props.userToken);
            this.props.loadUserPlaylists(this.props.userToken);
            this.props.loadLibraryTracks(this.props.userToken);
        }
    }

    render() {
        return <div><HeaderBar />
                 <Container>
                    <Row style={{marginTop: "10px", marginBottom: "10px"}}><Toolbar /></Row>
                    <Row>
                        <Col>
                            <Library />
                        </Col>
                    </Row>
                </Container>
            </div>;
    }
}
PController.propTypes = {
    environment: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
    userProfile: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    library: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        environment: state.environment,
        userToken: state.userToken,
        userProfile: state.userProfile,
        userPlaylists: state.userPlaylists,
        library: state.library
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadUserProfile: (token) => {dispatch(ActionCreator.loadUserProfile(token))},
        loadUserPlaylists: (token) => {dispatch(ActionCreator.loadUserPlaylists(token))},
        loadLibraryTracks: (token) => {dispatch(ActionCreator.loadLibraryTracks(token))},
    }
}
const Controller = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PController)


export default Controller