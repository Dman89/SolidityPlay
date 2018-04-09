const assert = require('assert');
//const ganache = require('ganache-cli');
//const Web3 = require('web3');
//const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('./compile');

let KOTH;
let accounts = [0, 1];
let owner;
let approver;
let king;
let kingsBid;
let kingsMessage;
let kingsChest;

const kingsBidAtStart = 1;
const newKingsMessage = 'I am the King, and when I speak I shall be heard.';

beforeEach(async () => {
  // accounts = await web3.eth.getAccounts();
  owner = accounts[0];
  approver = accounts[1];
  // TODO: king = accounts[2];
  // const data = bytecode;
  const from =  owner;
  const gas = '1000000';
  // const value = web3.utils.toWei('1', 'ether');
  KOTH = await new web3.eth.Contract(json.parse(interface))
     .deploy({ data })
     .send({ from, gas });
});

describe('King of the Hill (Contract)', () => {
  describe('Contract / Owner / Approver:', () => {
    it('Contract has been deployed', () => {
      assert.ok(KOTH.options.address);
    });

    it('Verify the contract owner', async () => {
       const _owner = await KOTH.methods.owner().call({ from });
      assert.equal(_owner, owner);
    });

    it('Reassign the contract owner', async () => {
      // const _owner = await KOTH.methods.reassignOwner(approver).call({ from });
      assert.equal(_owner, approver);
    });

    it('Verify the NEW contract owner', async () => {
      // const _owner = await KOTH.methods.owner().call({ from: approver });
      assert.equal(_owner, approver);
    });

    it('Update to original owner with the NEW owner', async () => {
      // const _owner = await KOTH.methods.reassignOwner(owner).call({ from: approver });
      assert.equal(_owner, owner);
    });

    // TODO: Reassign Contract Owner WITHIN A TIMELIMIT

    it('Verify the contract approver', async () => {
      // const _approver = await KOTH.methods.approver().call({ from: approver });
      assert.eqaul(_approver, approver);
    });

    it('Reassign the contract approver', async () => {
      // const _approver = await KOTH.methods.reassignApprover(owner).call({ from: approver });
      assert.eqaul(_approver, owner);
    });

    it('Verify the NEW contract approver', async () => {
      // const _approver = await KOTH.methods.approver().call({ from });
      assert.eqaul(_approver, owner);
    });

    it('Update to original approver with the NEW approver', async () => {
      // const _approver = await KOTH.methods.reassignApprover(approver).call({ from });
      assert.eqaul(_approver, approver);
    });
  });

  describe('King\'s Bid', () => {
    it('Default King\s Bid is set', async () => {
      // kingsBid = await KOTH.methods.kingsBid().call({ from });
      assert.ok(kingsBid);
      assert.equal(kingsBid, kingsBidAtStart);
    });

    it('Default King is set', async () => {
      // const king = await KOTH.methods.king().call({ from });
      assert.equal(king, owner);
    });

    it('Set the King\s Bid', async () => {
      const newBid = 2;
      // kingsBid = await KOTH.methods.setKingsBid().send({ from, value });
      assert.ok(kingsBid);
      assert.equal(kingsBid, newBid);
    });

    it('Check for the new King', async () => {
      // const king = await KOTH.methods.king().call({ from: approver });
      assert.equal(king, approver);
    });

    it('Reset KOTH', async () => {
      // king = await KOTH.methods.resetKOTH().call({ from });
      assert.equal(king, owner);
    });
  });

  describe('King\'s Message', () => {
    it('King can set a message', async () => {
      // const kingsMessage = await KOTH.methods.setKingsMessage(newKingsMessage).call({ from: owner })
      assert.equal(kingsMessage, newKingsMessage);
    });

    it('The King\'s message can be cleared by approver+', async () => {
      const newApproverMessage = "I have taken over as KING!!!1!"
      // const kingsMessage = await KOTH.methods.reassignKingsMessage(newApproverMessage).call({ from: approver });
      assert.equal(kingsMessage, newApproverMessage);
    });

    it('The King\'s starting message can be set by approver+', async () => {
      const newApproverMessage = "I have taken over as KING!!!1!"
      // const kingsStartingMessage = await KOTH.methods.setKingsMessage(newApproverMessage).call({ from: approver });
      assert.equal(kingsStartingMessage, newApproverMessage);
    });
  });
  //
  // Update Starting Bid
  // Update Increasing Bid
  //
  // Return the address, user, kingsMessage, date, amount from contract
  // Return the current kingsBid
  //
  // Allow the contract owner to collect the king's chest
  // Allow the King's chest to be sent to a different account within a time period
  // Allow the King's chest to be automaticly sent to the contract owner
  //

});
