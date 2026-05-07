// Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Accept various phone formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
};

export const validateRequired = (value: string | undefined | null): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export const validateContactForm = (data: {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateRequired(data.name)) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (!validateMinLength(data.name || '', 2)) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (!validateMaxLength(data.name || '', 100)) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email || '')) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!validateRequired(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone is required' });
  } else if (!validatePhone(data.phone || '')) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  if (!validateRequired(data.subject)) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (!validateMinLength(data.subject || '', 3)) {
    errors.push({ field: 'subject', message: 'Subject must be at least 3 characters' });
  }

  if (!validateRequired(data.message)) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (!validateMinLength(data.message || '', 10)) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (!validateMaxLength(data.message || '', 5000)) {
    errors.push({ field: 'message', message: 'Message must be less than 5000 characters' });
  }

  return errors;
};

export const validateImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  } catch {
    return false;
  }
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};
