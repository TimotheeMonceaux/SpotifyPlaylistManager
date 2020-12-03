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

const PLibraryControls = ({libraryDisplay, filteredLibrarySize,
                           libraryDisplayPageFirst, libraryDisplayPagePrevious, 
                           libraryDisplayPageNext, libraryDisplayPageLast}) => <StyledLibraryControls>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPageFirst()} disabled={libraryDisplay.page <= 1}>First</button>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPagePrevious()} disabled={libraryDisplay.page <= 1}>Previous</button>
    <div>Page {libraryDisplay.page} of {Math.max(1, Math.ceil(filteredLibrarySize / libraryDisplay.rows))}</div>
    <div>{libraryDisplay.rows} rows</div>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPageNext(getLastPageNumber(filteredLibrarySize, libraryDisplay.rows))} disabled={libraryDisplay.page >= getLastPageNumber(filteredLibrarySize, libraryDisplay.rows)}>Next</button>
    <button type="button" className="btn btn-success" onClick={() => libraryDisplayPageLast(getLastPageNumber(filteredLibrarySize, libraryDisplay.rows))} disabled={libraryDisplay.page >= getLastPageNumber(filteredLibrarySize, libraryDisplay.rows)}>Last</button>
</StyledLibraryControls>;
PLibraryControls.propTypes = {
    libraryDisplay: PropTypes.object.isRequired,
    filteredLibrarySize: PropTypes.number.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        libraryDisplay: state.libraryDisplay
    };
}
const mapDispatchToProps = dispatch => {
    return {
        libraryDisplayPageFirst: () => {dispatch(ActionCreator.libraryDisplayPageFirst())},
        libraryDisplayPagePrevious: () => {dispatch(ActionCreator.libraryDisplayPagePrevious())},
        libraryDisplayPageNext: (lastPage) => {dispatch(ActionCreator.libraryDisplayPageNext(lastPage))},
        libraryDisplayPageLast: (lastPage) => {dispatch(ActionCreator.libraryDisplayPageLast(lastPage))}
    }
}
const LibraryControls = connect(mapStateToProps, mapDispatchToProps)(PLibraryControls)

export default LibraryControls;