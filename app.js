var app = angular.module('campMan', ['ngMaterial']);
app.controller('campaignCtrl', function($scope){
	$scope.campaings = [{id : 1, name: 'Kill Kirov', product : 'who knows why', status : 'on', keywords : ['Stalin', 'Kirov', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 2, name: 'Kill Stalin', product : 'provocation', status : 'on', keywords : ['Stalin', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 3, name: 'Kill Trocki', product : 'always remember', status : 'off', keywords : ['Stalin', 'Trocki', 'CCCP', 'Mexico','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 4, name: 'Collectivization', product : 'kill many people', status : 'on', keywords : ['Stalin', 'Cottage', 'CCCP', 'Murder','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 5, name: 'No, Germany won\'t attack us', product : 'Stalin the great', status : 'on', keywords : ['Stalin', 'Nazist', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik','Hitler', 'Żukow', 'Manipulation'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 6, name: 'Exterminate officers in army', product : 'We will win!', status : 'on', keywords : ['Stalin', 'KC', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 7, name: 'Brothers Help to Ukraine and Belarus', product : 'Nazi Killers', status : 'on', keywords : ['Stalin', 'Ukraine', 'Belarus', 'Minsk', 'Kiev', 'CCCP','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false},
	{id : 8, name: 'very very very very very very very very very very very very very very very long campaign name', product : 'Nazi Killers', status : 'on', keywords : ['Stalin', 'Ukraine', 'Belarus', 'Minsk', 'Kiev', 'CCCP','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds', edit: false}
	];
	$scope.towns = ['moskau', 'leningrad', 'stalingrad', 'tula', 'orzel', 'alma-aty', 'murmansk', 'wladiwostock']
	$scope.chooseCampaign = function(campaign){
		$scope.campaign = campaign;
	};
	$scope.deleteCampaign = function(campaign){
		var i = $scope.campaings.indexOf(campaign);
		if(campaign === $scope.campaign){
			$scope.campaign = null;
		}
        $scope.campaings.splice(i,1);
	};
	$scope.editCampaign = function(campaign){
		$scope.campaign = campaign;
		campaign.edit = true;
	}
	$scope.saveCampaign = function(campaign){
		campaign.edit = false;
		if($scope.campaings.indexOf(campaign) == -1){
			$scope.campaings.push($scope.campaign);
		}
	}
	$scope.createCampaign = function(){
		$scope.campaign = {status : 'off', keywords : [], bidAmount : 1, fund: 1, radius: 1, edit: true};
		$scope.campaign.edit = true;
	}
	$scope.findTowns = function(town){
		var res = town ? $scope.towns.filter(townsFilter(town)) : $scope.towns;
		return res;
	}
	$scope.addTown = function(town){
		$scope.campaign.town = town;
		$scope.towns.push(town);
	}
	function townsFilter(query) {
        return function filterFn(town) {
            return (town.indexOf(angular.lowercase(query)) === 0);
        };
    }
});