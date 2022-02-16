/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
        
const MillionrMembers = artifacts.require("Millionr");

contract("MillionrMembers", () => {

     before('', ()=> {
        this.contract = MillionrMembers.new()
    })
   
    it(`Contract exists`, function () {
        assert.exists(this.contract, `Contract not instanciated`);
      });
})