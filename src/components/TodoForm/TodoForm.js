import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

class TodoForm extends React.Component {
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
	render () {
		return (
			<Grid item xs={12} md={6}>
				<form ref="form" onSubmit={this.onSubmit} className="form-inline">
					<TextField
						id="outlined-name"
						label="Walk the dog"
						margin="normal"
						variant="filled"
						fullWidth={true}
						value={this.state.inputValue}
						onChange={e => this.setState({ inputValue: e.target.value })}
						helperText="Enter a new task here"
					/>
					<Fab color="primary" aria-label="add" type="submit">
						<AddIcon />
					</Fab>
				</form>
			</Grid>
			// <form ref="form" onSubmit={this.onSubmit} className="form-inline">
			// <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
			// <button type="submit" className="btn btn-default">Add</button> 
			// </form>
			);   
	}
}

export default TodoForm;