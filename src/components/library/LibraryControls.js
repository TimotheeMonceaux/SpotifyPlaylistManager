import React from 'react';
import { connect } from 'react-redux';
import { HLayout } from '../Layout';

const PLibraryControls = () => <HLayout style={{color: "black"}}>
        <div>Previous</div>
        <div>Page 1 of X</div>
        <div>25 rows</div>
        <div>Next</div>
    </HLayout>;

const LibraryControls = connect(() => {return {}})(PLibraryControls)

export default LibraryControls;