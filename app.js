var app = angular.module('campMan', ['ngMaterial']);
app.controller('campaignCtrl', function($scope){
	$scope.readonly = true;
	$scope.campaings = [{id : 1, name: 'Kill Kirov', product : 'who knows why', status : 'on', keywords : ['Stalin', 'Kirov', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'},
	{id : 2, name: 'Kill Stalin', product : 'provocation', status : 'on', keywords : ['Stalin', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'},
	{id : 3, name: 'Kill Trocki', product : 'always remember', status : 'off', keywords : ['Stalin', 'Trocki', 'CCCP', 'Mexico','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'},
	{id : 4, name: 'Collectivization', product : 'kill many people', status : 'on', keywords : ['Stalin', 'Cottage', 'CCCP', 'Murder','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'},
	{id : 5, name: 'No, Germany wont attack us', product : 'Stalin the great', status : 'on', keywords : ['Stalin', 'Nazist', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik','Hitler', 'Żukow', 'Manipulation'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'},
	{id : 6, name: 'Exterminate officers in army', product : 'We will win!', status : 'on', keywords : ['Stalin', 'KC', 'CCCP', 'Leningrad','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'},
	{id : 7, name: 'Brothers Help to Ukraine and Belarus', product : 'Nazi Killers', status : 'on', keywords : ['Stalin', 'Ukraine', 'Belarus', 'Minsk', 'Kiev', 'CCCP','Sojuz Sowietskich Socjalisticzeskich Riespublik'], bidAmount : 10, fund: 10000, town: "Moskau", radius: 300, currency: 'pounds'}
	];
	$scope.chooseCampaign = function(campaign){
		$scope.campaign = campaign;
	};
	$scope.deleteCampaign = function(campaign){
		var i = $scope.campaings.indexOf(campaign);
        $scope.campaings.splice(i,1);
	};
	$scope.addCampaign = function(campaign){
		$scope.campaings.push(campaign);
	}
});