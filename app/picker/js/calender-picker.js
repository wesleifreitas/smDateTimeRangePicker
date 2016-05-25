
(function(){

'use strict';

function DatePickerDir($timeout,picker,$mdMedia,$window){
	return {
	  restrict : 'E',
      require: '^ngModel',
      replace:true,
      scope :{
	      	initialDate : "=",
	      	minDate	:"=",
	      	maxDate:"=",
	      	format:"@",
	      	mode:"@",	      	
	      	startDay:"@",
	      	closeOnSelect:"@",
	      	weekStartDay:"@"
	    },
	    templateUrl:"picker/date-picker.html",
		link : function(scope,element,att,ngModelCtrl){
			setViewMode(scope.mode);
			scope.okLabel = picker.okLabel;
			scope.cancelLabel = picker.cancelLabel;			

			scope.$mdMedia =$mdMedia;
			scope.currentDate = isNaN(ngModelCtrl.$viewValue)  ? moment(): ngModelCtrl.$viewValue ;
			 
			function setViewMode(mode){
				switch(mode) {
				    case 'date':
				        scope.view = 'DATE';
						scope.headerDispalyFormat = picker.customHeader.date;				        
				        break;
				    case 'date-time':
						scope.view = 'DATE'
						scope.headerDispalyFormat =  picker.customHeader.dateTime;			
				        break;
				    case 'time':
				        scope.view = 'HOUR';
						scope.headerDispalyFormat = "HH:mm";
				        break;
				    default:
						scope.headerDispalyFormat = "ddd, MMM DD ";
				        scope.view = 'DATE';
				}					
			}

			scope.$on('calender:date-selected',function(){
				if(scope.closeOnSelect && (scope.mode!=='date-time' || scope.mode!=='time')){
					var date = moment(scope.selectedDate,scope.format);
					if(!date.isValid()){
						date = moment();
						scope.selectedDate =date;
					}
					if(!angular.isUndefined(scope.selectedTime)){	
						date.hour(scope.selectedTime.hour()).minute(scope.selectedTime.minute());
					}
					scope.currentDate =scope.selectedDate;
					ngModelCtrl.$setViewValue(date.format(scope.format));
					ngModelCtrl.$render();
					setViewMode(scope.mode)
					scope.$emit('calender:close');			

				}
			})

			scope.selectedDateTime = function(){
				var date = moment(scope.selectedDate,scope.format);
				if(!date.isValid()){
					date = moment();
					scope.selectedDate =date;
				}
				if(!angular.isUndefined(scope.selectedTime)){
					date.hour(scope.selectedTime.hour()).minute(scope.selectedTime.minute());
				}
				scope.currentDate =scope.selectedDate;
				ngModelCtrl.$setViewValue(date.format(scope.format));
				ngModelCtrl.$render();
				setViewMode(scope.mode)
				scope.$emit('calender:close');			
			}


			scope.closeDateTime = function(){
				scope.$emit('calender:close');			
			}

		}      
	}
}

function TimePickerDir($timeout,picker,$mdMedia,$window){
	return {
	  restrict : 'E',
      require: '^ngModel',
      replace:true,
      scope :{
	    initialDate : "@",
	    format:"@",
	    mode:"@",	      	
	    closeOnSelect:"@"
	},
	templateUrl:"picker/time-picker.html",
	link : function(scope,element,att,ngModelCtrl){
			setViewMode(scope.mode)
		    
		    scope.okLabel = picker.okLabel;
		    scope.cancelLabel = picker.cancelLabel;

			scope.currentDate = isNaN(ngModelCtrl.$viewValue)  ? moment(): ngModelCtrl.$viewValue ;
			scope.$mdMedia =$mdMedia;
			function setViewMode(mode){
				switch(mode) {
				    case 'date-time':
						scope.view = 'DATE'
						scope.headerDispalyFormat = "ddd, MMM DD HH:mm";			
				        break;
				    case 'time':
				        scope.view = 'HOUR';
						scope.headerDispalyFormat = "HH:mm";
				        break;
				    default:
				        scope.view = 'DATE';
				}					
			}

			scope.$on('calender:date-selected',function(){
				if(scope.closeOnSelect && (scope.mode!=='date-time' || scope.mode!=='time')){
					var date = moment(scope.selectedDate,scope.format);
					if(!date.isValid()){
						date = moment();
						scope.selectedDate =date;
					}
					if(!angular.isUndefined(scope.selectedTime)){	
						date.hour(scope.selectedTime.hour()).minute(scope.selectedTime.minute());
					}
					scope.currentDate =scope.selectedDate;
					ngModelCtrl.$setViewValue(date.format(scope.format));
					ngModelCtrl.$render();
					setViewMode(scope.mode)
					scope.$emit('calender:close');			

				}
			})

			scope.selectedDateTime = function(){
				var date = moment(scope.selectedDate,scope.format);
				if(!date.isValid()){
					date = moment();
					scope.selectedDate =date;
				}
				if(!angular.isUndefined(scope.selectedTime)){	
					date.hour(scope.selectedTime.hour()).minute(scope.selectedTime.minute());
				}
				scope.currentDate =scope.selectedDate;
				ngModelCtrl.$setViewValue(date.format(scope.format));
				ngModelCtrl.$render();
				setViewMode(scope.mode)
				scope.$emit('calender:close');			
			}


			scope.closeDateTime = function(){
				scope.$emit('calender:close');			
			}

		}      
	}
}


var app = angular.module('smDateTimeRangePicker');

app.directive('smDatePicker',['$timeout','picker','$mdMedia','$window',DatePickerDir]);
app.directive('smTimePicker',['$timeout','picker','$mdMedia','$window',TimePickerDir]);


})();


