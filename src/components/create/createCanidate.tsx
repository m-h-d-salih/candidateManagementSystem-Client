import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import api from '../../axios/axios';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface CreateCandidateProps {
  onClose: () => void;
  onSubmit: (newUser: any) => void;
}
interface Candidate{
  name: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

const CreateCandidate: React.FC<CreateCandidateProps> = ({ onClose, onSubmit }) => {
  const createACandidate = async (body: Candidate): Promise<any> => {
    const response: AxiosResponse<any> = await api.post(`/admin/candidate`, body);
    return response.data;
  };
  const mutation = useMutation( {mutationFn:createACandidate,
    onSuccess: (data: any) => {
      // console.log(data)
      // alert("Successfully Created Candidate");
      // onSubmit(data);
      toast.success("Successfully Created Candidate");
    },
    onError: (error: any) => {
      const {message}=error.response.data;
      toast.error(message);
      // console.error( message);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be a 10-digit number')
        .required('Phone is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      // onSubmit(values);
      // console.log(values)
      // formik.resetForm();
      mutation.mutate(values)
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Create Candidate</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <form onSubmit={formik.handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full px-3 py-2 border rounded"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs">{formik.errors.name}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className="w-full px-3 py-2 border rounded"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-xs">{formik.errors.address}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="w-full px-3 py-2 border rounded"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full px-3 py-2 border rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full px-3 py-2 border rounded"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
