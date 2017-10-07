import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SvgIcon from 'material-ui/SvgIcon';

var recipient =  require('./img/Recipient.png')
var employer =  require('./img/Employer.png')
var insti =  require('./img/Insti.png')


class HomeComponent extends Component{
	render(){
		return(
			<div id="wrapper" className="padding-top-7">
				<div>
					<a href="/verify">
						<img src={employer} className="homeIcons padding20"/>
						<div>Verify</div>
					</a>
				</div>
				<div>
					<a href="/issue">
						<img src={insti} className="homeIcons padding20"/>
						<div>Mark Gold</div>
					</a>
				</div>
			</div>
		)
	}
};

export default HomeComponent;
