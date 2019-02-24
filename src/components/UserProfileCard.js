import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VLayout, HLayout } from './Layout';

const Card = styled.div`
    border: solid 3px lightgray;
    border-radius: 10px;
    padding: 25px;
    background-color: #323232;
`;
const Avatar = styled.div`
    background: url(${props => props.url}) 50% 50% no-repeat;
    background-size: 175%;
    width: 100px;
    height: 100px;
`;
const DisplayName = styled.div`
    color: white;
    font-weight: bold;
    font-size: 150%;
    margin: 10px;
`;
const Email = styled.div`
    color: white;
    margin: 10px;
    text-decoration: underline;
`;

// Presentational Component
const PUserProfileCard = ({userProfile}) => 
    <Card>
        <HLayout>
            <Avatar url={userProfile.images[0].url}></Avatar>
            <VLayout>
                <DisplayName>{userProfile.display_name}</DisplayName>
                <Email>{userProfile.email}</Email>
            </VLayout>
        </HLayout>
    </Card>;
PUserProfileCard.propTypes = {
    userProfile: PropTypes.object.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        userProfile: state.userProfile
    };
}
const UserProfileCard = connect(
    mapStateToProps
  )(PUserProfileCard)

export default UserProfileCard