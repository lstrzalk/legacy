var app = angular.module('campMan', ['ngMaterial']);
app.controller('campaignCtrl', function($scope,$mdDialog){
	$scope.tags = getTags();
	$scope.towns = getTowns();
	$scope.campaings = [{id : 1, name: 'Kill Kirov', product : 'who knows why', status : 'on', keywords : [$scope.tags[0], $scope.tags[1], $scope.tags[4], $scope.tags[6],$scope.tags[5]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 2, name: 'Kill Stalin', product : 'provocation', status : 'on', keywords : [$scope.tags[0], $scope.tags[4],$scope.tags[5]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 3, name: 'Kill Trocki', product : 'always remember', status : 'off', keywords : [$scope.tags[0], $scope.tags[14], $scope.tags[4], $scope.tags[5]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 4, name: 'Collectivization', product : 'kill many people', status : 'on', keywords : [$scope.tags[0], $scope.tags[4], $scope.tags[9],$scope.tags[5]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 5, name: 'No, Germany won\'t attack us', product : 'Stalin the great', status : 'on', keywords : [$scope.tags[0], $scope.tags[8], $scope.tags[4], $scope.tags[6],$scope.tags[5],$scope.tags[2], $scope.tags[3]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 6, name: 'Exterminate officers in army', product : 'We will win!', status : 'on', keywords : [$scope.tags[0], 'KC', $scope.tags[4], $scope.tags[6],$scope.tags[6],$scope.tags[5]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 7, name: 'Brothers Help to Ukraine and Belarus', product : 'Nazi Killers', status : 'on', keywords : [$scope.tags[0], $scope.tags[10], $scope.tags[11], $scope.tags[12], $scope.tags[13], $scope.tags[4],$scope.tags[5]], bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false},
	{id : 8, name: 'very very very very very very very very very very very very very very very long campaign name', product : 'Nazi Killers', status : 'on', keywords : $scope.tags, bidAmount : 10, fund: 10000, town: $scope.towns[0], radius: 300, currency: 'pounds', edit: false}
	];
	function getTowns(){
		var allTowns = ['Moskau', 'Leningrad', 'Stalingrad', 'Tula', 'Orzel', 'Alma-Aty', 'Murmansk', 'Wladiwostock'];
		/*for (var i = allTowns.length - 1; i >= 0; i--) {
			 $scope.towns.push({
				key: allTowns[i].toLowerCase(),
				value: allTowns[i]});
		};*/
		return allTowns.map(function(town){
			return{
				key : town.toLowerCase(),
				value : town
			};
		});
	}
	function getTags(){
		var allTags = [{value: 'Stalin', category: 'Person'},
		{value: 'Kirov', category: 'Person'},
		{value: 'Hitler', category: 'Person'},
		{value: 'Żukow', category: 'Person'},
		{value: 'CCCP', category: 'Country'},
		{value: 'Sojuz Sowietskich Socjalisticzeskich Riespublik', category: 'Country'},
		{value: 'Stalingrad', category: 'Town'},
		{value: 'KC', category: 'Bad People'},
		{value: 'Nazist', category: 'Bad People'},
		{value: 'Cottage', category: 'Place'},
		{value: 'Ukraine', category: 'Country'},
		{value: 'Belarus', category: 'Country'},
		{value: 'Minsk', category: 'Town'},
		{value: 'Kiev', category: 'Town'},
		{value: 'Trocki', category: 'Person'},
		{value: 'Mexico', category: 'Country'}]
		return allTags.map(function(tag){
			tag.key = tag.value.toLowerCase();
			return tag;
		});
	}
	$scope.chooseCampaign = function(campaign){
		$scope.campaign = campaign;
	};
	$scope.deleteCampaign = function(campaign, ev){
		var i = $scope.campaings.indexOf(campaign);
		var confirm = $mdDialog.confirm()
          .title('Would you like to delete campaign?')
          .textContent('You will loose all your data')
          .targetEvent(ev)
          .ok('yes')
          .cancel('no');
        $mdDialog.show(confirm).then(function() {
	      	if(campaign === $scope.campaign){
				$scope.campaign = null;
			}
	        $scope.campaings.splice(i,1);
    		}, function() {
     		 
    		});

		
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
		return town ? $scope.towns.filter(townsFilter(town)) : $scope.towns;
	}
	$scope.findTags = function(tag){
		return tag ? $scope.tags.filter(tagsFilter(tag)) : $scope.tags;
	}
	$scope.addTown = function(town){
		$scope.campaign.town = town;
		$scope.towns.push(town);
	}
	function townsFilter(query) {
        return function filterFn(town) {
            return (town.key.indexOf(angular.lowercase(query)) === 0);
        };
    }
    function tagsFilter(query) {
        return function filterFn(tag) {
            return (tag.key.indexOf(angular.lowercase(query)) === 0);
        };
    }
});