import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Main from './App/mainPage/main.js';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Theme } from './globals.js';
import { DataModel } from './App/presenters/mainPagePresenter';

DataModel.init();
ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={Theme}>
			<CssBaseline />
			<Main />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
