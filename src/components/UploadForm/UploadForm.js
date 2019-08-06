import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Fab from '@material-ui/core/Fab';

class UploadForm extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			inputValue: ''
		}
	}

	componentDidMount() {
		
	}

	onSubmit(event) {
		event.preventDefault();
		let value = this.state.inputValue;
		if(value) {
			this.props.addItem({ 'description' : value });
			this.setState({
				inputValue : ''
			});
		}
	}

	onFileInputChanged(event) {
		this.props.addItem(event.target.files[0]);
	}

	render () {
		return (
			<Grid item xs={12} md={6}>
				<form ref="form" onSubmit={this.onSubmit} className="form-inline">
					<input
						// className={classes.input}
						style={{ display: 'none' }}
						id="raised-button-file"
						type="file"
						onChange={e => this.onFileInputChanged(e)}
					/>
					<label htmlFor="raised-button-file">
						<Button variant="contained" component="span" size="large" color="primary">
							<CloudUpload style={{marginRight : 10 + 'px'}} />
							Upload a new file
						</Button>
					</label> 
				</form>
			</Grid>
			);   
	}
}

export default UploadForm;