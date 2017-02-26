!function($){function a(){this.regionalOptions=[],this.regionalOptions[""]={invalidCalendar:"Calendar {0} not found",invalidDate:"Invalid {0} date",invalidMonth:"Invalid {0} month",invalidYear:"Invalid {0} year",differentCalendars:"Cannot mix {0} and {1} dates"},this.local=this.regionalOptions[""],this.calendars={},this._localCals={}}function t(a,t,n,e){if(this._calendar=a,this._year=t,this._month=n,this._day=e,0===this._calendar._validateLevel&&!this._calendar.isValid(this._year,this._month,this._day))throw($.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate).replace(/\{0\}/,this._calendar.local.name)}function n(a,t){return a=""+a,"000000".substring(0,t-a.length)+a}function e(){this.shortYearCutoff="+10"}function i(a){this.local=this.regionalOptions[a]||this.regionalOptions[""]}$.extend(a.prototype,{instance:function(a,t){a=(a||"gregorian").toLowerCase(),t=t||"";var n=this._localCals[a+"-"+t];if(!n&&this.calendars[a]&&(n=new this.calendars[a](t),this._localCals[a+"-"+t]=n),!n)throw(this.local.invalidCalendar||this.regionalOptions[""].invalidCalendar).replace(/\{0\}/,a);return n},newDate:function(a,t,n,e,i){return e=(null!=a&&a.year?a.calendar():"string"==typeof e?this.instance(e,i):e)||this.instance(),e.newDate(a,t,n)}}),$.extend(t.prototype,{newDate:function(a,t,n){return this._calendar.newDate(null==a?this:a,t,n)},year:function(a){return 0===arguments.length?this._year:this.set(a,"y")},month:function(a){return 0===arguments.length?this._month:this.set(a,"m")},day:function(a){return 0===arguments.length?this._day:this.set(a,"d")},date:function(a,t,n){if(!this._calendar.isValid(a,t,n))throw($.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate).replace(/\{0\}/,this._calendar.local.name);return this._year=a,this._month=t,this._day=n,this},leapYear:function(){return this._calendar.leapYear(this)},epoch:function(){return this._calendar.epoch(this)},formatYear:function(){return this._calendar.formatYear(this)},monthOfYear:function(){return this._calendar.monthOfYear(this)},weekOfYear:function(){return this._calendar.weekOfYear(this)},daysInYear:function(){return this._calendar.daysInYear(this)},dayOfYear:function(){return this._calendar.dayOfYear(this)},daysInMonth:function(){return this._calendar.daysInMonth(this)},dayOfWeek:function(){return this._calendar.dayOfWeek(this)},weekDay:function(){return this._calendar.weekDay(this)},extraInfo:function(){return this._calendar.extraInfo(this)},add:function(a,t){return this._calendar.add(this,a,t)},set:function(a,t){return this._calendar.set(this,a,t)},compareTo:function(a){if(this._calendar.name!==a._calendar.name)throw($.calendars.local.differentCalendars||$.calendars.regionalOptions[""].differentCalendars).replace(/\{0\}/,this._calendar.local.name).replace(/\{1\}/,a._calendar.local.name);var t=this._year!==a._year?this._year-a._year:this._month!==a._month?this.monthOfYear()-a.monthOfYear():this._day-a._day;return 0===t?0:0>t?-1:1},calendar:function(){return this._calendar},toJD:function(){return this._calendar.toJD(this)},fromJD:function(a){return this._calendar.fromJD(a)},toJSDate:function(){return this._calendar.toJSDate(this)},fromJSDate:function(a){return this._calendar.fromJSDate(a)},toString:function(){return(this.year()<0?"-":"")+n(Math.abs(this.year()),4)+"-"+n(this.month(),2)+"-"+n(this.day(),2)}}),$.extend(e.prototype,{_validateLevel:0,newDate:function(a,n,e){return null==a?this.today():(a.year&&(this._validate(a,n,e,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate),e=a.day(),n=a.month(),a=a.year()),new t(this,a,n,e))},today:function(){return this.fromJSDate(new Date)},epoch:function(a){var t=this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidYear||$.calendars.regionalOptions[""].invalidYear);return t.year()<0?this.local.epochs[0]:this.local.epochs[1]},formatYear:function(a){var t=this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidYear||$.calendars.regionalOptions[""].invalidYear);return(t.year()<0?"-":"")+n(Math.abs(t.year()),4)},monthsInYear:function(a){return this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidYear||$.calendars.regionalOptions[""].invalidYear),12},monthOfYear:function(a,t){var n=this._validate(a,t,this.minDay,$.calendars.local.invalidMonth||$.calendars.regionalOptions[""].invalidMonth);return(n.month()+this.monthsInYear(n)-this.firstMonth)%this.monthsInYear(n)+this.minMonth},fromMonthOfYear:function(a,t){var n=(t+this.firstMonth-2*this.minMonth)%this.monthsInYear(a)+this.minMonth;return this._validate(a,n,this.minDay,$.calendars.local.invalidMonth||$.calendars.regionalOptions[""].invalidMonth),n},daysInYear:function(a){var t=this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidYear||$.calendars.regionalOptions[""].invalidYear);return this.leapYear(t)?366:365},dayOfYear:function(a,t,n){var e=this._validate(a,t,n,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate);return e.toJD()-this.newDate(e.year(),this.fromMonthOfYear(e.year(),this.minMonth),this.minDay).toJD()+1},daysInWeek:function(){return 7},dayOfWeek:function(a,t,n){var e=this._validate(a,t,n,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate);return(Math.floor(this.toJD(e))+2)%this.daysInWeek()},extraInfo:function(a,t,n){return this._validate(a,t,n,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate),{}},add:function(a,t,n){return this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate),this._correctAdd(a,this._add(a,t,n),t,n)},_add:function(a,t,n){if(this._validateLevel++,"d"===n||"w"===n){var e=a.toJD()+t*("w"===n?this.daysInWeek():1),i=a.calendar().fromJD(e);return this._validateLevel--,[i.year(),i.month(),i.day()]}try{var r=a.year()+("y"===n?t:0),s=a.monthOfYear()+("m"===n?t:0),i=a.day(),o=function(a){for(;s<a.minMonth;)r--,s+=a.monthsInYear(r);for(var t=a.monthsInYear(r);s>t-1+a.minMonth;)r++,s-=t,t=a.monthsInYear(r)};"y"===n?(a.month()!==this.fromMonthOfYear(r,s)&&(s=this.newDate(r,a.month(),this.minDay).monthOfYear()),s=Math.min(s,this.monthsInYear(r)),i=Math.min(i,this.daysInMonth(r,this.fromMonthOfYear(r,s)))):"m"===n&&(o(this),i=Math.min(i,this.daysInMonth(r,this.fromMonthOfYear(r,s))));var l=[r,this.fromMonthOfYear(r,s),i];return this._validateLevel--,l}catch(h){throw this._validateLevel--,h}},_correctAdd:function(a,t,n,e){if(!(this.hasYearZero||"y"!==e&&"m"!==e||0!==t[0]&&a.year()>0==t[0]>0)){var i={y:[1,1,"y"],m:[1,this.monthsInYear(-1),"m"],w:[this.daysInWeek(),this.daysInYear(-1),"d"],d:[1,this.daysInYear(-1),"d"]}[e],r=0>n?-1:1;t=this._add(a,n*i[0]+r*i[1],i[2])}return a.date(t[0],t[1],t[2])},set:function(a,t,n){this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate);var e="y"===n?t:a.year(),i="m"===n?t:a.month(),r="d"===n?t:a.day();return("y"===n||"m"===n)&&(r=Math.min(r,this.daysInMonth(e,i))),a.date(e,i,r)},isValid:function(a,t,n){this._validateLevel++;var e=this.hasYearZero||0!==a;if(e){var i=this.newDate(a,t,this.minDay);e=t>=this.minMonth&&t-this.minMonth<this.monthsInYear(i)&&n>=this.minDay&&n-this.minDay<this.daysInMonth(i)}return this._validateLevel--,e},toJSDate:function(a,t,n){var e=this._validate(a,t,n,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate);return $.calendars.instance().fromJD(this.toJD(e)).toJSDate()},fromJSDate:function(a){return this.fromJD($.calendars.instance().fromJSDate(a).toJD())},_validate:function(a,t,n,e){if(a.year){if(0===this._validateLevel&&this.name!==a.calendar().name)throw($.calendars.local.differentCalendars||$.calendars.regionalOptions[""].differentCalendars).replace(/\{0\}/,this.local.name).replace(/\{1\}/,a.calendar().local.name);return a}try{if(this._validateLevel++,1===this._validateLevel&&!this.isValid(a,t,n))throw e.replace(/\{0\}/,this.local.name);var i=this.newDate(a,t,n);return this._validateLevel--,i}catch(r){throw this._validateLevel--,r}}}),i.prototype=new e,$.extend(i.prototype,{name:"Gregorian",jdEpoch:1721425.5,daysPerMonth:[31,28,31,30,31,30,31,31,30,31,30,31],hasYearZero:!1,minMonth:1,firstMonth:1,minDay:1,regionalOptions:{"":{name:"Gregorian",epochs:["BCE","CE"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dateFormat:"mm/dd/yyyy",firstDay:0,isRTL:!1}},leapYear:function(a){var t=this._validate(a,this.minMonth,this.minDay,$.calendars.local.invalidYear||$.calendars.regionalOptions[""].invalidYear),a=t.year()+(t.year()<0?1:0);return a%4===0&&(a%100!==0||a%400===0)},weekOfYear:function(a,t,n){var e=this.newDate(a,t,n);return e.add(4-(e.dayOfWeek()||7),"d"),Math.floor((e.dayOfYear()-1)/7)+1},daysInMonth:function(a,t){var n=this._validate(a,t,this.minDay,$.calendars.local.invalidMonth||$.calendars.regionalOptions[""].invalidMonth);return this.daysPerMonth[n.month()-1]+(2===n.month()&&this.leapYear(n.year())?1:0)},weekDay:function(a,t,n){return(this.dayOfWeek(a,t,n)||7)<6},toJD:function(a,t,n){var e=this._validate(a,t,n,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate);a=e.year(),t=e.month(),n=e.day(),0>a&&a++,3>t&&(t+=12,a--);var i=Math.floor(a/100),r=2-i+Math.floor(i/4);return Math.floor(365.25*(a+4716))+Math.floor(30.6001*(t+1))+n+r-1524.5},fromJD:function(a){var t=Math.floor(a+.5),n=Math.floor((t-1867216.25)/36524.25);n=t+1+n-Math.floor(n/4);var e=n+1524,i=Math.floor((e-122.1)/365.25),r=Math.floor(365.25*i),s=Math.floor((e-r)/30.6001),o=e-r-Math.floor(30.6001*s),l=s-(s>13.5?13:1),h=i-(l>2.5?4716:4715);return 0>=h&&h--,this.newDate(h,l,o)},toJSDate:function(a,t,n){var e=this._validate(a,t,n,$.calendars.local.invalidDate||$.calendars.regionalOptions[""].invalidDate),i=new Date(e.year(),e.month()-1,e.day());return i.setHours(0),i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),i.setHours(i.getHours()>12?i.getHours()+2:0),i},fromJSDate:function(a){return this.newDate(a.getFullYear(),a.getMonth()+1,a.getDate())}}),$.calendars=new a,$.calendars.cdate=t,$.calendars.baseCalendar=e,$.calendars.calendars.gregorian=i}(jQuery);