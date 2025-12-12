import { Icon } from '../svg';
import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Button } from '.';

interface ImageProperties {
  zoom: number;
  rotation: number;
  croppedAreaPixels: Area;
}

interface ImageCropperProps {
  uploadedImage: string;
  setImageProperties: (props: any) => void;
}

const ImageCropper = ({
  uploadedImage,
  setImageProperties,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setImageProperties((prevVal: ImageProperties) => {
      if (
        prevVal.zoom !== zoom ||
        prevVal.rotation !== rotation ||
        prevVal.croppedAreaPixels !== croppedAreaPixels
      ) {
        return { zoom, rotation, croppedAreaPixels };
      }
      return prevVal;
    });
  }, [croppedAreaPixels, rotation, setImageProperties, zoom]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area): void => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomChange = (value: number) => {
    setZoom(value);
  };

  const handleZoomClick = (mode: string) => {
    if (mode === 'zoomin') {
      setZoom((prev) => {
        if (prev >= 3) return prev;
        return prev + 0.1;
      });
    } else {
      setZoom((prev) => {
        if (prev <= 1) return prev;
        return prev - 0.1;
      });
    }
  };

  const handleRotationChange = (direction: string) => {
    if (rotation >= 360 || rotation <= -360) setRotation(0);
    if (direction === 'left') setRotation((prev) => prev - 90);
    else setRotation((prev) => prev + 90);
  };

  return (
    <>
      <div className='crop-container'>
        <Cropper
          image={uploadedImage}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          cropShape='rect'
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
        />
      </div>

      <div className='control-container'>
        <div className='items-center'>
          <Button type='button' onClick={(e) => handleZoomClick('zoomout')}>
            <Icon name='zoom-out' />
            <div className='sr-only'>Zoom Out</div>
          </Button>
          <Button type='button' onClick={(e) => handleZoomClick('zoomin')}>
            <Icon name='zoom-in' />
            <div className='sr-only'>Zoom In</div>
          </Button>
        </div>
        <div className='zoom-slider'>
          <div className='form-control'>
            <label htmlFor='zoom' className='sr-only'>
              Zoom
            </label>
            <input
              type='range'
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby='Zoom'
              // onChange={(e, value) => handleZoomChange(value as number)}
              title='Slide to zoom in or out'
            />
          </div>
        </div>
        <div className='items-center'>
          <Button type='button' onClick={(e) => handleRotationChange('left')}>
            <Icon name='rotate-left' />
            <div className='sr-only'>Rotate Left</div>
          </Button>
          <Button type='button' onClick={(e) => handleRotationChange('right')}>
            <Icon name='rotate-right' />
            <div className='sr-only'>Rotate Right</div>
          </Button>
        </div>
      </div>
    </>
  );
};
export default ImageCropper;
