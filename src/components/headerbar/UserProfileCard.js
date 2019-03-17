import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VLayout, HLayout } from '../Layout';
import { isNullOrEmpty } from '../../utils/object';

const Card = styled.div`
    border-left: solid 3px lightgray;
    border-right: solid 3px lightgray;
    padding: 5px;
    background-color: #4B4B4B;
    height: 100%;
`;
const Avatar = styled.div`
    background: url(${props => props.url}) 50% 50% no-repeat;
    background-size: 175%;
    width: 50px;
    height: 50px;
    margin: 5px;
`;
const DisplayName = styled.div`
    color: white;
    font-weight: bold;
    font-size: 100%;
    margin-bottom: 10px;
    margin-top: 5px;
`;
const Email = styled.div`
    color: white;
    font-size: 80%;
    text-decoration: underline;
`;

// Presentational Component
const PUserProfileCard = ({userProfile}) => 
    <Card>
        <HLayout>
            <Avatar url={isNullOrEmpty(userProfile.images) ? "http://groovesharks.org/assets/images/default_avatar.jpg" : userProfile.images[0].url}></Avatar>
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