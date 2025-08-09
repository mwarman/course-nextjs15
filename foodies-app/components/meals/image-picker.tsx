'use client';

import Image from 'next/image';
import classes from './image-picker.module.css';
import { useRef, useState } from 'react';

export interface ImagePickerProps {
  label: string;
  name?: string;
}

const ImagePicker = ({ label, name = 'image' }: ImagePickerProps) => {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // You can handle the file data here if needed
        setImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image && <p>No image selected</p>}
          {image && <Image src={image} alt="Selected image" fill />}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          className={classes.input}
          ref={inputRef}
          onChange={handleImageChange}
          required
        />
        <button type="button" className={classes.button} onClick={handleButtonClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
