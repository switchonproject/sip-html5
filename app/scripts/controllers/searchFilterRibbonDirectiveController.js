angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';
                $scope.keywords = ['air', 'Area', 'Atmosphere', 'Benthic', 'Benthic species', 
                    'Biological', 'Biological community', 'Biological taxa', 'Biomass', 'Carbon', 
                    'Chemical', 'Density', 'Descriptive', 'discharge', 'Dissolved Gas', 'Dissolved Solids', 
                    'Energy', 'evaporation', 'Fish', 'Fish species', 'flux', 'Ice', 'Indicator Organisms', 
                    'Inorganic', 'lake', 'Length', 'Level', 'Macrophyte species', 'Major', 'Minor', 'Nekton', 
                    'Nekton species', 'Nitrogen', 'Nutrient', 'ocean', 'Optical', 'Organic', 'Other organic chemical', 
                    'Oxygen Demand', 'PCBs', 'Pesticide', 'Phosphorus', 'Physical', 'Phytoplankton species', 'Pigment', 
                    'precipitation', 'Pressure', 'Radiochemical ', 'snow', 'soil', 'Stable Isotopes', 'stream', 
                    'suspended solids', 'Temperature', 'Velocity', 'Volume', 'water', 'Water content', 'wind', 
                    'Zooplankton species'];
            }]
        );