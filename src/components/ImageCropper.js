import React from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';

export default class ImageCropper extends React.Component{
	  
	ImageCrop(){
    this.props.cropImageSetCall(this.refs.cropper.getCroppedCanvas().toDataURL())
  }

  render() {
    return [
	
      <div key="ccropper">
		  <Cropper
			ref='cropper'
			src={this.props.imagePreviewUrl}
			style={{height: 400, width: '800px', margin: '0 auto'}}
			aspectRatio={1 / 1}
			guides={true}
			/>
		</div>,
		
		
		<div key="buttons" style={{padding: '20px'}}>
			 <button key="btnd" onClick={() => this.ImageCrop()}>Crop Image</button>
			 <button key="btnkcr" onClick={this.props.cropImageCallc}>Cancel</button>
		</div>
    ]
  }
}