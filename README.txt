A few lines of code are commented out and some unused files are saved in a for-later folder because I plan to add 
some new features to this later.

In general, here is how the slideshow works now: open index.html in your browser. Then

A. Log in with Facebook, it will take you to selectpictures.html

1. Search for pictures from Flickr. (I plan to allow users to log in with and select photo from 
Facebook in the future).
	//in progress: importing Facebook albums

2. Click on the photos from the Flickr search that you want to use in your show. These will be 
moved to the sidebar "Project Pictures."

3. Now you can create your show, so click on the "Create" tab. Here, click on the pictures from the
"Project Pictures" sidebar that you want to use in the show. Click on them in the order that you want 
them to appear, and they will be moved to the "Create" div. (I plan to enable drag and drop and sorting
soon).

4. Once you have the pictures arranged, click the "View Show" button and a popup box will appear. Click
on "play" to see your show. 

5. The "New Show" link resets everything so you can create a new show. 

Next steps:
- have array of Facebook albums with coverID, ID, and coverURL. Must make photo albums appear where Flickr is now
	- When click on photo album (cover photo) pop up box of photos in the album
	- click on photos you want to move to Project Pictures (recycle Flickr code for this)

- move script stuff from html to js files
- change dialog boxes to popups onhover of the tabs

- Enable saving shows and create a "My Shows" link that takes you to a list where you can view or edit
- Enable drag and drop, sorting of pictures in the Create div
- Enable resizing pictures in the Create div to reflect timing (e.g. make them wider to appear longer in the show)
- Enable uploading music to be used
- Import song lyrics in the Create div. Position photos next to the lyrics so you can ensure they appear
precisely where you want.

young-dusk-2783.herokuapp.com

https://graph.facebook.com/albumID/picture?access_token=  