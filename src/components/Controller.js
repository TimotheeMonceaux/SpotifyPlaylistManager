import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../redux/actions';
import { VLayout, HLayout } from './Layout';
import UserProfileCard from './UserProfileCard';
import Playlists from './Playlists';
import GriddleLibrary from './GriddleLibrary';
import Loading from './Loading';
import { isNullOrEmpty } from '../utils/object';


// Presentational Component
class PController extends React.Component {
    componentWillMount() {
        this.props.loadUserProfile(this.props.userToken);
        this.props.loadUserPlaylists(this.props.userToken);
        this.props.loadLibraryTracks(this.props.userToken);
    }

    render() {
        // Step 3 - Retrieve the user profile
        if (isNullOrEmpty(this.props.userProfile)) {
            return <VLayout><HLayout><Loading /></HLayout></VLayout>;
        }
        // Step 4 - Retrieve the user's playlists
        if (isNullOrEmpty(this.props.userPlaylists)) {
            return  <VLayout>
                        <HLayout><UserProfileCard /></HLayout>
                        <HLayout><Loading /></HLayout>
                    </VLayout>;
        }
        // Step 5 - Retrieve the user's library
        if (isNullOrEmpty(this.props.library)) {
            return <HLayout>
                <VLayout>
                    <UserProfileCard />
                    <Playlists />
                    </VLayout>
                    <VLayout><Loading /></VLayout>
                </HLayout>;
        }
        return <HLayout>
                <VLayout>
                    <UserProfileCard />
                    <Playlists />
                    </VLayout>
                    <VLayout><GriddleLibrary /></VLayout>
                </HLayout>;
        
    }
}
PController.propTypes = {
    userToken: PropTypes.string.isRequired,
    userProfile: PropTypes.object.isRequired,
    userPlaylists: PropTypes.array.isRequired,
    library: PropTypes.array.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
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