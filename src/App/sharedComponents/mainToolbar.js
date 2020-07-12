import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import { Theme } from '../../globals.js';

import { ThemeProvider } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

import { Typography, IconButton, Toolbar, Popover, Button } from '@material-ui/core';

import { CommonModel } from '../presenters/commonPresenter';
const useStyles = makeStyles({
	grow: {
		flexGrow: 1,
	},
	linearLayout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		alignItems: 'start',
	},
	horizontalLayout: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' },
	popoverTitle: {
		fontFamily: 'Fredoka One',
		fontSize: 20,
		textAlign: 'left',
		color: Theme.palette.primary.dark,
	},
	popoverTextItems: {
		fontFamily: 'Roboto Medium',
		fontSize: 16,
		textAlign: 'left',
		color: Theme.palette.primary.dark,
	},
	space: { width: '100%', height: 48 },
	popoverHeader: { height: 48, display: 'flex', flexDirection: 'row', alignItems: 'center' },
});

const toolbarTheme = createMuiTheme({
	...Theme,
	palette: {
		secondary: {
			light: Theme.palette.custom.white,
			main: Theme.palette.custom.white,
			dark: Theme.palette.custom.white,
		},
	},
});

const AdminPopover = (props) => {
	const styles = useStyles();
	const popoverContent = (
		<div className={styles.linearLayout}>
			<div className={styles.popoverHeader}>
				<h1 className={styles.popoverTitle}>Admin</h1>
				<div className={styles.grow} />
				<IconButton>
					<CloseIcon color="primary" onClick={props.onClose} />
				</IconButton>
			</div>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/login">
				Login as an individual or an organization
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/deleteaccount">
				Delete an account
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/createorgaccount">
				Create an organization account
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/createindividualaccount">
				Create an individual account
			</Button>
			<Button
				fullWidth
				classes={{ label: styles.popoverTextItems }}
				onClick={() => {
					CommonModel.logoutFromAdmin();
				}}
			>
				Logout
			</Button>
		</div>
	);
	return popoverContent;
};
const IndividualPopover = (props) => {
	const styles = useStyles();
	const popoverContent = (
		<div className={styles.linearLayout}>
			<div className={styles.popoverHeader}>
				<h1 className={styles.popoverTitle}>Roznama</h1>
				<div className={styles.grow} />
				<IconButton>
					<CloseIcon color="primary" onClick={props.onClose} />
				</IconButton>
			</div>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/">
				Home page
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/myeventsI">
				My events
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/myprofileI">
				My profile
			</Button>
			<Button
				fullWidth
				classes={{ label: styles.popoverTextItems }}
				onClick={() => {
					CommonModel.logoutFromAccount();
				}}
			>
				Logout
			</Button>
		</div>
	);
	return popoverContent;
};
const OrganizationPopover = (props) => {
	const styles = useStyles();
	const popoverContent = (
		<div className={styles.linearLayout}>
			<div className={styles.popoverHeader}>
				<h1 className={styles.popoverTitle}>Roznama</h1>
				<div className={styles.grow} />
				<IconButton>
					<CloseIcon color="primary" onClick={props.onClose} />
				</IconButton>
			</div>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/">
				Home page
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/myeventsO">
				My events
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/myprofileO">
				My profile
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/createevent">
				Create an event
			</Button>
			<Button
				fullWidth
				classes={{ label: styles.popoverTextItems }}
				onClick={() => {
					CommonModel.logoutFromAccount();
				}}
			>
				Logout
			</Button>
		</div>
	);

	return popoverContent;
};
const AnnoymousPopover = (props) => {
	const styles = useStyles();
	const popoverContent = (
		<div className={styles.linearLayout}>
			<div className={styles.popoverHeader}>
				<h1 className={styles.popoverTitle}>Roznama</h1>
				<div className={styles.grow} />
				<IconButton>
					<CloseIcon color="primary" onClick={props.onClose} />
				</IconButton>
			</div>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/login">
				Sign In
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/signupI">
				Sign up as an individual
			</Button>
			<h1>Or</h1>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="/signupO">
				Sign up as an organization
			</Button>
		</div>
	);

	return popoverContent;
};
const MenuPopover = (props) => {
	const styles = useStyles();
	const popoverContent = (
		<div className={styles.linearLayout}>
			<div className={styles.popoverHeader}>
				<h1 className={styles.popoverTitle}>Roznama</h1>
				<div className={styles.grow} />
				<IconButton>
					<CloseIcon color="primary" onClick={props.onClose} />
				</IconButton>
			</div>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="">
				What is Roznama ?
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="">
				About Us
			</Button>
			<Button fullWidth classes={{ label: styles.popoverTextItems }} href="">
				Contact us
			</Button>
			<div className={styles.space} />
			<h1>Language</h1>
			<div className={styles.horizontalLayout}>
				<Button fullWidth classes={{ label: styles.popoverTextItems }} href="">
					English
				</Button>
				<Button fullWidth classes={{ label: styles.popoverTextItems }} href="">
					العربية
				</Button>
			</div>
		</div>
	);

	return popoverContent;
};

export const MainToolbar = (props) => {
	const styles = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const [isAdminPopoverOpen, setAdminOpen] = useState(false);
	const [isMenuPopoverOpen, setMenuOpen] = useState(false);
	const [isIndividualPopoverOpen, setIndividualOpen] = useState(false);
	const [isOrganizationPopoverOpen, setOrganizationOpen] = useState(false);
	const [isAnnoymousPopoverOpen, setAnnoymousOpen] = useState(false);

	const Actions = [];

	const onClose = () => {
		setAnchorEl(null);
		setIndividualOpen(false);
		setAdminOpen(false);
		setOrganizationOpen(false);
		setMenuOpen(false);
		setAnnoymousOpen(false);
	};

	//notifications icon should be added here however it is depreciated now :<

	if (CommonModel.isIndividualLoggedIn) {
		Actions.push(
			<IconButton
				onClick={(event) => {
					setIndividualOpen(true);
					setAnchorEl(event.target);
				}}
			>
				<img alt="profile pic" src={CommonModel.profilePic} />
			</IconButton>
		);
	} else if (CommonModel.isOrganizationLoggedIn) {
		Actions.push(
			<IconButton
				onClick={(event) => {
					setOrganizationOpen(true);
					setAnchorEl(event.target);
				}}
			>
				<img alt="profile pic" src={CommonModel.profilePic} />
			</IconButton>
		);
	} else {
		Actions.push(
			<IconButton
				onClick={(event) => {
					setAnnoymousOpen(true);
					setAnchorEl(event.target);
				}}
			>
				<AccountCircleIcon color="secondary" />
			</IconButton>
		);
	}

	if (CommonModel.isAdminLogged) {
		Actions.push(
			<IconButton
				onClick={(event) => {
					setAdminOpen(true);
					setAnchorEl(event.target);
				}}
			>
				<SupervisorAccountIcon color="secondary" />
			</IconButton>
		);
	}
	Actions.push(
		<IconButton
			onclick={(event) => {
				setMenuOpen(true);
				setAnchorEl(event.target);
			}}
		>
			<MenuIcon color="secondary" />
		</IconButton>
	);

	let popoverContent = null;
	if (isAdminPopoverOpen) {
		popoverContent = <AdminPopover onClose={onClose} />;
	} else if (isIndividualPopoverOpen) {
		popoverContent = <IndividualPopover onClose={onClose} />;
	} else if (isOrganizationPopoverOpen) {
		popoverContent = <OrganizationPopover onClose={onClose} />;
	} else if (isMenuPopoverOpen) {
		popoverContent = <MenuPopover onClose={onClose} />;
	} else if (isAnnoymousPopoverOpen) {
		popoverContent = <AnnoymousPopover onClose={onClose} />;
	}

	return (
		<ThemeProvider theme={toolbarTheme}>
			<>
				<Toolbar>
					<Typography color="secondary" variant="h6">
						Roznama
					</Typography>
					<div className={styles.grow} />
					{Actions}
				</Toolbar>
				<Popover
					open={popoverContent !== null}
					anchorEl={anchorEl}
					anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
					onClose={onClose}
				>
					{popoverContent}
				</Popover>
			</>
		</ThemeProvider>
	);
};
