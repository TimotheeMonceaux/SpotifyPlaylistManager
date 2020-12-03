import React from 'react';
import { connect } from 'react-redux';
import { HLayout } from '../Layout'; 
import { ActionCreator } from '../../redux/actions.js';
import { getLibrarySize, getFilteredLibrarySize } from '../../redux/selectors';

class PToolbar extends React.Component {
    constructor() {
        super();
        this.textInput = React.createRef(); 
    }
  
    handleChange() {
        this.props.changeLibraryFilter(this.textInput.current.value);
    }
  
    render() {
      const filtered = this.props.librarySize - this.props.filteredLibrarySize;
      return (
        <HLayout className="toolbar form-inline">
          <div>{this.props.filteredLibrarySize} tracks showed {filtered > 0 && <i>({filtered} filtered)</i>}</div>
          <div className="float-right form-group">
            <label>Filter Results</label>
            <input className="form-control ml-4" placeholder="Filter Results" ref={this.textInput} type="text" onChange={() => this.handleChange()} />
          </div>
        </HLayout>
      );
    }
  }

// Container Component
const mapStateToProps = (state) => {
    return {
        librarySize: getLibrarySize(state),
        filteredLibrarySize: getFilteredLibrarySize(state)
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeLibraryFilter: (text) => {dispatch(ActionCreator.changeLibraryFilter(text))},
    }
}
const Toolbar = connect(
      mapStateToProps,
      mapDispatchToProps
  )(PToolbar)

export default Toolbar