import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { readFile, cropImageData } from "../../main/helpers";

export default function PhotoCrop() {

  const [imageSrc, setImageSrc] = useState(null); // file data
  const [fileName, setFileName] = useState(null); // file address
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleSave = async () => {
    // save cropped img
    if(croppedAreaPixels && imageSrc) {
      // need the base64data
      const base64data = await cropImageData(imageSrc, croppedAreaPixels);
      const newFileName = fileName + "-cropped.png";
      window.electron.saveCroppedImage([newFileName, base64data]);
      // then reset for the next photo
      setImageSrc(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    }
  }

  const onCropComplete = useCallback((croppedArea: Area, currentCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const handleFileChange = async (e: any) => {
    if(e.target.files && e.target.files.length) {
      // we got a file...
      const file = e.target.files[0];
      setFileName(file.path);
      // get the img data from file...
      const imageData: any = await readFile(file);
      setImageSrc(imageData);
    }
  };
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
        onCropComplete={onCropComplete}
        />
        <button className="save-btn" onClick={handleSave}>Save</button>
    </>
  )
};
