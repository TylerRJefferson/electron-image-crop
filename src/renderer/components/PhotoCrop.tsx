import { useState } from "react";
import Cropper from "react-easy-crop";
import { readFile } from "../../main/helpers";

export default function PhotoCrop() {

  const [imageSrc, setImageSrc] = useState(null); // file data
  const [fileName, setFileName] = useState(null); // file address
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFileChange = async (e: any) => {
    if(e.target.files && e.target.files.length) {
      // we got a file...
      const file = e.target.files[0]
      setFileName(file.path)
      // get the img data from file...
      const imageData: any = await readFile(file);
      setImageSrc(imageData);
    }
  }
  if(!imageSrc) {
    return (
      <>
        <h1>Please choose a photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange}/>
      </>
    )
  }
  return(
    <>
      <Cropper
        image={imageSrc} 
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        />
    </>
  )
};
