import React from 'react';
import { connect } from 'react-redux';
import { Form, Row } from 'react-bootstrap'; 
import { ActionCreator } from '../redux/actions.js';

class PToolbar extends React.Component {
    constructor() {
        super();
        this.textInput = React.createRef(); 
    }
  
    handleChange() {
        this.props.changeLibraryFilter(this.textInput.current.value);
    }
  
    render() {
      return (
        <Form className="col">
            <Form.Group as={Row}>
                <Form.Label className="col-sm-2" style={{top: "10px"}}>Filter Results</Form.Label>
                <Form.Control className="col-sm-9" placeholder="Filter Results" ref={this.textInput} type="text" onChange={() => this.handleChange()} />
            </Form.Group>
        </Form>
      );
    }
  }

// Container Component
const mapStateToProps = () => {
    return {
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