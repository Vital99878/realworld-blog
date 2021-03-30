import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header';
import styles from './App.module.scss';
import classnames from 'classnames/bind';
import PostsList from '../posts-list';
import PostPage from '../post-page/';
import SignUp from '../modals-pages/sign-up';
import SignIn from '../modals-pages/sign-in';
import Profile from '../modals-pages/profile/Profile';
import PostForm from '../post-form';

const cn = classnames.bind(styles);

const App = () => (
	<Router>
		<Header />
		<main className={cn('main')}>
			<Route path={["/", "/articles"]} component={PostsList} exact />
			<Route path="/articles/:slug" component={PostPage} exact />
			<Route path="/new-article" component={PostForm}/>
			<Route path="/articles/:slug/edit" component={PostForm} />
			<Route path="/sign-up" component={SignUp} />
			<Route path="/sign-in" component={SignIn} />
			<Route path="/profile" component={Profile} />
		</main>
	</Router>
)

export default App;