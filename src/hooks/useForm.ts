import { useState, useCallback } from 'react';
import { ValidationError } from '../utils/validation';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => ValidationError[];
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  loading: boolean;
  success: boolean;
  successMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: (field: keyof T, value: unknown) => void;
  setFieldError: (field: string, error: string) => void;
  resetForm: () => void;
  clearSuccess: () => void;
}

export function useForm<T extends Record<string, unknown>>(options: UseFormOptions<T>): UseFormReturn<T> {
  const { initialValues, onSubmit, validate } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Validate
      if (validate) {
        const validationErrors = validate(values);
        if (validationErrors.length > 0) {
          const errorMap: Record<string, string> = {};
          validationErrors.forEach(err => {
            errorMap[err.field] = err.message;
          });
          setErrors(errorMap);
          setLoading(false);
          return;
        }
      }

      // Clear errors on successful validation
      setErrors({});

      // Submit
      await onSubmit(values);
      setSuccess(true);
      setSuccessMessage('Form submitted successfully!');
      setValues(initialValues);
      setTouched({});
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  }, [values, initialValues, validate, onSubmit]);

  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSuccess(false);
    setSuccessMessage('');
  }, [initialValues]);

  const clearSuccess = useCallback(() => {
    setSuccess(false);
    setSuccessMessage('');
  }, []);

  return {
    values,
    errors,
    touched,
    loading,
    success,
    successMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    clearSuccess,
  };
}
