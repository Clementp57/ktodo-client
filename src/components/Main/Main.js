import { Switch, Route } from 'react-router-dom';
import React from 'react';
import TodoApp from '../TodoApp/TodoApp';
import UploadApp from '../UploadApp/UploadApp';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={TodoApp}/>
		    <Route exact path='/files' component={UploadApp}/>
        {/* <Route path='/roster' component={Todo}/>
        <Route path='/schedule' component={Schedule}/> */}
      </Switch>
    </main>
  );
}

export default Main;