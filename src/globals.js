import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

export const AdminToken = 'adminToken';
export const OrdinaryToken = 'ordinaryToken';
export const ShareEvent = 'shareEventID';


export const Theme = createMuiTheme({
	palette: {
		primary: {
			light: '#66ffa6',
			main: '#00e676',
			dark: '#00b248',
		},
		secondary: { light: '#ffff6b', main: '#fdd835', dark: '#c6a700' },
		custom: {
			white: '#ffffff',
			bluishGreen: '#008488',
			GreyLight: '#969696',
			GreyVeryLight: '#898989',
			Gold: '#C4B211',
			noShadow: '0px 0px 0px 0px rgba(0,0,0,0.0)',
		},
	},

	typography: {
		h6: {
			fontFamily: 'Fredoka One',
		},
	},
	overrides: {
		MuiFab: {
			label: { textTransform: 'none' },
		},
		MuiButton: {
			label: { textTransform: 'none' },
		},
	},
});

export const Categories = [
	'Software Engineering',
	'Chemical Engineering',
	'Information Technology',
	'Mechanical Engineering',
];
