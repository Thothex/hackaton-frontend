import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from 'react-modal';

const ImageCropper = ({ file, crop, completedCrop, setCompletedCrop, onClose, setCroppedImageUrl }) => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const onLoad = (img) => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
        if (completedCrop && crop.width && crop.height) {
            const canvas = document.createElement('canvas');
            const scaleX = imageSize.width / file.width;
            const scaleY = imageSize.height / file.height;
            const ctx = canvas.getContext('2d');

            canvas.width = crop.width;
            canvas.height = crop.height;

            ctx.drawImage(
                file,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL('image/jpeg');
            setCroppedImageUrl(base64Image);
        }
    };

    return (
        <Modal
            isOpen={!!file}
            onRequestClose={onClose}
            contentLabel="Crop Image Modal"
        >
            <ReactCrop
                src={file ? URL.createObjectURL(file) : null}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(newCrop) => setCompletedCrop(newCrop)}
                onComplete={(crop) => handleCropComplete(crop)}
                minWidth={350}
                minHeight={200}
                maxWidth={imageSize.width}
                maxHeight={imageSize.height}
            />
            <button onClick={onClose}>Закрыть</button>
        </Modal>
    );
};

export default ImageCropper;
