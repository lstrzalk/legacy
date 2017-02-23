var app = angular.module('campMan', ['ngMaterial','ngMessages']);
/*******************************
**********TAGS SERVICE**********
*******************************/
app.service('Tags',function(){
	this.loadTags = function(){
	    var tags = localStorage.getItem("tags");
	    if(!tags){
	    	var initTags = [{value: 'Stalin', category: 'Person'},
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
							{value: 'Mexico', category: 'Country'}];
			localStorage.setItem("tags", JSON.stringify(initTags));//Have to stringfy array becouse local storage is only key : value pair, so all array have to be string
			tags = localStorage.getItem("tags");
	    }
	    return JSON.parse(tags).map(function(tag){//Have to parese data becouse as above
			tag.key = tag.value.toLowerCase();//pair key value to prevent double tags with another case sensitive i.e. CCCP cccp Cccp
			return tag;
		});
	}
	this.getTagByValue = function(value){//To easier mocking campaigns objects
		var tags = this.loadTags();
    	for(var i=0;i<tags.length;i++){
    		if(tags[i].value === value){
    			return tags[i];
    		}
    	}
	}	
	this.createTag = function(val, cat){
		var tags = JSON.parse(localStorage.getItem("tags"));
		tags.push({value : val, category : cat});
		localStorage.setItem("tags", JSON.stringify(tags));
		return {value : val, category : cat, key : val.toLowerCase()};
	}	
});
/*******************************
**********TOWNS SERVICE*********
*******************************/
app.service('Towns',function(){
	this.loadTowns = function(){
	    var towns = localStorage.getItem("towns");
	    if(!towns){
	    	var initTowns = ['Moskau', 'Leningrad', 'Stalingrad', 'Tula', 'Orzel', 'Alma-Aty', 'Murmansk', 'Wladiwostock'];
			localStorage.setItem("towns", JSON.stringify(initTowns));
			towns = localStorage.getItem("towns");
	    }
	    return JSON.parse(towns).map(function(town){
			return{
				key : town.toLowerCase(),//pair key value to prevent double towns with another case sensitive i.e. Moskau moskau mOskau
				value : town
			};
		});
	}
	this.getTownByValue = function(value){//To easier mocking campaigns objects
		var towns = this.loadTowns();	
    	for(var i=0;i<towns.length;i++){
    		if(towns[i].value === value){
    			return towns[i];
    		}
    	}
	}
	this.createTown = function(town){
		var towns = JSON.parse(localStorage.getItem("towns"));
		towns.push(town);
		localStorage.setItem("towns", JSON.stringify(towns));
		return {key : town.toLowerCase(), value : town};
	}	
});
/*******************************
********CAMPAIGNS SERVICE*******
*******************************/
app.service('Campaigns',function (Tags, Towns) {
	this.loadCampaigns = function(){
	    var campaigns = localStorage.getItem("campaigns");
	    if(!campaigns){//If campaigns are not in localStorage then push them there
	    	var initCampaigns = [{id : 1, name: 'Kill Kirov', product : 'who knows why', status : 'on', keywords : [Tags.getTagByValue("Stalin"), Tags.getTagByValue("Kirov"), Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik"),Tags.getTagByValue("Stalingrad")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 2, name: 'Kill Stalin', product : 'provocation', status : 'on', keywords : [Tags.getTagByValue("Stalin"),Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 3, name: 'Kill Trocki', product : 'always remember', status : 'off', keywords : [Tags.getTagByValue("Stalin") , Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 4, name: 'Collectivization', product : 'kill many people', status : 'on', keywords : [Tags.getTagByValue("Stalin"), Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik"), Tags.getTagByValue("Cottage")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 5, name: 'No, Germany won\'t attack us', product : 'Stalin the great', status : 'on', keywords : [Tags.getTagByValue("Stalin"), Tags.getTagByValue("Nazist"), Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik"), Tags.getTagByValue("Stalingrad"), Tags.getTagByValue("Hitler"), Tags.getTagByValue("Żukow")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 6, name: 'Exterminate officers in army', product : 'We will win!', status : 'on', keywords : [Tags.getTagByValue("Stalin"), Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, currency: 'pounds', edit: false},
								{id : 7, name: 'Brothers Help to Ukraine and Belarus', product : 'Nazi Killers', status : 'on', keywords : [Tags.getTagByValue("Stalin"), Tags.getTagByValue("Ukraine"), Tags.getTagByValue("Belarus"), Tags.getTagByValue("Minsk"), Tags.getTagByValue("Kiev"),Tags.getTagByValue("CCCP"), Tags.getTagByValue("Sojuz Sowietskich Socjalisticzeskich Riespublik")], bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false},
								{id : 8, name: 'very very very very very very  long campaign name', product : 'Nazi Killers', status : 'on', keywords : Tags.loadTags(), bidAmount : 10, fund: 10000, town: Towns.getTownByValue("Moskau"), radius: 300, edit: false}];
			localStorage.setItem("campaigns", JSON.stringify(initCampaigns));
			campaigns = localStorage.getItem("campaigns");
	    }
	    return JSON.parse(campaigns);
	}
    this.save = function (campaign) {
      var campaigns = this.loadCampaigns();
      campaign.id = this.getId();
      campaigns.push(campaign);
      localStorage.setItem("campaigns", JSON.stringify(campaigns));
      return campaigns;
    };
    this.delete = function (campaign) {
    	var campaigns = this.loadCampaigns();
        var i = this.getCampaignPositionById(campaign.id)
        campaigns.splice(i,1);
        localStorage.removeItem("campaigns");
        localStorage.setItem("campaigns", JSON.stringify(campaigns));
        return campaigns;
    };
    this.update = function(campaign){
    	var campaigns = this.loadCampaigns();
    	campaigns.splice(this.getCampaignPositionById(campaign),1);
    	campaigns.push(campaign);
      	localStorage.setItem("campaigns", JSON.stringify(campaigns));
    };
    this.getId = function(){//To give new campaign new, unique id, primitive becouse won't give deleted campaigns id but it's not task subject
		var lastGivenId = localStorage.getItem("lastGivenId");
		var campaigns = this.loadCampaigns();
		if(!lastGivenId){
			var max = 0;
			for (var i = 0; i < campaigns.length; i++) {
				if(campaigns[i].id > max){
					max = campaigns[i].id;
				}
			};
			localStorage.setItem("lastGivenId", max + 1);
			return max+1;
		}
		localStorage.setItem("lastGivenId", parseInt(lastGivenId + 1));
		return parseInt(lastGivenId + 1)
    };
    this.getCompanyFunds = function(){
    	var funds = localStorage.getItem("funds");
    	if(!funds){
    		var campaigns = this.loadCampaigns();
    		var sum = 0;
			for (var i = 0; i < campaigns.length; i++) {
				sum += campaigns[i].fund;
			}
			return sum * 10;
    	}
    	return parseInt(funds);
    }
    this.updateCompanyFunds = function(fund){
    	var last = localStorage.getItem("funds");
    	localStorage.setItem("funds", fund);
    }
    this.getCampaignPositionById = function(id){//To Check if Campaign is on Campaings list
    	var campaigns = this.loadCampaigns();
    	for(var i=0;i<campaigns.length;i++){
    		if(campaigns[i].id === id){
    			return i;
    		}
    	}
    	return -1;
    }
    this.checkCampaignName = function(campaign){//To Check if campaign name is not already used to prevent duplicates
    	var campaigns = this.loadCampaigns();
    	for(var i=0;i<campaigns.length;i++){
    		if(campaigns[i].name === campaign.name && campaigns[i].id !== campaign.id){
    			return false;
    		}
    	}
    	return true;
    }

});
/*******************************
******CAMPAIGN CONTROLLER*******
*******************************/
app.controller('campaignCtrl', function($scope,$mdDialog,Campaigns, Towns, Tags){
	$scope.campaignForm = {};//For submit button outside form to disable if data is not valid
	$scope.company={};//Company Funds holder
	$scope.company.fund = Campaigns.getCompanyFunds();
	$scope.campaigns = Campaigns.loadCampaigns();//For List all campaigns
	$scope.chooseCampaign = function(campaign){
		$scope.campaign = campaign;
	};
	$scope.deleteCampaign = function(campaign, ev){
		var confirm = $mdDialog.confirm()
          .title('Would you like to delete campaign?')
          .textContent('You will loose all your data')
          .targetEvent(ev)
          .ok('yes')
          .cancel('no');
        $mdDialog.show(confirm).then(function() {
        	if(Campaigns.getCampaignPositionById(campaign.id) !== -1){
        		$scope.campaigns = Campaigns.delete(campaign);
        	}
	      	if(campaign === $scope.campaign){
				$scope.campaign = null;
			}
    		}, function() {
     		 
    		});
		
	};
	$scope.editCampaign = function(campaign){
		$scope.campaign = campaign;
		var originalFund = campaign.fund;
		$scope.company.updatedFund = Campaigns.getCompanyFunds()
		$scope.$watch('campaign.fund', function() {
        	$scope.company.updatedFund = Campaigns.getCompanyFunds()+(originalFund - $scope.campaign.fund );
    	});
		campaign.edit = true;
	}
	$scope.saveCampaign = function(campaign){
		if(Campaigns.checkCampaignName(campaign)){
			Campaigns.updateCompanyFunds($scope.company.updatedFund);
			campaign.edit = false;
			if(Campaigns.getCampaignPositionById(campaign.id) === -1){
				$scope.campaigns = Campaigns.save(campaign);
			}
		}
		else{
			$mdDialog.show(
	      		$mdDialog.alert()
		        .clickOutsideToClose(true)
		        .title('Name '+campaign.name+' is already used')
		        .textContent('Insert another one')
		        .ok('close')
   			);
		}
	}
	$scope.createCampaign = function(){
		$scope.campaign = {id : -1,status : 'off', keywords : [], bidAmount : 1, fund: 1, radius: 1, edit: true};
		$scope.company.updatedFund = Campaigns.getCompanyFunds()-$scope.campaign.fund;
		$scope.$watch('campaign.fund', function() {
        	$scope.company.updatedFund = Campaigns.getCompanyFunds()-$scope.campaign.fund;
    	});
		$scope.campaign.edit = true;
	}
	$scope.findTowns = function(town){//Match towns for autocomplete
		return town ? Towns.loadTowns().filter(townsFilter(town)) : Towns.loadTowns();
	}
	$scope.findTags = function(tag){//Match tags for autocomplete
		return tag ? Tags.loadTags().filter(tagsFilter(tag)) : Tags.loadTags();
	}
	$scope.addTown = function(town){
		$scope.campaign.town = Towns.createTown(town);
	}
	$scope.addTag = function(tag,ev){
		var self = this;
		$mdDialog.show({// dialog for adding new keywords
         	targetEvent: ev,
         	template:
	           '<md-dialog >' +
	           '  <md-dialog-content>'+
	           '	<md-content flex layout-padding>'+
		       '		<form name="tagForm">'+
			   '			<md-input-container class="md-block">'+
			   ' 				<label>Tag Name</label>'+
			   '	 			<input required type="text" name="tagName" ng-model="tag.value" minlength="1" maxlength="100"/>'+
			   '		 		<div ng-messages="tagForm.tagName.$error" role="alert">'+
			   '		   			<div ng-message-exp="["required", "minlength", "maxlength"]">'+
			   '		     			Tag name must be between 1 and 100 characters long.'+
			   '		   			</div>'+
			   '		 		</div>'+
			   '			</md-input-container>'+
			   '			<md-input-container class="md-block">'+
			   ' 				<label>Tag Category</label>'+
			   '	 			<input required type="text" name="tagCategory" ng-model="tag.category" minlength="1" maxlength="100"/>'+
			   '		 		<div ng-messages="tagForm.tagCategory.$error" role="alert">'+
			   '		   			<div ng-message-exp="["required", "minlength", "maxlength"]">'+
			   '		     			Tag category must be between 1 and 100 characters long.'+
			   '		   			</div>'+
			   '		 		</div>'+
			   '			</md-input-container>'+
			   '		</form>'+
	           '	</md-content>'+
	           '  </md-dialog-content>' +
	           '  <md-dialog-actions>' +
	           '    <md-button ng-click="confirm()" class="md-primary" ng-disabled = "tagForm.$invalid">' +
	           '      Save' +
	           '    </md-button>' +
	           '    <md-button ng-click="closeDialog()" class="md-primary">' +
	           '      Close' +
	           '    </md-button>' +
	           '  </md-dialog-actions>' +
	           '</md-dialog>',
         	controller: tagCtrl
      	});
		function tagCtrl($scope, $mdDialog) {
			$scope.tag = {};
        	$scope.tag.value = tag;
        	$scope.confirm = function(){
        		self.campaign.keywords.push(Tags.createTag($scope.tag.value,$scope.tag.category))
        		$mdDialog.hide();
        	}
        	$scope.closeDialog = function() {
          		$mdDialog.hide();
        	}
      	}	
	}
	function townsFilter(query) {//Filter for towns autocomplete
        return function filterFn(town) {
            return (town.key.indexOf(angular.lowercase(query)) === 0);
        };
    }
    function tagsFilter(query) {//Filter for tags autocomplete
        return function filterFn(tag) {
            return (tag.key.indexOf(angular.lowercase(query)) === 0);
        };
    }
});
