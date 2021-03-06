import { h } from 'preact';
import { Auth0Provider } from "@auth0/auth0-react";

import Home from './home';

let redirectUri;
if (typeof window !== 'undefined') {
	redirectUri =  window.location.origin;
}

const App = () => {
	console.log(process.env.PREACT_APP_AUTH0_NAME)
	return (
		<Auth0Provider
		domain={`${process.env.PREACT_APP_AUTH0_NAME}.us.auth0.com`}
		clientId={process.env.PREACT_APP_AUTH0_CLIENT_ID}
		redirectUri={redirectUri}
		audience={`https://${process.env.PREACT_APP_AUTH0_NAME}.us.auth0.com/api/v2/`}
		scope="read:current_user update:current_user_metadata"
	>
		<div id="app">
			<Home path="/" />
		</div>
		</Auth0Provider>
	);
}

export default App;
