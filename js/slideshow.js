$(function() {

	//Flickr searc
	$('#searchFlickrButton').click(searchFlickr);

	//move Flickr images to Project Pictures
	$('#new_images').on('click', 'li', function() {
		$(this).remove();
		$("#listOfPhotos").append($(this));
	});

	//move images from Project Pictures to Create Show 
	$("#projectPictures").on('click', 'li', function() {
		$(this).addClass(".ui-state-highlight");
		$(this).remove();
		$("#createShow ul").append($(this));
		createShowList = $("#createShow ul");
	});

	//Button click events
		$("#goButton").click(function() {
			window.location = "selectpictures.html";
		})

		$("#createShowButton").click(function() {
			if(createShowDisplayed == false) {
				loadCreateShow();
			}
		});

		$("#selectButton").click(function() {
			if(selectPicturesDisplayed == false) {
				loadSelectPictures();
			}
		});

	//Button hover events
		$(".blueButton").hover(function() {
			$(this).addClass('active');
		}, 
			function() {
				$(this).removeClass('active');
			}
		);

	//View Show pop-up box
		$("#viewButton").click(function() {
			if(createShowDisplayed == true) {
				viewShow();
			} 
			else {
				alert("Choose some pictures in order to view your show :-)");
			}
		});

		$('#popupBoxClose').click( function() {            
            $('#popup_box').fadeOut("slow");
            $('#ul').empty();
        });


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
var createShowDisplayed = false;
var selectPicturesDisplayed = true;
var loadCreateShow = function() {
	createShowDisplayed = true;
	selectPicturesDisplayed = false;
	photoAlbums = $("#photoAlbums");
	$("#photoAlbums").detach();
	$(".showContainer").prepend("<div class='grid_8 alpha box' id='createShow'>" + 
						"<h2>Create Show</h2>" + 
						"<p>Click photos to move them to your show, then drag to change the order.</p>" + 
						"<ul id = 'showPictures'>" + "</ul>" + "<div id = 'viewButton'>" + "</div>" +
					"</div>");

	$("#createShow ul").sortable();
}

var loadSelectPictures = function() {
	createShowDisplayed = false;
	selectPicturesDisplayed = true;
	$("#createShow").detach();
	$(".showContainer").prepend(photoAlbums);
}

var viewShow = function() {
	var toShow = createShowList.children().first();
	$('#popup_box').fadeIn("slow");
	$("#ul").append(createShowList);
	$("#ul li").addClass("hidden");
	$("#playButton").click(function() {
			callNextPicture(toShow);
	});
}

var delay = 3000;
var callNextPicture = function(picture) {
	picture.fadeIn(800).delay(delay).fadeOut(800, function() {
		callNextPicture(picture.next());
	});
}
