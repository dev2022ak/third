// File: app/page.tsx (Form Page)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    age: '',
    gender: '',
    comments: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    age: '',
    gender: '',
  });

  const validate = () => {
    const newErrors: any = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';

    const ageNum = parseInt(form.age);
    if (!form.age || isNaN(ageNum)) newErrors.age = 'Age is required';
    else if (ageNum < 10 || ageNum > 100) newErrors.age = 'Age must be between 10 and 100';

    if (!form.gender) newErrors.gender = 'Please select a gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const params = new URLSearchParams(form);
      toast.success('Form submitted successfully!');
      setTimeout(() => router.push(`/success?${params.toString()}`), 1000);
    } else {
      toast.error('Please fix the errors before submitting');
    }
  };

  const handleReset = () => {
    setForm({ fullName: '', email: '', age: '', gender: '', comments: '' });
    setErrors({ fullName: '', email: '', age: '', gender: '' });
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label>Comments</label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          <button type="button" onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
        </div>
      </form>
      <ToastContainer />
    </main>
  );
}
