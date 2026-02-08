import { useState } from "react";

function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Simpan data user ke localStorage (sementara sebelum pakai JWT/Context)
        localStorage.setItem("user", JSON.stringify(data.user));
        onLoginSuccess(data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(`Gagal terhubung ke server: ${err.message}`);
    }
  };

  return (
    <div className="w-72 rounded border border-gray-100 bg-white p-4 shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3 className="text-center text-lg font-bold text-gray-800">
          Masuk ke Astra
        </h3>

        {error && (
          <p className="rounded bg-red-50 p-2 text-center text-xs text-red-500">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="nama@email.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-600"
        >
          Sign In
        </button>

        <p className="text-center text-xs text-gray-500">
          Belum punya akun?
          <span
            onClick={onSwitchToRegister} // Pastikan prop ini dipanggil!
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Daftar
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
