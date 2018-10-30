Goal: Create an input component that allows a user to upload an image, crop any part of it to dimensions determined by the user, emulate saving the cropped image to an API, and then preview the “saved” image and print it.

Requirements:
Please use standard Javascript/ES6 and the React framework for your solution.
The total size of your repo / zip file must be <= 50KB
The maximum image dimensions after cropping should be 800px (width) x 100px (height).
The maximum file size of the initial uploaded image should be limited to 1mb.
The input should be clearable
After cropping, do not actually upload the image to an API, just emulate doing so by passing the cropped image to the following code. Use the returned URL for previewing the image (not the image that was uploaded):

function saveImage(imageFile) {
    return Promise.resolve("http://lorempixel.com/800/100/cats/");
}


No image is a valid input. Ie. User should be able to call saveImage even if no image has been uploaded.
There should be a button called "Print Preview". When clicked it should open a new tab, print a page which has the response from saveImage centered at the top, 
and then close the tab after printing. If no image has been saved (ie. saveImage has not been called), 
then this button should be disabled. The displayed image should be no higher than 100px.
