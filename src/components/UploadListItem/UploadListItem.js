import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


class UploadListItem extends React.Component {

	constructor(props) {
		super(props);
		this.onClickClose = this.onClickClose.bind(this);
		this.onClickDownload = this.onClickDownload.bind(this);
	}
	onClickClose() {
		var index = parseInt(this.props.index);
		this.props.removeItem(index);
	}
	onClickDownload() {
		var index = parseInt(this.props.index);
		fetch('http://localhost:8080/api/v1/upload/' + this.props.item.id)
      		.then(response => response.blob())
        	.then(blob => {
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = this.props.item.name;
				document.body.appendChild(a);
				a.click();    
				a.remove();  
			});
	}
	
	render () {
		var todoClass = this.props.item.done ? 
		"done" : "undone";
		return(
			<ListItem key={this.props.item.index} role={undefined} dense button onClick={this.onClickDownload}>
				<ListItemIcon>
					<CloudDownloadIcon />
				</ListItemIcon>
				<ListItemText id={this.props.item.index} primary={ '[' + this.props.item.extension.toUpperCase() + '] ' + this.props.item.name} />
				<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={this.onClickClose}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			);
		}
	}
	
	export default UploadListItem;