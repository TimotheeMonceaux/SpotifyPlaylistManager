import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HLayout } from '../Layout';

// Styled
const StyledLibraryControls = styled(HLayout)`
    color: black;
    margin-top: 20px;
    margin-bottom: 25px;
`;

const PLibraryControls = () => <StyledLibraryControls>
    <button type="button" className="btn btn-success">First</button>
    <button type="button" className="btn btn-success">Previous</button>
    <div>Page 1 of X</div>
    <div>25 rows</div>
    <button type="button" className="btn btn-success">Next</button>
    <button type="button" className="btn btn-success">Last</button>
</StyledLibraryControls>;

const LibraryControls = connect(() => {return {}})(PLibraryControls)

export default LibraryControls;