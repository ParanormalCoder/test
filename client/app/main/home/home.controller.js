"use strict";

import angular from 'angular';

const BASE_URL = 'https://colossusdevtest.herokuapp.com/api/';
const STAKE_VALUES = [2.0, 1.0, 0.5, 0.2];

class HomeController {
  constructor(CommunicationService, _, $scope) {

    /*
     Services
     */

    this.CommunicationService = CommunicationService;
    this._ = _;
    this.$scope = $scope;

    /*
     Properties
     */

    this.pools = [];
    this.currentPool = null;
    this.lines = {};

    this.form = {};

    /*
     Initialize
     */

    this.resetForm();
    this.getPools();
  }

  /*
   Setters
   */

  setStake(stake) {
    this.form.stake = stake;
  }

  resetForm() {
    let defaults = this.getDefaults();
    this.form = {
      stake: defaults.stake,
      selections: defaults.selections,
      totalCost: defaults.totalCost,
      lines: defaults.lines,
      hasSelected: false
    };
  }

  updateForm() {
    let lines = 0;
    this.form.hasSelected = false;
    this._.each(this.form.selections, (selection)=> {
      let selectedResultCount = 0;
      this._.each(selection, (selectedResult)=> {
        if (selectedResult) {
          selectedResultCount++;
          this.form.hasSelected = true;
        }
      });
      if (selectedResultCount > 0 && lines == 0) {
        lines = 1;
      }
      lines *= selectedResultCount > 0 ? selectedResultCount : 1;
    });
    this.form.lines = lines;
    this.form.totalCost = lines * this.form.stake;

  }

  /*
   Getters
   */

  getStakeValues() {
    return STAKE_VALUES;
  }

  getDefaults() {
    return {
      stake: this.getStakeValues()[0],
      totalCost: 0,
      lines: 0,
      selections: []
    };
  }

  /*
   Actions
   */

  getPools() {
    return this.CommunicationService.get(`${BASE_URL}pools.json`, {}).then((response)=> {
      this.pools = this._.sortBy(response, ['display_group_order']);
    }).catch((err)=> {
      console.log(err);
    })
  }

  getPool(id) {
    return this.CommunicationService.get(`${BASE_URL}pools/${id}.json`).then((response)=> {
      this.currentPool = response;

      this.currentPool.legs = this._.sortBy(this.currentPool.legs, ['display_order']);

      this.resetForm();

      this._.each(this.currentPool.legs, (value, index)=> {
        this.form.selections[index] = [];
      });

    }).catch((err)=> {
      console.log(err);
    })
  }

  bet(selectionId) {
    let data = {
      selections: [],
      totalCost: this.form.totalCost,
      lines: this.form.lines
    };

    this._.each(this.form.selections, (selection)=> {
      let selectedResultCount = 0;
      Object.keys(selection).forEach((id)=> {
          if (selection[id]) {
            data.selections.push(id);
          }
      });
    });

    return this.CommunicationService.post(`${BASE_URL}pools/tickets.json`, data).then((response)=> {
    }).then((response)=> {
      console.log('OK!!!!');
    }).catch((err)=> {
      console.log(err);
    })
  }
}

HomeController.$inject = ['CommunicationService', '_', '$scope'];

export default HomeController;
