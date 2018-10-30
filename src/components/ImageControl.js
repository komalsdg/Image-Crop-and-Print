import React from 'react'

import {saveImage} from './ImageFunctions'
import ImageCropper from './ImageCropper'

import 'cropperjs/dist/cropper.css';

const CustomStyle = {
  img:{
	width:'800px',
    height: '400px',
	margin:'0 auto',
  },
  errorMsg:{
	  color:'#f16d6d',
	  'text-align':'center',
	  padding:'20px'
  },
  buttons:{
	  padding:'20px'
  }
}

export default class ImageControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: '',
      imagePreviewUrl: '',
	  hasError:false,
	  errorMsg:'',
	  imageSave:false,
    };
	
    this._handleImageChange = this._handleImageChange.bind(this);
	this.saveImageCall = this.saveImageCall.bind(this);
	this.cropImageCall = this.cropImageCall.bind(this);
	this.clearValues = this.clearValues.bind(this);
	this.cropImageSetCall = this.cropImageSetCall.bind(this);
	this.imagePrintCall = this.imagePrintCall.bind(this);
	
  }

  clearValues()
  {
	this.setState({
		imageFile:'',
		imagePreviewUrl:'',
		hasError:false,
		errorMsg:'',
		noFile:false,
		imageSave:false,
		doCrop:false
	});
  }
  
  saveImageCall()
  {
	  if(this.state.imageFile === "") this.setState({noFile:true}); else this.setState({noFile:false,imageSave:true});
	 saveImage(this.state.imageFile)
  }
  
  cropImageCall()
  {
	this.setState({
		doCrop : !this.state.doCrop
	});
  }
  
   cropImageSetCall(cropImage){
	
	this.setState({imageFile:cropImage, imagePreviewUrl: cropImage})
	this.cropImageCall()
  }
  
  imagePrintCall()
  {
	  var printwindowdata = `<html><body><div style="margin: 0 auto;text-align:center"><img src=${this.state.imagePreviewUrl} style="width:800px;height:400px;" /></div></body></html>`
	  var printwindow = window.open('', '_blank')
	  printwindow.document.open()
	  printwindow.document.write(printwindowdata)
	  printwindow.document.close()
	  printwindow.focus()
	  printwindow.print()
  }
  
  _handleImageChange(e) {
	  
    e.preventDefault();

    let reader = new FileReader();
    let imageFile = e.target.files[0];
	let maxfilesize = 1024000;
	this.setState({hasError:false,errorMsg:""});
	
	if(imageFile.size < maxfilesize)
	{
		if(imageFile.type === 'image/png' || imageFile.type === 'image/jpeg')
		{
			reader.onloadend = () => {
			  this.setState({
				imageFile: imageFile,
				imagePreviewUrl: reader.result
			  });
			}
			reader.readAsDataURL(imageFile)
		}
		else
		{
			this.setState({hasError:true,errorMsg:"Error Found : Only .png and .jpeg type of image can be uploaded"});
		}
	}
	else
	{
		this.setState({hasError:true,errorMsg:"Error Found : Size must be less than 1MB"});
	}
  }
  

  render() {
	  
    let {imagePreviewUrl, hasError, errorMsg, noFile, imageSave, doCrop} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={CustomStyle.img}/>);
    }
	
    return (
	
      <div id="divMain" key="divMain">
			{$imagePreview === null && !noFile ? 
				[
					<div key="file" className="filebrowse">
						<label className="title">Choose a file to upload</label>
						<input type="file" accept="image/*" className="fileinput" onChange={this._handleImageChange} />
					</div>
				] : null }
				
				{hasError ? (<div key="error" style={CustomStyle.errorMsg}>{errorMsg}</div>) : (!doCrop ? $imagePreview : 
				(
					 <ImageCropper key="imgcropper"
						 imagePreviewUrl={this.state.imagePreviewUrl} cropImageCallc={this.cropImageCall} cropImageSetCall={this.cropImageSetCall}
						  />
				))
				}
				<div key="msg"><label>{noFile ? ('No image uploaded') : imageSave ? ('Image uploaded') : ''}</label></div>
				
				<div key="bbuttons" style={CustomStyle.buttons}>
				
				{!doCrop? <button key="btnks" onClick={this.saveImageCall}>Save</button> : null}
				
				{$imagePreview !== null && !doCrop ? <button key="btnkc" onClick={this.cropImageCall}>Crop</button> : null}
				
				{imageSave ? <button key="btnkp" onClick={this.imagePrintCall}>Print Preview</button> : null}

				{!doCrop ? <button key="btnkcl" onClick={this.clearValues}>cancel</button> : null}
				
				</div>
				
      </div>
    )
  }

}