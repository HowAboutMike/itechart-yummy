"use strict";var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var warningMinutes=10,workDays=[1,2,3,4,5],workTimes=[{from:"9:00",to:"10:20"},{from:"10:30",to:"12:20"},{from:"12:30",to:"14:00"},{from:"14:30",to:"17:20"},{from:"17:30",to:"19:00"}],holidays=[{month:2,day:6,message:"Сегодня Международный день бариста! 🍷"},{month:10,day:1,message:"Сегодня Международный день кофе! ☕"},{month:7,day:17,message:"У Насти День Рождения 🎂! Не забудьте поздравить любимого бариста!"}];document.head||(document.head=document.getElementsByTagName("head")[0]);var Day=function(){function e(t){_classCallCheck(this,e),this.messageElement=t,this.messageWishElement=t.querySelector(".message__wish"),this.messageAdviceElement=t.querySelector(".message__advice"),this.messageHolidayElement=t.querySelector(".message__holiday"),this.balloonElement=t.querySelector(".balloons"),this.update()}return _createClass(e,[{key:"dayOfWeek",value:function(){return this.date.getDay()}},{key:"isWorkDay",value:function(){var e=this.dayOfWeek();return workDays.includes(e)}},{key:"isWorkTime",value:function(){var t=this;return this.isWorkDay()&&workTimesParsed.some(function(i){return t.minutesFromMidnight>=e.getMinutesFromMidnight(i.from)&&t.minutesFromMidnight<e.getMinutesFromMidnight(i.to)},this)}},{key:"getMinutesToNextEvent",value:function(t){var i=this,s=1/0;return workTimesParsed.forEach(function(n){var a=e.getMinutesFromMidnight(n[t])-i.minutesFromMidnight;a>=0&&a<s&&(s=a)}),s}},{key:"getMinutesToNextBreakTime",value:function(){return this.getMinutesToNextEvent("to")}},{key:"getMinutesToNextWorkTime",value:function(){return this.getMinutesToNextEvent("from")}},{key:"getWish",value:function(){var e="Доброго денёчка! ☀️";return this.hours>=22||this.hours<5?e="Доброй ночки! 😴":this.hours>=17?e="Доброго вечерочка! 🎉":this.hours<12&&(e="Доброго утречка! 🙂"),e}},{key:"getFavicon",value:function(){var e=eventsParams.default.favicon;day.isWorkDay()?e=day.isWorkTime()?this.getMinutesToNextBreakTime()<=warningMinutes?eventsParams.warning.favicon:eventsParams.success.favicon:eventsParams.danger.favicon:e=eventsParams.default.favicon;return e}},{key:"getAdvice",value:function(){var t="Кофе? ☕";if(day.isWorkDay())if(day.isWorkTime()){var i=this.getMinutesToNextBreakTime(),s=numberForm(i,["минута","минуты","минут"]);t=i<=warningMinutes?"До перерыва всего "+i+" "+s+". ⚠️":"Приходите за кофе ☕"}else if(e.getMinutesFromMidnight(minTime)>this.minutesFromMidnight)t="Рабочий день еще не начался 🤷";else if(e.getMinutesFromMidnight(maxTime)<=this.minutesFromMidnight)t="Рабочий день закончился 😉";else{var n=this.getMinutesToNextWorkTime();t="В Yummy перерыв ⏳ (ещё "+n+" "+numberForm(n,["минута","минуты","минут"])+")"}else t="Сегодня выходной! 🏠";return t}},{key:"isHoliday",value:function(){var e=this;return holidays.some(function(t){return t.day===e.day&&t.month===e.month})}},{key:"getHoliday",value:function(){var e=this;return holidays.find(function(t){return t.day===e.day&&t.month===e.month})}},{key:"getHolidayText",value:function(){var e="С праздником!";return this.isHoliday()&&(e=this.getHoliday().message),e}},{key:"setHoliday",value:function(){var e=this.getHolidayText(),t="message__holiday--hidden",i="balloons--hidden";this.isHoliday()?(this.messageHolidayElement.textContent=e,this.messageHolidayElement.classList.remove(t),this.balloonElement.classList.remove(i)):(this.messageHolidayElement.classList.add(t),this.balloonElement.classList.add(i))}},{key:"setWish",value:function(){this.messageWishElement.textContent=this.getWish()}},{key:"setAdvice",value:function(){this.messageAdviceElement.textContent=this.getAdvice(),this.setColor()}},{key:"setColor",value:function(){var e=this;Object.values(eventsParams).forEach(function(t){t.when(e)?e.messageElement.classList.add(t.cssClass):e.messageElement.classList.remove(t.cssClass)})}},{key:"update",value:function(){this.date=new Date,this.hours=this.date.getHours(),this.minutes=this.date.getMinutes(),this.minutesFromMidnight=e.getMinutesFromMidnight({hours:this.hours,minutes:this.minutes}),this.month=this.date.getMonth()+1,this.day=this.date.getDate()}}],[{key:"getMinutesFromMidnight",value:function(e){return 60*e.hours+e.minutes}}]),e}(),workTimesParsed=workTimes.map(function(e){var t=e.from.split(":"),i=e.to.split(":");return{from:{hours:+t[0],minutes:+t[1]},to:{hours:+i[0],minutes:+i[1]}}}),minTime=workTimesParsed[0].from,maxTime=workTimesParsed[0].to;workTimesParsed.forEach(function(e){Day.getMinutesFromMidnight(e.from)<Day.getMinutesFromMidnight(minTime)&&(minTime=e.from),Day.getMinutesFromMidnight(e.to)>Day.getMinutesFromMidnight(maxTime)&&(maxTime=e.to)});var eventsParams={default:{cssClass:"message--default",favicon:"images/coffee.png",when:function(e){return!e.isWorkDay()}},success:{cssClass:"message--success",favicon:"images/success.png",when:function(e){return e.isWorkDay()&&e.isWorkTime()&&e.getMinutesToNextBreakTime()>warningMinutes}},warning:{cssClass:"message--warning",favicon:"images/warning.png",when:function(e){return e.isWorkDay()&&e.isWorkTime()&&e.getMinutesToNextBreakTime()<=warningMinutes}},danger:{cssClass:"message--danger",favicon:"images/danger.png",when:function(e){return e.isWorkDay()&&!e.isWorkTime()}}};function numberForm(e,t){return t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]]}var messageElement=document.querySelector(".message"),day=new Day(messageElement);function changeFavicon(e){var t=document.createElement("link"),i=document.getElementById("favicon");t.id="favicon",t.rel="shortcut icon",t.href=e,i&&!i.href.includes(e)&&(document.head.removeChild(i),document.head.appendChild(t))}function update(){day.update(),day.setWish(),day.setAdvice(),day.setHoliday();var e=day.getAdvice()+" | iTechArt Yummy";document.title!==e&&(document.title=e),changeFavicon(day.getFavicon())}setInterval(update,5e3),update();