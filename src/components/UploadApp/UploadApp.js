import React from 'react';
import UploadList from '../UploadList/UploadList';
import UploadForm from '../UploadForm/UploadForm';

const UPLOAD_URL = "http://localhost:8080/api/v1/upload/";

class UploadApp extends React.Component {
	
	constructor (props) {
		super(props);
		this.removeItem = this.removeItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.state = {
			uploadItems: []
		};
	}
	
	componentWillMount() {
		fetch(UPLOAD_URL)
		.then(res => res.json())
		.then(data => {
			let uploads = [];
			for(let upload of data) {
				upload.index = data.indexOf[upload];
				uploads.push(upload);
			}
			console.log(uploads);
			this.setState({
				uploadItems : uploads
			})
		});
	}

	addItem(file) {
		var formData  = new FormData();
      	formData.append('upload', file);

		fetch(UPLOAD_URL, {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(upload => {
			let uploadItems = this.state.uploadItems.slice(0);
			uploadItems.unshift({
			...upload,
			index: uploadItems.length + 1
			});
			this.setState({
				uploadItems: uploadItems
			});
		});
	}
	
	removeItem(uploadIndex) {
		console.log(this);
		let uploads = this.state.uploadItems.slice(0);
		let upload = uploads.splice(uploadIndex, 1)[0];
		fetch(UPLOAD_URL + upload.id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		});
		this.setState({
			uploadItems: uploads
		});
	}

	render() {
		return (
			<>
			<UploadList items={this.state.uploadItems} removeItem={this.removeItem} />
			<UploadForm addItem={this.addItem} />
			</>
		);
	}
	
}

export default UploadApp;