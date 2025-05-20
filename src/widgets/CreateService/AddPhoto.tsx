import { useFormContext } from "react-hook-form";
import { useState } from "react";
import scss from "./AddPhoto.module.scss";

const AddPhoto = () => {
  const { setValue, watch } = useFormContext();
  const images: File[] = watch("images") || [];
  const [previews, setPreviews] = useState<string[]>([]);

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 5); // максимум 5 изображений (1 большое + 4 маленьких)

    setValue("images", newImages);
    generatePreviews(newImages);
  };

  const generatePreviews = (files: File[]) => {
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setValue("images", newImages);
    generatePreviews(newImages);
  };

  return (
    <div className={scss.AddPhoto}>
      <div className="container">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleAddImages}
          id="photo-input"
          style={{ display: "none" }}
        />

        <label htmlFor="photo-input" className={scss.photoGrid}>
          {/* Большой блок для выбора фото (всегда отображается) */}
          <div className={`${scss.photoBox} ${scss.large}`}>
            {previews.length > 0 ? (
              <div
                className={scss.previewImage}
                style={{ backgroundImage: `url(${previews[0]})` }}
              >
                <button
                  type="button"
                  className={scss.removeButton}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(0);
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <span>Photo +</span>
            )}
          </div>

          <div className={scss.smallGrid}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={`${scss.photoBox} ${scss.small}`}>
                  {previews.length > index + 1 ? (
                    <div
                      className={scss.previewImage}
                      style={{ backgroundImage: `url(${previews[index + 1]})` }}
                    >
                      <button
                        type="button"
                        className={scss.removeButton}
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(index + 1);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    previews.length === 0 && <span>+</span>
                  )}
                </div>
              ))}
          </div>
        </label>
      </div>
    </div>
  );
};

export default AddPhoto;
