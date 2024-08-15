import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  title: string;
  formData: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, formData }) => {
  const [localFormData, setLocalFormData] = React.useState(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localFormData);
  };

  React.useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-[40%] p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(localFormData).map(key => (
            <label key={key} className="block mb-4">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <Input
                type="text"
                name={key}
                value={localFormData[key]}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-2"
              />
            </label>
          ))}
          <div className="flex justify-end space-x-2">
            <Button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</Button>
            <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
