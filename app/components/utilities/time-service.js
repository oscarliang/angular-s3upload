// Service
app.service('Time', function($rootScope,StringUtil) {
	this.timezoneConsts = [
		{
			 timezonedata:'Europe/London',
			 label:'Europe/London'
		},
		{
			 timezonedata:'Australia/Eucla',
			 label:'Australia/WA/Eucla'
		},
		{
			 timezonedata:'Australia/Darwin',
			 label:'Australia/NT'
		},
		{
			 timezonedata:'Australia/Adelaide',
			 label:'Australia/SA/Broken Hill'
		},
		{
			 timezonedata:'Australia/Brisbane',
			 label:'Australia/Qld'
		},
		{
			 timezonedata:'Australia/Sydney',
			 label:'Australia/Syd/Melb/Hobart'
		},
		{
			 timezonedata:'Australia/Lord_Howe',
			 label:'Australia/LHI'
		},
		{
			 timezonedata:'Australia/Perth',
			 label:'Australia/WA/Perth'
		},
		{
			timezonedata:'Asia/Shanghai',
			label: 'Philippines/Manila'
		}
	];

	this.getTimeZoneByTimezoneData = function(timezoneData){
			var timezoneObject = null;
			var timeZoneObjArray = this.timezoneConsts;
			for (var i = 0; i < timeZoneObjArray.length; i++) {
				if (timeZoneObjArray[i].timezonedata === timezoneData){
					timezoneObject = timeZoneObjArray[i];
					break;
				}
			}
			if (timezoneObject === null){
					timezoneObject = {
						timezonedata:timezoneData,
						label:timezoneData
				   };
				   this.timezoneConsts.push(timezoneObject);
			}
			return timezoneObject;
	};
	this.getDateByPeriod = function(date, period) {
		var dateList = {};
		var momentDate = moment(date);
		dateList.from = new Date(momentDate.startOf(period).toString());
		dateList.to = new Date(momentDate.endOf(period).toString());
		return dateList;
	};
	this.getDateBetweenDate = function(from, to){
	var dateList = {};
	dateList.from = new Date(moment(from).startOf('day').toString());
	dateList.to = new Date(moment(to).endOf('day').toString());
	return dateList;
};
	this.getStartOfDay = function(date){
			return new Date(moment(date).startOf('day').toString());
	};
	this.getStartOfLastHour = function(datetime){
			var newdatetime = new Date(moment(datetime).subtract(1, 'hours').startOf('hour').toString());
			return newdatetime;
	};
	this.getEndOfDay = function(date){
		return new Date(moment(date).endOf('day').toString());
	};
	this.getPastDateByPeriod = function(startdate, period) {
		//start date created by getDateByPeriod should work by subtracting a single day
		var pastDate = new Date(startdate);
		pastDate.setDate(pastDate.getDate() - 1);
		return this.getDateByPeriod(pastDate, period);
	};
	this.intervalByGranularity = function(granularityType) {
		var intervalPeriods = {
			"month": 2419200,
			"week": 604800,
			"day": 86400,
			"hour": 3600,
			"30m": 1800,
			"15m": 900,
			"5m": 300
		};
		return intervalPeriods[granularityType];
	};
	this.formatDate = function(date, format){
                return  moment(date).format(format);
        };
	this.getGranularityByPeriod = function(period, dayGranularity) {
		var granularity;
		switch (period) {
			case "year":
				granularity = "month";
				break;
			case "month":
				granularity = "day";
				break;
			case "week":
				granularity = "day";
				break;
			case "isoweek":
				granularity = "day";
				period = "week";
				break;
			case "day":
				if (dayGranularity) {
					granularity = dayGranularity;
				} else {
					granularity = "hour";
				}
				break;
			case "custom":
                if (dayGranularity) {
                    granularity = dayGranularity;
                } else {
                    granularity = "day";
                }
				break;
		}
		return {
			"type": granularity,
			"format": this.granularityDateFormat(granularity),
			"period": period
		};
	};
	this.toDateString = function(datetime, granularity) {
                var format;
		switch (granularity) {
		case 'month':
			format = 'MMM YYYY';
			break;
		case 'week':
			format = 'D/M/YYYY';
			break;
		case 'day':
			format = 'ddd D MMM';
			break;
		case 'hour':
			format = 'D/M h:mm a';
			break;
		case '30m':
			format = 'h:mm a';
			break;
		case '15m':
			format = 'h:mm a';
			break;
		case '5m':
			format = 'h:mm a';
			break;
		}
		return moment.unix(datetime).format(format);
	};
	this.granularityDateFormat = function(granularity) {
		var dateFormat = {
			'day': 'd',
			'week': 'd MMM',
			'month': 'MMMM',
			'hour': null,
			'5m': null,
			'15m': null,
			'30m': null
		};
		return dateFormat[granularity];
	};
	this.getNextMonthDate = function(datetime){
		return new Date(moment(datetime).add(1, 'months').toString());     
	};
	this.getPreMonthDate = function(datetime){
		return new Date(moment(datetime).subtract(1, 'months').toString());     
	};
	this.isAfter = function(current, another){
		return moment(current).isAfter(another);
	};
	this.isAfter = function(current, another, comp){
		comp = comp || 'day';
		return moment(current).isAfter(another, comp);
	};
	this.isSame = function(current, another, comp){
		comp = comp || 'day';
		return moment(current).isSame(another, comp);
	};
	this.isBefore = function(current, another, comp){
		comp = comp || 'day';
		return moment(current).isBefore(another, comp);
	};
	this.getDefaultDates = function(days) {
		var startDate = new Date();
		var endDate = new Date();
		startDate = startDate.setDate(startDate.getDate() - days);
		return {
			start: startDate,
			end: endDate,
			now: endDate
		};
	};
	this.getDefaultReportDates = function(days) {
		var startDate = new Date();
		var endDate = new Date();
		startDate = this.getStartOfDay(startDate.setDate(startDate.getDate() - days));            
		return {
			start: startDate,
			end: endDate,
			now: endDate
		};
	};
	this.getNextDate = function(period, datetime){
		var newdatetime;
		switch (period) {
			case 'year':
				newdatetime = new Date(moment(datetime).add(1, 'years').toString()); 
				break;
			case 'month':
				newdatetime = new Date(moment(datetime).add(1, 'months').toString());  
				break;
			case 'isoweek':
				newdatetime = new Date(moment(datetime).add(1, 'weeks').toString());  
				break;
			case 'day':
				newdatetime = new Date(moment(datetime).add(1, 'days').toString());  
				break;
                        case 'hour':
				newdatetime = new Date(moment(datetime).add(1, 'hours').toString());  
				break;
		}
		return newdatetime; 
	};
	this.getPreviousDate = function(period, datetime){
		var newdatetime;
		switch (period) {
			case 'year':
				newdatetime = new Date(moment(datetime).subtract(1, 'years').toString()); 
				break;
			case 'month':
				newdatetime = new Date(moment(datetime).subtract(1, 'months').toString());     
				break;
			case 'isoweek':
				newdatetime = new Date(moment(datetime).subtract(1, 'weeks').toString());
				break;
			case 'day':
				newdatetime = new Date(moment(datetime).subtract(1, 'days').toString());  
				break;
                        case 'hour':
				newdatetime = new Date(moment(datetime).subtract(1, 'hours').toString());  
				break;
		}
		return newdatetime; 
	};
	this.getUTByTimezoneByMs = function(data, timezone){

		var offset = moment.tz.zone(timezone.timezonedata).offset(data*1000);
		data = data - offset*60;
		return data;
	};
	this.convertFromUtcToLocalUnixTimeStamp = function(unixUtcTimestamp, timezone){

		var offset = moment.tz.zone(timezone.timezonedata).offset(unixUtcTimestamp*1000);
		var unixLocalTimestamp = parseInt(unixUtcTimestamp) + offset*60;
		return unixLocalTimestamp;
	};
	this.getUTByTimezone = function(data, apitimezone, browsertimezone){
                var apioffset = moment.tz.zone(apitimezone.timezonedata).offset(data*1000);
                var browseroffset = moment.tz.zone(browsertimezone.timezonedata).offset(data*1000);
                data = data + apioffset*60 - browseroffset*60;
		return data;
	};
	this.setGlobalTimeZone = function(timezone){
		$rootScope.timezone = timezone;
	};
	this.setGlobalTimeZone = function(obj, timezone){
		$rootScope.timezone = timezone;
		obj.timezone = timezone;
		return obj;
	};
	this.validUnixTime = function(unixtime){
            return (new Date(unixtime*1000)).getTime() > 0;
        };

	///Thu PV add 11-14-2016
	this.getDatePreviousByNumberOfDay = function(date, numberOfDay){
		return new Date(date - numberOfDay * 1000*60*60*24);
	};


});
