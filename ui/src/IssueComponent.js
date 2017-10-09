import React, { Component } from 'react';
import Web3 from "web3"
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from 'material-ui/Card';

var _ = require('lodash');

var BlockContractABI = [{"constant":true,"inputs":[{"name":"_unitAddress","type":"address"},{"name":"_karat","type":"uint256"},{"name":"_unitName","type":"bytes32"},{"name":"_description","type":"bytes32"},{"name":"_issuer","type":"address"}],"name":"Verify","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_unitAddress","type":"address"},{"name":"_karat","type":"uint256"},{"name":"_unitName","type":"bytes32"},{"name":"_description","type":"bytes32"}],"name":"Mark","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

var BlockContractAddress = '0x9c814918a6ac1d1cbfc84687d438d2ad47527ee7';
var contract
var web3

class VerifyComponent extends Component {

	constructor() {
		super();

		// Include name of user here too
		this.state = {
			issuer_address: '',
			unit_address: '',
			subject: '',
			karat: '',
			description:'',
			thisAddress:'',
			valid:{
				'issuer_address':true, 
				'unit_address':true, 
				'subject':true, 
				'karat': true,
				'description': true
			}
		};
	}

	componentDidMount() {
     	window.addEventListener('load', function() {
	     	let web3 = window.web3
	     	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	        if (typeof web3 !== 'undefined') {
	        	// Use Mist/MetaMask's provider
	            window.web3 = new Web3(web3.currentProvider);
	            console.log("web3 injected")
	        } else {
	            console.log('No web3? You should consider trying MetaMask!')
	            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	            alert("please install MetaMask extension")
	     	}
        	contract = new window.web3.eth.Contract(BlockContractABI,BlockContractAddress);
        	let defaultAccount = window.web3.eth.defaultAccount
         }
         )
     	window.onload =() => {
        	console.log(window.web3.eth.getAccounts().then( result=>
        		this.setState({'thisAddress':result[0]})
        	))
        	
        }
    }

	handleChangeText = (e) => {
		let web3=window.web3
		console.log(window.web3.version)
 		let newState = {};
 		newState.valid = this.state.valid
 		newState[e.target.name] = e.target.value;
 		newState['valid'][e.target.name] = (e.target.value.length!=0)
 		this.setState(newState);
	};
	handleChangeAddress = (e) => {
		let web3 = window.web3
 		let newState = {};
 		console.log(this.state.a)
 		newState.valid = this.state.valid
 		newState[e.target.name] = e.target.value;
 		newState['valid'][e.target.name] = web3.utils.isAddress(e.target.value);
 		this.setState(newState);
 		this.state.valid[e.target.name]=web3.utils.isAddress(e.target.value);
 		console.log(_.every(_.values(this.state.valid), function(v) {return v;}))
	};

    handleSubmit(event) {
		event.preventDefault();
		let web3 = window.web3
		let unit_address_valid = web3.utils.isAddress(this.state.unit_address)
		let subject_valid = this.state.subject.length!=0
		let description_valid = this.state.description.length!=0
		let karat_valid = this.state.karat.length!=0
		if (unit_address_valid&&subject_valid&&description_valid&&karat_valid){
			console.log(contract.methods.Mark(
					this.state.unit_address,
					parseInt(this.state.karat),
					web3.utils.fromAscii(this.state.subject),
					web3.utils.fromAscii(this.state.description)
			).send({
				from: this.state.thisAddress,	
				gas:200000
			}).then(result=>{
				this.setState({
					issuer_address: '',
					unit_address: '',
					subject: '',
					karat: '',
					description:'',
					thisAddress:'',
					valid:{
						'issuer_address':true, 
						'unit_address':true, 
						'subject':true, 
						'karat': true,
						'description': true
					}
				});
				console.log(result);
			}
			))
		}else{
			this.setState({
				valid: {
					unit_address:unit_address_valid ,
					karat:karat_valid,
					subject: subject_valid,
					description: description_valid
				}
			})
		}
		
		
    }


	render() {
		return(
			<div>
				<h1 className="weight-500">Mark Item</h1>
			    <form onSubmit={this.handleSubmit.bind(this)} className="formIssue floatCenter">
			    	<Card className="padding20 margin-10">
				        <TextField 
				        	name="unit_address" 
				 	       	onChange={this.handleChangeAddress.bind(this)}
				        	floatingLabelText="Unit Address" 
				        	className="margin-10"
				        	value={this.state.unit_address}
				        	errorText={this.state.valid['unit_address']?"":"Enter valid address"}
				        />
				        <TextField 
				        	name="karat" 
				 	       	onChange={this.handleChangeText.bind(this)}
				        	floatingLabelText="Karats" 
				        	className="margin-10"
				        	value={this.state.karat}
				        	errorText={this.state.valid['karat']?"":"Enter valid address"}
				        />
				        <TextField 
				        	name="subject" 
				 	       	onChange={this.handleChangeText.bind(this)}
				        	floatingLabelText="Item Name" 
				        	className="margin-10 float-left"
				        	value={this.state.subject}
				        	errorText={this.state.valid['subject']?"":"This field should not be empty"}
				        />
				        <TextField 
				        	name="description" 
				 	       	onChange={this.handleChangeText.bind(this)}
				        	floatingLabelText="Item Description" 
				        	className="width-38"
				        	multiLine={true}
				        	value={this.state.description}
				        	errorText={this.state.valid['description']?"":"This field should not be empty"}
				        />
				    </Card>
			        <RaisedButton 
			        	label="Mark" 
			        	primary={true} 
			        	type='submit' 
			        	className="margin-10"
			        />
			    </form>
		    </div>
		)
	}
};

export default VerifyComponent;
