import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class TodoListItem extends React.Component {

	constructor(props) {
		super(props);
		this.onClickClose = this.onClickClose.bind(this);
		this.onClickDone = this.onClickDone.bind(this);
	}

	onClickClose() {
		var index = parseInt(this.props.index);
		this.props.removeItem(index);
	}
	
	onClickDone() {
		var index = parseInt(this.props.index);
		this.props.markTodoDone(index);
	}
	
	render () {
		var todoClass = this.props.item.done ? 
		"done" : "undone";
		return(
			<ListItem key={this.props.item.index} role={undefined} dense button onClick={this.onClickDone}>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={this.props.item.done}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': this.props.item.description }}
					/>
				</ListItemIcon>
				<ListItemText id={this.props.item.index} primary={this.props.item.description} />
				<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={this.onClickClose}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			);
		}
	}
	
	export default TodoListItem;