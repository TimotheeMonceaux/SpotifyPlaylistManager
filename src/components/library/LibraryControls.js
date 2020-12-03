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
    vertical-align: center;
`;
const SButton = styled.button`
    min-width: 100px;
`;

const PLibraryControls = ({libraryDisplay, filteredLibrarySize,
                           libraryDisplayPageFirst, libraryDisplayPagePrevious, 
                           libraryDisplayPageNext, libraryDisplayPageLast,
                           libraryDisplayPageChoose, libraryDisplayRowsChoose}) => <StyledLibraryControls>
    <div>                         
        <SButton type="button" className="btn btn-success mx-sm-2" onClick={() => libraryDisplayPageFirst()} disabled={libraryDisplay.page <= 1}>First</SButton>
        <SButton type="button" className="btn btn-success mx-sm-2" onClick={() => libraryDisplayPagePrevious()} disabled={libraryDisplay.page <= 1}>Previous</SButton>
    </div>
    <div className="form-inline">Page <input style={{width: "75px"}} type="number" className="form-control mx-sm-2" value={libraryDisplay.page} onChange={(event) => libraryDisplayPageChoose(parseInt(event.target.value), filteredLibrarySize)}/> of {Math.max(1, Math.ceil(filteredLibrarySize / libraryDisplay.rows))}</div>
    <div className="form-inline">
        <select className="form-control" value={libraryDisplay.rows} onChange={(event) => libraryDisplayRowsChoose(parseInt(event.target.value))}>
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="25">25 rows</option>
            <option value="50">50 rows</option>
            <option value="100">100 rows</option>
        </select>
    </div>
    <div>
        <SButton type="button" className="btn btn-success mx-sm-2" onClick={() => libraryDisplayPageNext(getLastPageNumber(filteredLibrarySize, libraryDisplay.rows))} disabled={libraryDisplay.page >= getLastPageNumber(filteredLibrarySize, libraryDisplay.rows)}>Next</SButton>
        <SButton type="button" className="btn btn-success mx-sm-2" onClick={() => libraryDisplayPageLast(getLastPageNumber(filteredLibrarySize, libraryDisplay.rows))} disabled={libraryDisplay.page >= getLastPageNumber(filteredLibrarySize, libraryDisplay.rows)}>Last</SButton>
    </div>
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
        libraryDisplayPageLast: (lastPage) => {dispatch(ActionCreator.libraryDisplayPageLast(lastPage))},
        libraryDisplayPageChoose: (choice, lastPage) => {dispatch(ActionCreator.libraryDisplayPageChoose(choice, lastPage))},
        libraryDisplayRowsChoose: (choice) => {dispatch(ActionCreator.libraryDisplayRowsChoose(choice))}
    }
}
const LibraryControls = connect(mapStateToProps, mapDispatchToProps)(PLibraryControls)

export default LibraryControls;