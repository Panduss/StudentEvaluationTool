import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newStudent} from '../../actions/student'
import AddStudentForm from './addStudentForm'
import { Button } from '@material-ui/core';
import Modal from 'react-modal';

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)',
	  display				: 'grid',
	  textAlign				: 'center',
	  justifyContent		: 'center',
	  padding				: '3rem',
	  margin				: '4rem',
	  alignItems			: 'center'
	}
  };

class NewStudentPage extends PureComponent {
	constructor() {
		super();

	this.state = {
		modalIsOpen: false
	};
	  
	this.openModal = this.openModal.bind(this);
	this.closeModal = this.closeModal.bind(this);
	}
	  
	openModal() {
		this.setState({modalIsOpen: true});
	}
	  
	closeModal() {
		this.setState({modalIsOpen: false});
	}
    
    handleSubmit = (data) => {
		this.props.postNewStudent(data.firstName, data.lastName, data.profilePic, data.lastEvaluation, data.batchId)
		this.setState({modalIsOpen: false});
	}

	render() {

		return (
			<div>
				<Button variant="contained" color="secondary" onClick={this.openModal}>Add Student</Button>
				<Modal
					isOpen={this.state.modalIsOpen}
					ariaHideApp={false}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
       			>
				<AddStudentForm onSubmit={this.handleSubmit}/>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
        batchId : ((window.location.href).split('/')[4]),
        batches: state.batches
	}
}

export default connect(mapStateToProps, {postNewStudent: newStudent})(NewStudentPage)