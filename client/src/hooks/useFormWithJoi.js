// 📁 src/hooks/useFormWithJoi.js
import { useState } from "react";
import { validateWithSchema } from "../utils/validationUtils";

const useFormWithJoi = (initialValues, schema) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const { isValid, errors } = validateWithSchema(schema, formData);
    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    validateForm,
    resetForm,
  };
};

export default useFormWithJoi;
