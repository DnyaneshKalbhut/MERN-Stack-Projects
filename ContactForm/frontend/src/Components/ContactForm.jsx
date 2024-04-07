import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error submitting form');
            }
            
        } catch (err) {
          console.log(err)
        }
    };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-5 mb-4">
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your Name"
            name="name"
            value={name}
            onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChange}
        />
    </div>
    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
             Message
        </label>
        <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Your Message"
            name="message"
            value={message}
            onChange={handleChange}
        ></textarea>
    </div>
    <div className="flex items-center justify-between">
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Submit
        </button>
    </div>
</form>

  );
};

export default ContactForm;
