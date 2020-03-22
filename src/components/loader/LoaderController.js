import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { isStateLoaded } from '../../redux/store-utils';


// Presentational Component
class PLoaderController extends React.Component {
    componentWillMount() {
        if (this.props.environment !== "TEST" && this.props.userToken) {
            this.props.loadUserProfile(this.props.userToken);
            this.props.loadUserPlaylists(this.props.userToken);
            this.props.loadLibraryTracks(this.props.userToken);
        }
    }

    render() {
        if (!this.props.userToken) return <Redirect to={"/"} />
        if (isStateLoaded(this.props.loadingStatus)) return <Redirect to={"/library"} />;
        return <div><Loading /></div>;
    }
}
PLoaderController.propTypes = {
    environment: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
    loadingStatus: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        environment: state.environment,
        userToken: state.userToken,
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
const LoaderController = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PLoaderController)


export default LoaderController