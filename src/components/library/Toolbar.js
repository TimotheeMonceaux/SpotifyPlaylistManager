import React from 'react';
import { connect } from 'react-redux';
import { Form, Row } from 'react-bootstrap'; 


// Presentational Component
const PToolbar = () => <Form className="col">
        <Form.Group as={Row}>
            <Form.Label className="col-sm-2" style={{top: "10px"}}>Filter Results</Form.Label>
            <Form.Control className="col-sm-9" placeholder="Filter Results" />
        </Form.Group>
    </Form>;

// Container Component
const mapStateToProps = () => {
    return {
    };
}
const Toolbar = connect(
    mapStateToProps
  )(PToolbar)

export default Toolbar