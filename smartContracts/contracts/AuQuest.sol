pragma solidity ^0.4.0;
contract AuQuest{
    
    mapping (address => Unit) Units;
    
    struct Unit{
        uint karat;
        bytes32 unitName;
        bytes32 description;
        address issuer;
        uint issuedOn;
    }

    
    //just check for address of issuer and certiname for now
    function Verify(
    	address _unitAddress, 
    	uint _karat,
    	bytes32 _unitName,
    	bytes32 _description,
    	address _issuer
    ) public constant returns (bool success){
        var u = Units[_unitAddress];
        if (
            	(u.issuer==_issuer) && 
            	(u.karat == _karat) &&
            	(sha3(u.unitName) == sha3(_unitName)) &&
            	(sha3(u.description) == sha3(_description))
            ){
                return true;
            }
        return false;
    }
    
    function Mark(
        address _unitAddress, 
        uint _karat,
    	bytes32 _unitName, 
    	bytes32 _description
    ) public returns (bool){ 
        Unit storage u = Units[_unitAddress];

        u.karat = _karat;
        u.unitName = _unitName;
        u.description = _description;
        u.issuer = msg.sender;
        return true;
    }
    
}

    

   