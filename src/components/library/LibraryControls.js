import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HLayout } from '../Layout';
import { ActionCreator } from '../../redux/actions';
import { getLastPageNumber } from './libraryUtils';

// Styled
const StyledLibraryControls = styled(HLayout)`
    color: black;
    margin-top: 20px;
    margin-bottom: 25px;
`;

const PLibraryControls = ({libraryDisplay, librarySize,
                           libraryDisplayPageFirst, libraryDisplayPagePrevious, 
                           libraryDisplayPageNext, libraryDisplayPageLast}) => <StyledLibraryControls>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPageFirst()} disabled={libraryDisplay.page <= 1}>First</button>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPagePrevious()} disabled={libraryDisplay.page <= 1}>Previous</button>
    <div>Page {libraryDisplay.page} of {Math.ceil(librarySize / libraryDisplay.rows)}</div>
    <div>{libraryDisplay.rows} rows</div>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPageNext()} disabled={libraryDisplay.page >= getLastPageNumber(librarySize, libraryDisplay.rows)}>Next</button>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPageLast()} disabled={libraryDisplay.page >= getLastPageNumber(librarySize, libraryDisplay.rows)}>Last</button>
</StyledLibraryControls>;
PLibraryControls.propTypes = {
    libraryDisplay: PropTypes.object.isRequired,
    librarySize: PropTypes.number.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        libraryDisplay: state.libraryDisplay,
        librarySize: Object.keys(state.library).length
    };
}
const mapDispatchToProps = dispatch => {
    return {
        libraryDisplayPageFirst: () => {dispatch(ActionCreator.libraryDisplayPageFirst())},
        libraryDisplayPagePrevious: () => {dispatch(ActionCreator.libraryDisplayPagePrevious())},
        libraryDisplayPageNext: () => {dispatch(ActionCreator.libraryDisplayPageNext())},
        libraryDisplayPageLast: () => {dispatch(ActionCreator.libraryDisplayPageLast())}
    }
}
const LibraryControls = connect(mapStateToProps, mapDispatchToProps)(PLibraryControls)

export default LibraryControls;