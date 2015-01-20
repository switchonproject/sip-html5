angular.module(
        'de.cismet.switchon.sipApp.services'
        ).factory('MockService',
        [
            function () {
                'use strict';

                return {
                    search: function () {
                        return {
                            "$self": "http://kif:8890/searches/BELIS2.de.cismet.belis2.server.search.BelisObjectsWktSearch/results",
                            "$offset": 0,
                            "$limit": 100,
                            "$first": "http://kif:8890/searches/BELIS2.de.cismet.belis2.server.search.BelisObjectsWktSearch/results",
                            "$previous": null,
                            "$next": "not available",
                            "$last": "not available",
                            "$total":5,
                            "$current":5,
                            "$collection": [
                                {
                                    "id": -1,
                                    "domain": "SWITCHON",
                                    "leaf": true,
                                    "name": "Station Wittlich",
                                    "description": "Water quality data Mosel river from station Wittlich",
                                    "dynamic": false,
                                    "dynamicChildrenStatement": null,
                                    "sqlSort": false,
                                    "classId": 27,
                                    "iconFactory": -1,
                                    "derivePermissionsFromClass": true,
                                    "iconString": null,
                                    "artificialId": null,
                                    "permissions": {
                                        "policy": {
                                            "dbID": -1,
                                            "name": null
                                        }
                                    },
                                    "objectId": 28428,
                                    "object": null,
                                    "valid": true,
                                    "group": "BELIS2"
                                },
                                {
                                    "id": -1,
                                    "domain": "BELIS2",
                                    "leaf": true,
                                    "name": "Station Trier",
                                    "description": "Water quality data Mosel river from station Trier",
                                    "dynamic": false,
                                    "dynamicChildrenStatement": null,
                                    "sqlSort": false,
                                    "classId": 27,
                                    "iconFactory": -1,
                                    "derivePermissionsFromClass": true,
                                    "iconString": null,
                                    "artificialId": null,
                                    "permissions": {
                                        "policy": {
                                            "dbID": -1,
                                            "name": null
                                        }
                                    },
                                    "objectId": 47,
                                    "object": null,
                                    "valid": true,
                                    "group": "BELIS2"
                                },
                                {
                                    "id": -1,
                                    "domain": "BELIS2",
                                    "leaf": true,
                                    "name": "Station Bernkastel-Kues",
                                    "description": "Water quality data Mosel river from station Bernkastel-Kues",
                                    "dynamic": false,
                                    "dynamicChildrenStatement": null,
                                    "sqlSort": false,
                                    "classId": 27,
                                    "iconFactory": -1,
                                    "derivePermissionsFromClass": true,
                                    "iconString": null,
                                    "artificialId": null,
                                    "permissions": {
                                        "policy": {
                                            "dbID": -1,
                                            "name": null
                                        }
                                    },
                                    "objectId": 32431,
                                    "object": null,
                                    "valid": true,
                                    "group": "BELIS2"
                                },
                                {
                                    "id": -1,
                                    "domain": "BELIS2",
                                    "leaf": true,
                                    "name": "Mosel water quality averages",
                                    "description": "Daily average water quality data from Mosel river stations in Germany",
                                    "dynamic": false,
                                    "dynamicChildrenStatement": null,
                                    "sqlSort": false,
                                    "classId": 27,
                                    "iconFactory": -1,
                                    "derivePermissionsFromClass": true,
                                    "iconString": null,
                                    "artificialId": null,
                                    "permissions": {
                                        "policy": {
                                            "dbID": -1,
                                            "name": null
                                        }
                                    },
                                    "objectId": 28426,
                                    "object": null,
                                    "valid": true,
                                    "group": "BELIS2"
                                }]
                        };
                    }
                };
            }
        ]);
