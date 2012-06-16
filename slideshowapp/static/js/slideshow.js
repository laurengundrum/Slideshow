//To do: 
//1. make "new show" reset all counters, clear the pictures out of the divs, take you back to search div
//2. add show name to popup_box
//3. sortable() 
//4. Custom animation?

$(function() {

	//initialize dialog box
	$("#dialogSearch").dialog({title: 'Search and Select Pictures  ', closeText: 'x'});

	//Flickr search
	$('#searchFlickrButton').click(searchFlickr);

	//move Flickr images to Project Pictures
	$('#new_images').on('click', 'li', function() {
		$(this).remove();
		$("#listOfPhotos").append($(this));
	});

	var imagesAvailable = false;
	//move images from Project Pictures to Create Show 
	$("#projectPictures").on('click', 'li', function() {
		$(this).remove();
		$("#showPictures").append($(this));
		createShowList = $("#showPictures");
		imagesAvailable = true;
	});

	//Button click events

	//Clicking on Create takes you to a new tab, where you can arrange photos and view your show
	var dialogDisplayedBefore = false; 
		$("#createShowButton").click(function() {
			$("#dialogSearch").dialog('close');
			if (createShowDisplayed==false){
				loadCreateShow();
				switchSelectedClass($(this));
				$('#viewButton').removeClass('hidden');
				if (dialogDisplayedBefore == false) {
					$( "#dialogCreate" ).dialog({title: 'Create Your Show   ', closeText: 'x'});
					dialogDisplayedBefore = true;
				}
			}


		});

		//you can click back to Search and Select Photos if you want to add more
		$("#selectButton").click(function() {
			if(selectPicturesDisplayed == false) {
				loadSelectPictures();
				switchSelectedClass($(this));
			}
			if ($('#viewButton').hasClass('hidden')) {
				return;
			}
			else {
				$("#viewButton").addClass('hidden');
			}
			$("#dialogCreate").dialog('close');
		});

		//View Show pop-up box
		$("#viewButton").click(function() {
			if(imagesAvailable==false) {
				alert('You need to choose some pictures first!');
			}

			else if(viewShowDisplayed == false && imagesAvailable == true) {
				viewShow();
			} 
			$("#dialogCreate").dialog('close');
		});

		$("#viewButton").hover(function() {
			$(this).addClass('active');
		},
			function() {
				$(this).removeClass('active');
			}
		);

		//New Show 
		$('#newShow').click(function() {
			dialogDisplayedBefore = false;
			photoAlbums = [];
			selectPicturesDisplayed = true;
			createShowDisplayed = false;
			viewShowDisplayed = false;
			createShowList = [];
			loadSelectPictures();
			imagesAvailable = false;
		})

	/*Button hover events
		$("#blueButton li").hover(function() {
			$(this).addClass('active');
		}, 
			function() {
				$(this).removeClass('active');
			}
		);*/

});

var createShowList = [];

function searchFlickr()
{
  $("#new_images").empty();
  var search_text = $('#searchFlickr').val();
  $.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=eb190150e443d377b5d3aaa706787afe&tags=' + search_text + '&jsoncallback=?', flickrResults);
}

function flickrResults(data)
{
	var imagesList = '';
	var photos = data.photos.photo;
	var photosLength = photos.length;

	for (var i=0; i<photosLength; i++) {
		var item = photos[i];
		var src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
		var img = '<img class="image" src="' + src + '"/>';
		imagesList += "<li>" + img + "</li>";
	} 
	$("#new_images").append(imagesList);
}

var photoAlbums = [];
var selectPicturesDisplayed = true;
var createShowDisplayed = false;
var viewShowDisplayed = false;

var loadCreateShow = function() {
	createShowDisplayed = true;
	selectPicturesDisplayed = false;
	viewShowDisplayed = false;
	photoAlbums = $("#photoAlbums");
	$("#photoAlbums").addClass('hidden');
	$("#createShow").removeClass('hidden');
	$("#showPictures").disableSelection();
}

var loadSelectPictures = function() {
	selectPicturesDisplayed = true;
	createShowDisplayed = false;
	viewShowDisplayed = false;
	$("#createShow").addClass('hidden');
	$('#photoAlbums').removeClass('hidden');
}

var viewShow = function() {
	selectPicturesDisplayed = false;
	createShowDisplayed = false;
	viewShowDisplayed = true;
	var toShow = createShowList.children().first();
	$('#popup_box').prepend("<div id = 'popupTitle'>" + $('#projectName').val() + "</div>");
	$('#popup_box').fadeIn("slow");
	$("#popUpPics").append(createShowList);
	$("#popUpPics li").addClass("hidden");
	$("#playButton").click(function() {
			callNextPicture(toShow);
	});
	$("#popupBoxClose").click(function() {
		$('#popup_box').fadeOut("slow");
	});
}

var delay = 3000;
var callNextPicture = function(picture) {
	picture.fadeIn(800).delay(delay).fadeOut(800, function() {
		callNextPicture(picture.next());
	});
}

function switchSelectedClass(clickedTab) {
	clickedTab.siblings('.selected').removeClass('selected').addClass('notSelected');
	clickedTab.removeClass('notSelected').addClass('selected');
}