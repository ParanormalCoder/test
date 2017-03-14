"use strict";
class CommunicationService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  /*
   ACTIONS
   */

  post(address, data = {}) {
    var defer = this.$q.defer();

    this.$http({
      url: address,
      method: "POST",
      data: data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(function (response) {
      console.log(address);
      console.log(response);
      let data = response.data;

      if (response.statusText == 'OK') {
        defer.resolve(data);
      } else {
        defer.reject(new Error('communication error - POST'));
      }
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  }

  get(address, data = {}) {
    var defer = this.$q.defer();

    this.$http({
      url: address,
      method: "GET",
      data: data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(function (response) {
      console.log(address);
      console.log(response);
      let data = response.data;

      if (response.statusText == 'OK') {
        defer.resolve(data);
      } else {
        defer.reject(new Error('communication error - GET'));
      }
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  }
}

CommunicationService.$inject = ['$http', '$q'];

export default CommunicationService;

