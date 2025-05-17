import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";
import styles from "./UploadModal.module.scss";
import CustomButton from "../CustomButton/CustomButton";
import uploadIcon from "../../assets/icons/uploadIcon.svg";
import uploadIconLoading from "../../assets/icons/uploadIconLoading.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (image: string) => void;
};

const UploadModal: React.FC<Props> = ({ isOpen, onClose, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0);
      simulateUpload(selectedFile);
    }
  };

  const simulateUpload = (file: File) => {
    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 5;
      setProgress(progressVal);

      if (progressVal >= 100) {
        clearInterval(interval);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result as string);
          setIsCropping(true);
        };
        reader.readAsDataURL(file);
      }
    }, 100);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setProgress(0);
      simulateUpload(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async () => {
    try {
      if (!imageData || !croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageData, croppedAreaPixels);
      onUpload(croppedImage);
      onClose();
    } catch (e) {
      console.error("Crop failed:", e);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setImageData(null);
    setProgress(0);
    setIsCropping(false);
    onClose();
  };

  return isOpen ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Upload photo</h2>
        <p className={styles.description}>
          Upload and attach files for your profile
        </p>

        {!imageData && (
          <div
            className={styles.dropZone}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <img src={uploadIcon} alt="uploadIcon" />
            <p>Click to upload or drag and drop here...</p>
            <p className={styles.sub}>Max file size 30Mb</p>
          </div>
        )}

        {file && !isCropping && (
          <div className={styles.filePreview}>
            <div className={styles.iconWrapper}>
              <img src={uploadIconLoading} alt="uploadIcon" />
            </div>
            <div className={styles.fileInfo}>
              <p className={styles.fileName}>{file.name}</p>
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className={styles.progressText}>{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {isCropping && imageData && (
          <>
            <div className={styles.cropContainer}>
              <div className={styles.cropper}>
                <Cropper
                  image={imageData}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className={styles.zoomSlider}
              />
            </div>

            <div className={styles.avatarPreview}>
              <img src={imageData} alt="Avatar preview" />
            </div>
          </>
        )}

        <div className={styles.buttons}>
          <CustomButton text="Cancel" onClick={handleCancel} />
          <CustomButton
            text="Upload"
            buttonColor="#222222"
            textColor="#fff"
            onClick={showCroppedImage}
            style={{
              opacity: isCropping ? 1 : 0.5,
              pointerEvents: isCropping ? "auto" : "none",
            }}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default UploadModal;
