import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


// TO REMOVE - BASIC EXAMPLE OF A REDUX COMPONENT'S STRUCTURE

// Presentational Component
const PCustomButton = ({ onPCustomButtonClick, text }) => (
    <button onClick={onPCustomButtonClick}>{text}</button>
)
PCustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        text: state.text
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onPCustomButtonClick: () => {dispatch({type:"Hello, World!"})}
    }
}
const CustomButton = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PCustomButton)


export default CustomButton