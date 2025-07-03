import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Cropper, { type Area } from "react-easy-crop";
import { RiDragMove2Fill, RiEdit2Fill, RiCloseFill } from "react-icons/ri";
import { getCroppedImg } from "../../shared/ui/cropImage";
import scss from "./AddPhoto.module.scss";
import type { FormData } from "@/pages/CreateService/CreateService";

type ImageItem = FormData["photos"][0];

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

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

const AddPhoto = () => {
  const { watch, setValue, getValues } = useFormContext<FormData>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const sensors = useSensors(useSensor(PointerSensor));
  const images = watch("photos");

  const generatePreviews = useCallback(async (files: File[]) => {
    return Promise.all(
      files.map((file) => {
        const reader = new FileReader();
        return new Promise<ImageItem>((resolve) => {
          reader.onload = () =>
            resolve({
              id: generateId(),
              file,
              preview: reader.result as string,
            });
          reader.readAsDataURL(file);
        });
      })
    );
  }, []);

  const handleAddImages = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      const newPreviews = await generatePreviews(files);
      const currentPhotos = getValues("photos");
      const updated = [...currentPhotos, ...newPreviews].slice(0, 10);

      setValue("photos", updated);

      if (newPreviews.length > 0) {
        setEditingIndex(currentPhotos.length);
      }
    },
    [generatePreviews, getValues, setValue]
  );

  const handleSaveCrop = useCallback(async () => {
    if (editingIndex === null || !croppedArea) return;

    try {
      const image = getValues("photos")[editingIndex];
      const croppedImage = await getCroppedImg(
        image.preview,
        croppedArea,
        rotation
      );
      const updated = [...getValues("photos")];
      updated[editingIndex] = { ...image, croppedPreview: croppedImage };
      setValue("photos", updated);
      setEditingIndex(null);
    } catch (e) {
      console.error("Error cropping image", e);
    }
  }, [editingIndex, croppedArea, getValues, rotation, setValue]);

  const handleRemove = useCallback(
    (index: number) => {
      const updated = getValues("photos").filter((_, i) => i !== index);
      setValue("photos", updated);
      if (editingIndex === index) setEditingIndex(null);
      else if (editingIndex !== null && editingIndex > index)
        setEditingIndex(editingIndex - 1);
    },
    [editingIndex, getValues, setValue]
  );

  const handleDeleteAll = useCallback(() => {
    setValue("photos", []);
    setShowDeleteModal(false);
  }, [setValue]);

  const handleDragEnd = useCallback(
    ({ active, over }: any) => {
      if (active.id !== over?.id) {
        const oldIndex = getValues("photos").findIndex(
          (img) => img.id === active.id
        );
        const newIndex = getValues("photos").findIndex(
          (img) => img.id === over.id
        );
        const reordered = arrayMove(getValues("photos"), oldIndex, newIndex);
        setValue("photos", reordered);
        if (editingIndex === oldIndex) setEditingIndex(newIndex);
      }
    },
    [editingIndex, getValues, setValue]
  );

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
          <button type="button" onClick={() => setShowDeleteModal(true)}>Удалить всё</button>
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
                  Zoom
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
                  Rotation
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

export default AddPhoto;
