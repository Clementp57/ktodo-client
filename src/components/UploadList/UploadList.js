import UploadListItem from '../UploadListItem/UploadListItem';
import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

class UploadList extends React.Component {
	classes = makeStyles(theme => ({
		root: {
			flexGrow: 1,
			maxWidth: 752,
		},
		demo: {
			backgroundColor: theme.palette.background.paper,
		},
		title: {
			margin: theme.spacing(4, 0, 2),
		},
	}));

	render () {
		var items = this.props.items.map((item, index) => {
			return (
				<UploadListItem key={index} item={item} index={index} removeItem={this.props.removeItem} />
				);
			}
		);
			
		return (
			<Grid item xs={12} md={6}>
				<Typography variant="h6" className={this.classes.title}>
					Files list :
				</Typography>
				<div className={this.classes.demo}>
					<List dense={true}>
						{items}
					</List>
				</div>
			</Grid>
		);
	}
}

export default UploadList;