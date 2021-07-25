/* We are importing the data from a json file, parsing it and creating
   the students list. */

/* bootpag PLUGIN */
	 (function(h,q){h.fn.bootpag=function(p){function m(c,b){b=parseInt(b,10);var d,e=0==a.maxVisible?1:a.maxVisible,k=1==a.maxVisible?0:1,n=Math.floor((b-1)/e)*e,f=c.find("li");a.page=b=0>b?0:b>a.total?a.total:b;f.removeClass(a.activeClass);d=1>b-1?1:a.leaps&&b-1>=a.maxVisible?Math.floor((b-1)/e)*e:b-1;a.firstLastUse&&f.first().toggleClass(a.disabledClass,1===b);e=f.first();a.firstLastUse&&(e=e.next());e.toggleClass(a.disabledClass,1===b).attr("data-lp",d).find("a").attr("href",g(d));k=1==a.maxVisible?
	 0:1;d=b+1>a.total?a.total:a.leaps&&b+1<a.total-a.maxVisible?n+a.maxVisible+k:b+1;e=f.last();a.firstLastUse&&(e=e.prev());e.toggleClass(a.disabledClass,b===a.total).attr("data-lp",d).find("a").attr("href",g(d));f.last().toggleClass(a.disabledClass,b===a.total);e=f.filter("[data-lp="+b+"]");k="."+[a.nextClass,a.prevClass,a.firstClass,a.lastClass].join(",.");if(!e.not(k).length){var m=b<=n?-a.maxVisible:0;f.not(k).each(function(b){d=b+1+n+m;h(this).attr("data-lp",d).toggle(d<=a.total).find("a").html(d).attr("href",
	 g(d))});e=f.filter("[data-lp="+b+"]")}e.not(k).addClass(a.activeClass);l.data("settings",a)}function g(c){return a.href.replace(a.hrefVariable,c)}var l=this,a=h.extend({total:0,page:1,maxVisible:null,leaps:!0,href:"javascript:void(0);",hrefVariable:"{{number}}",next:"&raquo;",prev:"&laquo;",firstLastUse:!1,first:'<span aria-hidden="true">&larr;</span>',last:'<span aria-hidden="true">&rarr;</span>',wrapClass:"pagination",activeClass:"active",disabledClass:"disabled",nextClass:"next",prevClass:"prev",
	 lastClass:"last",firstClass:"first"},l.data("settings")||{},p||{});if(0>=a.total)return this;h.isNumeric(a.maxVisible)||a.maxVisible||(a.maxVisible=parseInt(a.total,10));l.data("settings",a);return this.each(function(){var c,b,d=h(this);c=['<ul class="',a.wrapClass,' bootpag">'];a.firstLastUse&&(c=c.concat(['<li data-lp="1" class="',a.firstClass,'"><a href="',g(1),'">',a.first,"</a></li>"]));a.prev&&(c=c.concat(['<li data-lp="1" class="',a.prevClass,'"><a href="',g(1),'">',a.prev,"</a></li>"]));for(b=
	 1;b<=Math.min(a.total,a.maxVisible);b++)c=c.concat(['<li data-lp="',b,'"><a href="',g(b),'">',b,"</a></li>"]);a.next&&(b=a.leaps&&a.total>a.maxVisible?Math.min(a.maxVisible+1,a.total):2,c=c.concat(['<li data-lp="',b,'" class="',a.nextClass,'"><a href="',g(b),'">',a.next,"</a></li>"]));a.firstLastUse&&(c=c.concat(['<li data-lp="',a.total,'" class="last"><a href="',g(a.total),'">',a.last,"</a></li>"]));c.push("</ul>");d.find("ul.bootpag").remove();d.append(c.join(""));c=d.find("ul.bootpag");d.find("li").click(function(){var b=
	 h(this);if(!b.hasClass(a.disabledClass)&&!b.hasClass(a.activeClass)){var c=parseInt(b.attr("data-lp"),10);l.find("ul.bootpag").each(function(){m(h(this),c)});l.trigger("page",c)}});m(c,a.page)})}})(jQuery,window);


var myData = [];
$.ajax({
	type: "GET",
	async: false,
	url: "../extract_data/archive.json",
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

var students = "",
	names = "",
  surnames = "",
	ids = "",
	degrees = "",
	dates =""
  structures = "";

var degreeList = [];
var structureList = [];
var categoryList = [];

var indexStudent=0;
var nrStudentsAfterFilter = myData.length;
for (var i = 0; i < myData.length; i++) {
		var name = myData[i].name,
			surname = myData[i].surname,
			id = myData[i].id,
			degree = myData[i].degree,
			date = myData[i].date,
			year = date.substring(6,10),
    	structure = myData[i].structure,
			image = myData[i].image;

  	indexStudent++;
  	students += "<div class='col-sm-4 container-student student' id='student"+indexStudent+"' data-name='" + name + "' data-surname='" + surname + "' data-id='" + id + "' data-degree='" + degree + "'data-structure='" + structure + "'data-year='" + year +"'data-date='" + date + "'>"+
									"<div class='svg-background'>"+
									"</div>"+
									"<img class='profile-img' src='" + image + "'>"+
									"<div class='text-container'>"+
														"<p class='name-surname-text'> " + name +" "+ surname +"</p>"+
														"<p class='id-text'><strong>Nr. Fascicolo:</strong> " + id + "</p>"+
														"<p class='degree-text'><strong>Laurea:</strong> " + degree + "</p>"+
														"<p class='date-text'><strong>Data:</strong> " + date + "</p>"+
							  "</div>"+
					"</div>";

		//create dropdown of degrees
		if(degreeList.includes(degree) == false){
			 degrees += "<option value='" + degree + "'>" + degree + "</option>";
			 degreeList.push(degree);
	  }

		//create dropdown of structures
	  if(structureList.includes(structure) == false){
			 structures += "<option value='" + structure + "'>" + structure + "</option>";
			 structureList.push(structure);
	   }
  }

	dates += "<option value='1880-1900'> 1880-1900 </option>";
	dates += "<option value='1900-1920'> 1900-1920 </option>";
	dates += "<option value='1920-1940'> 1920-1940 </option>";
	dates += "<option value='1940-1960'> 1940-1960 </option>";
	dates += "<option value='1960-1980'> 1960-1980 </option>";
	dates += "<option value='1980-2000'> 1980-2000 </option>";
	dates += "<option value='2000-2020'> 2000-2020 </option>";

	$("#students").html(students);
	$(".student").hide().slice(0,9).show();
	$(".filter-degree").append(degrees);
	$(".filter-structure").append(structures);
	$(".filter-year").append(dates);

  var filtersObject = {};
	var finalFilter = "";
	var yearFilter = "";
	var filters = "";

//on filter change
  $(".filter").on("change",function() {
		$('ul.bootpag>li').not('.prev').first().trigger('click');  //reset page counter

		 finalFilter = "";
		 yearFilter = "";
		 filters = "";
	   var filterName = $(this).data("filter"),
		 filterVal = $(this).val();

	   if (filterVal == "") {
		    delete filtersObject[filterName];
	   } else {
		   filtersObject[filterName] = filterVal;
	   }

     var first = 0;
	   var second = 0;
	   for (var key in filtersObject) {
		    if(key == 'year'){
				   first = filtersObject[key].substring(0,4);
				   second = filtersObject[key].substring(5,9);
			  }else{
				  filters += "[data-"+key+"='"+filtersObject[key]+"']";
			  }
	   }

		 finalFilter = filters;
	   if(first != 0 && second != 0){
		    for(var i=first; i<second; i++){
			     yearFilter = "[data-year='"+i+"']";
			     finalFilter  += filters + yearFilter + ",";
		    }
	    }

	    if(finalFilter.substring(finalFilter.length - 1, finalFilter.length) ===","){
		      finalFilter = finalFilter.substring(0, finalFilter.length - 1);
	     }

	    if (filters == "" & yearFilter == "") {
				  $(".student").slice(0,9).show();
					nrStudentsAfterFilter = $(".student").length;
	    } else {
				  $(".student").hide().filter(finalFilter).slice(0,9).show();
					nrStudentsAfterFilter = $(".student").filter(finalFilter).length;
	    }
 });

 $(".sort-date").on("change", function(){
	 $('ul.bootpag>li').not('.prev').first().trigger('click'); //reset page counter

	 var container = $("#students");
	 var items = $(".student");

	 var orderBy = $(this).data("sort-date");
	 orderBy = $(this).val();


	 items.each(function(){
		 		var BCDate = $(this).attr("data-date").split("/");
				var standardDate = BCDate[1]+" "+BCDate[0]+" "+BCDate[2];
				standardDate = new Date(standardDate).getTime();
				$(this).attr("data-date", standardDate);
	 });

	 items.sort(function(a,b){
        a = parseFloat($(a).attr("data-date"));
        b = parseFloat($(b).attr("data-date"));
				if(orderBy == "dsc"){
        	return a>b ? -1 : a<b ? 1 : 0;
				}else{
					return a>b ? -1 : a>b ? 1 : 0;
				}
    }).each(function(){
        $("#students").prepend(this);
    });
 });

 $(".sort-name").on("change", function(){
	 $('ul.bootpag>li').not('.prev').first().trigger('click');  //reset page counter
	 var container = $("#students");
	 var items = $(".student");

	 var orderBy = $(this).data("sort-name");
	 orderBy = $(this).val();

	 items.sort(function(a,b){
		    a = $(a).attr("data-name");
				b = $(b).attr("data-name");
				if(orderBy == "ascn"){
					return a>b ? -1 : a<b ? 1 : 0;
				}else{
					return a<b ? -1 : a>b ? 1 : 0;
				}
    }).each(function(){
        $("#students").prepend(this);
    });
 });

 $('#pagination-here').bootpag({
     total: nrStudentsAfterFilter/9,
     page: 1,
     maxVisible: 5,
     leaps: true,
     href: "#result-page-{{number}}",
 });

 //page click action
 $('#pagination-here').on("page", function(event, num){
		if(finalFilter == "" ){
			$(".student").hide();
			$(".student").slice(0,9*num).show();
		}else{
			$(".student").hide().filter(finalFilter).slice(0,9*num).show();
		}

	/*	//on search form submit
		$("#search-form").submit(function(e) {
			$('ul.bootpag>li').not('.prev').first().trigger('click');  //reset page counter

			 e.preventDefault();
			 var query = $("#search-form input").val().toLowerCase();

			 $(".student").hide();
			 $(".student").each(function() {
					var name = $(this).data("name").toLowerCase(),
							surname = $(this).data("surname").toLowerCase(),
							degree = $(this).data("degree").toLowerCase();
					if (name.indexOf(query) > -1 || surname.indexOf(query) > -1  || degree.indexOf(query) > -1){
						 $(this).slice(0,9*num).show();
					}
			 });
		 }); */
 });
