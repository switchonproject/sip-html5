angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';
                $scope.keywords = ['Biological', 'Chemical', 'Physical', 'Benthic', 'Biomass', 'Descriptive',
                    'Fish', 'Nekton', 'Pigment', 'Benthic species', 'Fish species', 'Macrophyte species',
                    'Nekton species', 'Phytoplankton species', 'Zooplankton species',
                    'Dissolved Gas', 'Dissolved Solids', 'Major', 'Minor', 'Carbon',
                    'Nitrogen', 'Phosphorus', 'Other organic chemical', 'PCBs', 'Pesticide', 'Area, atmosphere',
                    'Area, ice', 'flux', 'discharge', 'evaporation', 'precipitation', 'wind', 'ice', 'lake', 'ocean',
                    'snow', 'stream', 'Optical, water', 'air', 'water', 'suspended solids', 'soil', 'Biological community',
                    'Biological taxa', 'Indicator Organisms', 'Inorganic', 'Nutrient', 'Organic', 'Oxygen Demand',
                    'Radiochemical ', 'Stable Isotopes', 'Area', 'Density', 'Energy', 'Length', 'Level', 'Optical',
                    'Pressure', 'Temperature', 'Velocity', 'Volume', 'Water content'];
            }]
        );