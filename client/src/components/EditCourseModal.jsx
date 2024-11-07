import React, { useState } from "react";

const EditCourseModal = ({ course, onClose, onUpdate, showAlert }) => {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    price: course.price,
    image: course.image || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 基本表單驗證
    if (!formData.title.trim()) {
      showAlert("驗證錯誤", "課程標題不能為空", "error", 1500);
      return;
    }
    if (!formData.description.trim()) {
      showAlert("驗證錯誤", "課程描述不能為空", "error", 1500);
      return;
    }
    if (formData.price < 0) {
      showAlert("驗證錯誤", "課程價格不能為負數", "error", 1500);
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate(course._id, formData);
      showAlert("更新成功", "課程資訊已成功更新", "elegant", 1500);
      onClose();
    } catch (error) {
      showAlert(
        "更新失敗",
        error.message || "更新課程時發生錯誤",
        "error",
        1500
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">編輯課程</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isSubmitting}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">課程標題 *</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength="50"
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">課程描述 *</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  maxLength="500"
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">課程價格 *</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">課程圖片URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="請輸入圖片URL"
                  disabled={isSubmitting}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "更新中..." : "更新"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
