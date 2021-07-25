
function GetName(name_surname){
  var name = name_surname.replace(/ .*/,'');
  return name;
}

function GetSurname(name_surname){
  var surname = name_surname.split(" ").splice(-1);
  return surname;
}

function GetID(details){
	var id;
	var indexL = details.indexOf("Fascicolo N.");
  var indexR = details.indexOf("Laurea");
	if(indexL>=0){
    id = details.substring(indexL+14, indexR-2);
 }else{id="NO ID";}
	return id;
}

function GetDegree(details){
  var indexL = details.indexOf("Laurea");
  var indexR = details.indexOf("Data");
  var degree = details.substring(indexL+18, indexR-2);
	if(degree == "Chimica e tecnologia farmaceutiche"){degree = "Chimica";}
	if(degree == "Medicina e Chirurgia"){degree = "Medicina";}
	if(degree == "Lettere e Filosofia"){degree = "Filosofia";}
	if(degree == "Economia e Commercio"){degree = "Economia";}
	if(degree == "Scienze Matematiche, Fisiche e Naturali"){degree = "Scienze Fisiche";}
	if(degree == "Scienze biologiche sanitarie"){degree = "Scienze biologiche";}
	if(degree == "Scienze Politiche (ind. Politico-Economico)"){degree = "Scienze Politiche";}
	if(degree == "Geografia e processi territoriali"){degree = "Geografia";}
	if(degree == "Discipline delle Arti, Musica e Spettacolo"){degree = "Arti";}
	if(degree == "Conservazione dei Beni Culturali"){degree = "Beni Culturali";}
	if(degree == "Ingegneria Civile - Sezione Trasporti"){degree = "Ingegneria Civile";}
	if(degree == "Ingegneria industriale elettronica"){degree = "Ingegneria elettronica";}
	if(degree == "Scienze e tecnologie agrarie"){degree = "Scienze agrarie";}
	if(degree == "Scienze storiche e orientalistiche"){degree = "Scienze storiche";}
	if(degree == "Discipline della Musica e del Teatro"){degree = "Arti";}
	if(degree == "Filologia, Letteratura e Tradizione classica"){degree = "Filologia";}
	if(degree == "Conservazione e Valorizzazione dei Beni Archeologici"){degree = "Beni Archeologici";}
	if(degree == "Letterature e filologie europee moderne"){degree = "Filologia";}
	if(degree == "Prodotti, Materiali e Processi per la Chimica Industriale"){degree = "Chimica Industriale";}
	if(degree == "Lingue e Letterature Straniere"){degree = "Lingue Straniere";}
	if(degree == " Progettazione e gestione didattica dell'e-learning e della media education"){degree = "Progettazione didattica dell'e-learning";}

  return degree;
}

function GetDate(details){
  var indexL = details.indexOf("Data");
  var indexR = details.indexOf("Struttura");
  var date = details.substring(indexL+6, indexR-2);
  return date;
}

function GetStructure(details){
  var indexL = details.indexOf("Struttura");
  var indexR = details.indexOf("Vedi");
  var structure = details.substring(indexL+22, indexR-2);
  return structure;
}

var myData = [];
var students = [{
	"name": "",
	"surname": "",
	"date": ""
}];


var dateList = [];

$.ajax({
	type: "GET",
	async: false,
	url: "extract_data/archive.json",
	success: function(data){
  		for (var key in data) {
      	if (data.hasOwnProperty(key)) {
          	var std = data[key];
          	myData.push({
              	url: std.url,
              	name: GetName(std.Name_surname),
              	surname: GetSurname(std.Name_surname),
              	id: GetID(std.Details),
              	degree: GetDegree(std.Details),
              	date: GetDate(std.Details),
              	structure: GetStructure(std.Details),
              	image: std.Image
          	});
      	}
   	  }
	 }
});

for (var i = 0; i < myData.length; i++) {
	var name = myData[i].name,
		surname = myData[i].surname,
		id = myData[i].id,
		degree = myData[i].degree,
		date = myData[i].date,
		year = date.substring(6,10),
		structure = myData[i].structure,
		image = myData[i].image;

		if(!dateList.includes(date)){
			dateList.push(date);
		}
		students.push({"name": name, "surname": surname, "date": date});
}

dateList.sort(function(a,b) {
  a = a.split('/').reverse().join('');
  b = b.split('/').reverse().join('');
  return a > b ? 1 : a < b ? -1 : 0;
  // return a.localeCompare(b);         // <-- alternative
});


var list = [];
var index =0;
var yearList ="", eventsYears="";
for(var i in dateList){
	var myStd = [];
	for(var j in students){
		if(students[j].date == dateList[i]){
			myStd.push(students[j]);
		}
	}
	list[i] = myStd;
}

yearList += "<li><a href='#0' data-date='01/01/1' class='selected'>"+GetMonthAndYear(list[0][0].date)+"</a></li> ";
var index = 1;
for(var i=1; i<list.length; i++){
		 yearList += "<li><a href='#0' data-date='"+SetDistance(i)+"'>"+GetMonthAndYear(list[i][0].date)+"</a></li> ";
}

eventsYears += "<li data-date='01/01/1' class='selected'><h2>Lauree conferite: "+list[0].length+"</h2> <em>"+TakeNames(list[0])+"</em></li> ";
index = 1;
for(var i=1; i<list.length; i++){
		 eventsYears += "<li data-date='"+SetDistance(i)+"'><h2>Laure conferite: "+list[i].length+"</h2><em>"+TakeNames(list[i])+"</em></li> ";
}
//console.log(yearList);

function TakeNames(arr){
				var str = "";
				if(arr.length>5){
					 str = "<strong>Alcuni degli studenti laureati in questa data sono:</strong></br>"+arr[0].name +" "+ arr[0].surname +"</strong><br>"
					                      +""+arr[1].name +" "+ arr[1].surname +"<br>"
									 					 	  +""+arr[2].name +" "+ arr[2].surname +"<br>"
															  +""+arr[3].name +" "+ arr[3].surname +"<br>"
								 						 	  +""+arr[4].name +" "+ arr[4].surname +"<br>";
				}else if(arr.length == 1){
					str = "<strong>Lo studente laureato in questa data è: </strong>"+arr[0].name +" "+ arr[0].surname +".<br>"
				}

				else{
					str = "<strong>Alcuni degli studenti laureati in questa data sono: "+"</strong>";
					for(var i=0; i<arr.length; i++){
						str += " <br>"+" "+arr[i].name +" "+ arr[i].surname;
					}
				}
				return str;
}

function GetMonthAndYear(data){
	var month = data.substring(3, 5);
	var year = data.substring(6, 10);
	if(month == "01"){return "Gen '" +year;}
	if(month == "02"){return "Feb '" +year;}
	if(month == "03"){return "Mar '" +year;}
	if(month == "04"){return "Apr '" +year;}
	if(month == "05"){return "Mag '" +year;}
	if(month == "06"){return "Giu '" +year;}
	if(month == "07"){return "Lug '" +year;}
	if(month == "08"){return "Ago '" +year;}
	if(month == "09"){return "Set '" +year;}
	if(month == "10"){return "Ott '" +year;}
	if(month == "11"){return "Nov '" +year;}
	if(month == "12"){return "Dec '" +year;}
}

function SetDistance(i){
	var year2 = list[i][0].date.substr(6,10);
	var year1 = list[i-1][0].date.substr(6,10);
	if(year2-year1 > 20){
		index = index+5000;
		return "01/01/".concat(index);
	}else if(year2-year1 <= 20  && year2-year1 > 10){
			index = index+800;
			return "01/01/".concat(index);
	}else if(year2-year1 <=10  && year2-year1 >5){
		index = index+750;
		return "01/01/".concat(index);
	}else if(year2-year1 <=5  && year2-year1 >0){
		index = index+700;
		return "01/01/".concat(index);
	}
	else if(year2-year1 <= 0){
		index = index+650;
		return "01/01/".concat(index);
	}
}

$('#dateList').append(yearList);
$('#eventsYears').append(eventsYears);

jQuery(document).ready(function($){

	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 200;

	(timelines.length > 0) && initTimeline(timelines);
	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev')
		(string == 'next')
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);

		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var dateComp = $(this).data('date').split('/'),
				newDate = new Date(dateComp[2], dateComp[1]-1, dateComp[0]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function parseDate2(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) {
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});
