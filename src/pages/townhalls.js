import React, { Component } from 'react';
import base from '../configs/firebase';
import AppBar from 'material-ui/AppBar';
import Townhall from '../components/townhall';
import './townhalls.css';

class Townhalls extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		townhalls: [],
    	};
  	}

	componentDidMount() {
	  base.bindToState(`townhalls`, {
	    context: this,
	    state: 'townhalls',
	    asArray:true,
	    queries: {
        	orderByChild: 'start'
      	}
	  });
	}

	getTownhalls() {
		var currentTime = new Date().getTime();
		return this.state.townhalls.filter((townhall) => {
			return currentTime < townhall.end;
		});
	}

  	render() {
  		var townhalls = this.getTownhalls();
	    return (
	    	<div className="townhalls-page">
	    		<AppBar className="appBar" title="Town Hall Live Questions" style={{background:'#333739'}} />
		      	<div className="townhalls">
		      		<div className="townhall">You can only access questions when a town hall is ongoing. Once a session is about to start you will be automatically redirected.</div>
		        	{townhalls.map((item, index) => {
	                	return <Townhall 
	                    	name={item.name}
	                    	date={item.date}
	                    	index={index}
	                    	key={item.key} />
	            	})}
		      	</div>
		    </div>
	    );
  	}
}

export default Townhalls;