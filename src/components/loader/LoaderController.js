import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import './Loader.css';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { isStateLoaded } from '../../redux/store-utils';
import { VLayout, HLayout } from '../Layout';

// 1 - Load the user profile
class PUserProfileLoader extends React.Component {
    componentDidMount() {
        if (this.props.environment !== "TEST" && this.props.userToken) {
            this.props.loadUserProfile(this.props.userToken);
        }
    }

    render = () => <p>Loading User Profile...</p>;
}
PUserProfileLoader.propTypes = {
    userToken: PropTypes.string.isRequired,
}
const UserProfileLoader = connect(
    (state) => ({userToken: state.userToken}),
    (dispatch) => ({loadUserProfile: (token) => {dispatch(ActionCreator.loadUserProfile(token))}})
  )(PUserProfileLoader)


// 2 - Load the user's playlists list
class PPlaylistsListLoader extends React.Component {
    componentDidMount() {
        if (this.props.environment !== "TEST" && this.props.userToken) {
            this.props.loadUserPlaylists(this.props.userToken);
        }
    }

    render = () => <p>Loading the Playlists...</p>;
}
PPlaylistsListLoader.propTypes = {
    userToken: PropTypes.string.isRequired,
}
const PlaylistsListLoader = connect(
    (state) => ({userToken: state.userToken}),
    (dispatch) => ({loadUserPlaylists: (token) => {dispatch(ActionCreator.loadUserPlaylists(token))}})
  )(PPlaylistsListLoader)


// 3 - Load the user's liked songs (also known as the spotify library)
class PLikedSongsLoader extends React.Component {
    componentDidMount() {
        if (this.props.environment !== "TEST" && this.props.userToken) {
            this.props.loadLibraryTracks(this.props.userToken);
        }
    }

    render = () => <p>Loading the liked songs...</p>;
}
PLikedSongsLoader.propTypes = {
    userToken: PropTypes.string.isRequired,
}
const LikedSongsLoader = connect(
    (state) => ({userToken: state.userToken}),
    (dispatch) => ({loadLibraryTracks: (token) => {dispatch(ActionCreator.loadLibraryTracks(token))}})
  )(PLikedSongsLoader)


// 4 - Load the playlists'tracks
class PPlaylistsTracksLoader extends React.Component {
    componentDidMount() {
        this.props.userPlaylists.map(p => this.props.loadPlaylistTracks(this.props.userToken, p.id));
    }

    render = () => <p>Loading the playlists tracks...</p>;
}
PPlaylistsTracksLoader.propTypes = {
    userToken: PropTypes.string.isRequired,
}
const PlaylistsTracksLoader = connect(
    (state) => ({userToken: state.userToken, userPlaylists: state.userPlaylists}),
    (dispatch) => ({loadPlaylistTracks: (token, pid) => {dispatch(ActionCreator.loadPlaylistTracks(token, pid))}})
  )(PPlaylistsTracksLoader)



// Presentational Component
class PLoaderController extends React.Component {
    render() {
        if (!this.props.userToken) return <Redirect to={"/"} />
        if (isStateLoaded(this.props.loadingStatus)) return <Redirect to={"/library"} />;
    
        return <VLayout className="loader">
                <HLayout>
                    <Loading />
                </HLayout>
                <HLayout>
                    <VLayout>
                        {this.props.loadingStatus.userProfile < 1 && <UserProfileLoader />}
                        {this.props.loadingStatus.userProfile >= 1 && this.props.loadingStatus.playlistsList < 1 && <PlaylistsListLoader />}
                        {this.props.loadingStatus.playlistsList >= 1 && this.props.loadingStatus.library < 1 && <LikedSongsLoader />}
                        {this.props.loadingStatus.library >= 1 && <PlaylistsTracksLoader />}
                    </VLayout>
                </HLayout>
            </VLayout>;
    }
}
PLoaderController.propTypes = {
    environment: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired,
    loadingStatus: PropTypes.object.isRequired
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