pragma solidity 0.4.21;


contract KOTH {
    address public owner;
    address public approver;
    address public king;
    uint public startingBid = 1;
    uint public increasingBid = 1;
    uint public kingsBid = startingBid;
    string public startingMessage = "Welcome to King of the Hill (KOTH). Will you be become and remain the King?";
    string public kingsMessage = startingMessage;
    uint public kingsChest = 0;

    /* Modifiers */
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier isApprover() {
        require(msg.sender == approver || msg.sender == owner);
        _;
    }

    modifier isKing() {
        require(msg.sender == king || msg.sender == approver || msg.sender == owner);
        _;
    }

    modifier bidIsHigh() {
        require(kingsBid >= msg.value + increasingBid);
        _;
    }

    /* Functions */
    function KOTH() public {
        owner = msg.sender;
        approver = owner;
        king = owner;
    }

    /* Reassignment */
    function reassignOwner(address newOwner) public isOwner {
        owner = newOwner;
    }

    function reassignApprover(address newApprover) public isApprover {
        approver = newApprover;
    }

    /* King's bid */
    function setKingsBid() public bidIsHigh payable {
        kingsBid += msg.value;
        kingsChest += msg.value;
        king = msg.sender;
    }

    function resetKOTH() public isKing {
        kingsBid = startingBid;
        king = owner;
        kingsChest = 0;
        kingsMessage = startingMessage;
    }

    /* King's message */
    function setKingsMessage(string newMessage) public isKing {
        kingsMessage = newMessage;
    }

    function reassignStartingKingsMessage(string newMessage) public isApprover {
        startingMessage = newMessage;
    }
}
