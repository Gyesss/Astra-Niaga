import { useState } from "react";

function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const usernameRegex = /^[a-z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setMessage({
        type: "error",
        text: "Username hanya boleh huruf kecil, angka, dan underscore (_).",
      });
      return; // Berhenti di sini, jangan kirim ke server
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setTimeout(() => onSwitchToLogin(), 2000); // Pindah ke login setelah 2 detik
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: `Gagal terhubung ke server: ${err.message}`,
      });
    }
  };

  return (
    <div className="w-72 rounded border border-gray-100 bg-white p-4 shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h3 className="text-center text-lg font-bold text-gray-800">
          Daftar Astra-Niaga
        </h3>

        {message.text && (
          <p
            className={`rounded p-2 text-center text-xs ${
              message.type === "success"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            required
            className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <p className="text-[10px] text-blue-500 italic">
            *Huruf kecil, angka, dan underscore (_).
          </p>
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            required
            className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            required
            className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 py-2 font-bold text-white transition-all hover:bg-blue-600"
        >
          Daftar Sekarang
        </button>

        <p className="text-center text-xs text-gray-500">
          Sudah punya akun?{" "}
          <span
            onClick={onSwitchToLogin}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
