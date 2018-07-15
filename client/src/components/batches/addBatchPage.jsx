import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newBatch} from '../../actions/batches'
import AddBatchForm from './addBatchForm'
import Modal from 'react-modal';
import { Button } from '@material-ui/core';

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	}
  };

class NewBatchPage extends PureComponent {
	constructor() {
		super();

	this.state = {
		modalIsOpen: false
	};
	  
	this.openModal = this.openModal.bind(this);
	this.afterOpenModal = this.afterOpenModal.bind(this);
	this.closeModal = this.closeModal.bind(this);
	}
	  
	openModal() {
		this.setState({modalIsOpen: true});
	}
	  
	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}
	  
	closeModal() {
		this.setState({modalIsOpen: false});
	}
	
	handleSubmit = (data) => {
		const {resetForm} = this.props
		this.props.postNewBatch(data.batchNumber, data.startDate, data.endDate)
	}

	render() {
		return (
			<div>
				<Button onClick={this.openModal}>Add Batch</Button>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
       			>
				
				<h2 ref={subtitle => this.subtitle = subtitle}>Add one or more batches!</h2>
				<AddBatchForm onSubmit={this.handleSubmit}/>
				<Button onClick={this.closeModal}>Close</Button>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		newBatch: state.newBatch
	}
}

export default connect(mapStateToProps, {postNewBatch: newBatch})(NewBatchPage)