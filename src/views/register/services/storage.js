/* App modules */
import { getStorageItem, setStorageItem, removeStorageItem } from '../../../shared/services/localStorage';

export const getFormData = key => JSON.parse(getStorageItem(key));

export const saveFormData = (key, formData) => setStorageItem(key, JSON.stringify(formData));

export const removeFormData = keys => keys.map(key => removeStorageItem(key));
