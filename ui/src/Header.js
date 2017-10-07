import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import FontIcon from 'material-ui/FontIcon';


var logo =  require('./img/logo.png')
const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

class Header extends Component{
	render(){
		return(
			<div className="">
				<RaisedButton label="Home" primary={true} className="float-left margin10" />
				<RaisedButton label="About Us" className="float-right margin10" />
				<div style={{clear:'both'}}></div>
			</div>
		)
	}
}

export default Header;