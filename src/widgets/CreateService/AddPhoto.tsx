import { useEffect, useState } from "react";
import scss from "./AddPhoto.module.scss";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { RiDragMove2Fill, RiEdit2Fill, RiCloseFill } from "react-icons/ri";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "../../shared/ui/cropImage";

type ImageItem = {
  id: string;
  file: File;
  preview: string;
  croppedPreview?: string;
};

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const AddPhoto = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const generatePreviews = async (files: File[]) =>
    Promise.all(
      files.map(
        (file) =>
          new Promise<ImageItem>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: generateId(),
                file,
                preview: reader.result as string,
              });
            reader.readAsDataURL(file);
          })
      )
    );

  const saveImages = (imagesToSave: ImageItem[]) => {
    const data = imagesToSave.map((img) => ({
      id: img.id,
      file: img.file.name,
      preview: img.croppedPreview || img.preview,
    }));
    localStorage.setItem("objectDraft", JSON.stringify({ images: data }));
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = await generatePreviews(files);
    const updated = [...images, ...newPreviews].slice(0, 10);

    setImages(updated);
    if (newPreviews.length === 1) setEditingIndex(images.length);
    else saveImages(updated);
  };

  const handleSaveCrop = async () => {
    if (editingIndex === null || !croppedArea) return;

    try {
      const image = images[editingIndex];
      const croppedImage = await getCroppedImg(
        image.preview,
        croppedArea,
        rotation
      );
      const updated = [...images];
      updated[editingIndex] = { ...image, croppedPreview: croppedImage };

      setImages(updated);
      saveImages(updated);
      setEditingIndex(null);
    } catch (e) {
      console.error("Error cropping image", e);
    }
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    saveImages(updated);
    if (editingIndex === index) setEditingIndex(null);
    else if (editingIndex !== null && editingIndex > index)
      setEditingIndex(editingIndex - 1);
  };

  const handleDeleteAll = () => {
    setImages([]);
    localStorage.removeItem("objectDraft");
    setShowDeleteModal(false);
  };

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      const reordered = arrayMove(images, oldIndex, newIndex);

      setImages(reordered);
      saveImages(reordered);
      if (editingIndex === oldIndex) setEditingIndex(newIndex);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("objectDraft");
    if (stored)
      try {
        const { images } = JSON.parse(stored);
        if (Array.isArray(images))
          setImages(
            images.map((img: any) => ({
              id: generateId(),
              file: new File([], img.file),
              preview: img.preview,
              croppedPreview: img.preview,
            }))
          );
      } catch (e) {
        console.warn("Failed to load images from localStorage", e);
      }
  }, []);

  return (
    <div className="container">
      <div
        className={`${scss.AddPhoto} ${
          editingIndex !== null ? scss.editingActive : ""
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleAddImages}
          id="photo-input"
          hidden
        />
        <div className={scss.deleteAll}>
          <button onClick={() => setShowDeleteModal(true)}>Удалить всё</button>
        </div>
        {showDeleteModal && (
          <div className={scss.confirmationModal}>
            <div className={scss.modalContent}>
              <h3>Хотите удалить все фотографии?</h3>
              <p>
                Подтвердите удаление всех фотографий. После удаления они больше
                не будут доступны.
              </p>
              <div className={scss.modalButtons}>
                <button
                  className={scss.cancelButton}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Отменить
                </button>
                <button className={scss.deleteButton} onClick={handleDeleteAll}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        {editingIndex !== null && (
          <div className={scss.cropModal}>
            <div className={scss.cropArea}>
              <Cropper
                image={images[editingIndex].preview}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={(_, area) => setCroppedArea(area)}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>
            <div className={scss.controls}>
              <div className={scss.sliders}>
                <label>
                  Zoom{" "}
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(+e.target.value)}
                  />
                </label>
                <label>
                  Rotation{" "}
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e) => setRotation(+e.target.value)}
                  />
                </label>
              </div>
              <div className={scss.buttons}>
                <button
                  className={scss.cancel}
                  onClick={() => setEditingIndex(null)}
                >
                  Cancel
                </button>
                <button className={scss.save} onClick={handleSaveCrop}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={rectSortingStrategy}
          >
            <div className={scss.grid}>
              {images.map((img, i) => (
                <SortableImage
                  key={img.id}
                  id={img.id}
                  url={img.croppedPreview || img.preview}
                  onRemove={() => handleRemove(i)}
                  onEdit={() => setEditingIndex(i)}
                />
              ))}
              {images.length < 10 && (
                <label htmlFor="photo-input" className={scss.addButton}>
                  +
                </label>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

const SortableImage = ({ id, url, onRemove, onEdit }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={scss.imageCard}
    >
      <div className={scss.image} style={{ backgroundImage: `url(${url})` }}>
        <RiDragMove2Fill
          className={scss.dragHandle}
          {...attributes}
          {...listeners}
        />
        <div className={scss.actions}>
          <RiEdit2Fill className={scss.editBtn} onClick={onEdit} />
          <RiCloseFill className={scss.removeBtn} onClick={onRemove} />
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
