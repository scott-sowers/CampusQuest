angular.module('apiMock', [])

	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
	})

	.factory('mockSwitch', function() {
		return {
			mockApi: function() {
				return location.search.toLowerCase().indexOf('apimock=true') > -1;
			}
		};
	})

	.provider('httpInterceptor', function() {
        var config = {
            mockDataPath: '/mock_data',
            apiPath: '/api',
            apiMocked: false
        };

        this.config = function (options) {
          angular.extend(config, options);
        };

        function HttpInterceptor($q, mockSwitch) {
            //var doMock = mockSwitch.mockApi();

            //this.apiMocked = mockSwitch.mockApi;
            this.request = function (req) {
                if (config.apiMocked && req) {
                    if (req.url.indexOf(config.apiPath) === 0) {
                        var path = req.url.substring(config.apiPath.length);                        
                        req.url = config.mockDataPath + path + '.' + req.method.toLowerCase() + '.json';
                        req.method = 'GET';
                    }
                }

                return req || $q.when(req);
            };
        }

        this.$get = function ($q, mockSwitch) {
            return new HttpInterceptor($q, mockSwitch);
        };
    });
