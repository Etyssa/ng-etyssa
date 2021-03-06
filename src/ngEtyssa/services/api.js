(function (angular, CryptoJS) {
    'use strict';

    function EtyssaApiProvider() {
        this.$get = ['$resource', '$http', function ApiFactory($resource, $http) {
            $http.defaults.headers.common.email = this.EMAIL;
            $http.defaults.headers.common.password = CryptoJS.SHA1(this.PASSWORD);
            return {
                categories: $resource(this.API_HOST + '/rest/categories?token=:token', {token: this.TOKEN}),
                search: $resource(this.API_HOST + '/rest/search?cat=:cat&token=:token', {token: this.TOKEN}),
                entries: $resource(this.API_HOST + '/rest/entries/:entry_id?token=:token', {token: this.TOKEN}),
                users: $resource(this.API_HOST + '/rest/users/:user_id?token=:token', {token: this.TOKEN}),
                profile: $resource(this.API_HOST + '/rest/me/?token=:token', {token: this.TOKEN}),
                message: $resource(this.API_HOST + '/rest/messages/:mailbox?token=:token', {token: this.TOKEN, mailbox: ''}),
                services: $resource(this.API_HOST + '/rest/services/:service_name/?token=:token', {token: this.TOKEN}, {
                    query: {
                        method: 'GET',
                        isArray: true,
                        transformResponse: function (data) {
                            return angular.fromJson(data).services;
                        }
                    }
                })
            };
        }];
    }

    angular.module('ngEtyssa.services', [])
        .provider('etyssaApi', EtyssaApiProvider);

})(window.angular, window.CryptoJS);
