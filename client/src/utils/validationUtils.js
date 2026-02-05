export const validateWithSchema = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (!error) return { isValid: true, errors: {}, value };

  const formattedErrors = {};
  error.details.forEach((detail) => {
    const key = detail.path[0];
    const message = detail.message || '此欄位填寫有誤'; // fallback 保底
    if (!formattedErrors[key]) {
      formattedErrors[key] = message;
    }
  });

  return { isValid: false, errors: formattedErrors, value };
};
