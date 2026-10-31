import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../Components/Navbar";

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500";
const labelCls = "block mb-1 font-medium text-sm";

export default function DoctorProfile() {
 const [form, setForm] = useState({
  specialization: "", qualification: "", experienceYears: "",
  consultationFee: "", availableTime: "", image: "",
  hospital: "", phone: "",
});
  const [info, setInfo] = useState({ name: "", email: "", isProfileComplete: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
 
  useEffect(() => {
    api
      .get("/doctor/profile")
      .then((res) => {
        const d = res.data;
        setInfo({ name: d.name, email: d.email, isProfileComplete: !!d.isProfileComplete });
        setForm({
          specialization: d.specialization || "",
          qualification: d.qualification || "",
          experienceYears: d.experience ? parseInt(d.experience, 10) || 0 : "",
          consultationFee: d.consultationFee || "",
          availableTime: d.availableTime || "",
          image: d.image || "",
          hospital: d.hospital || "",
phone: d.phone || "",
        });
      })
      .catch((e) => setError(e.response?.data?.message || "Profile load nahi ho paya"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setSaved(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const res = await api.put("/doctor/profile", form);
      setInfo((p) => ({ ...p, isProfileComplete: !!res.data.isProfileComplete }));
      setSaved(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data?.message || "Save nahi ho paya, dobara try karo");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <p className="py-24 text-center">Loading...</p>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto px-4 py-8 max-w-2xl">
          <h1 className="font-bold text-3xl">🩺 Meri Doctor Profile</h1>
          <p className="mt-1 text-gray-500 text-sm">
            {info.name} · {info.email}
          </p>

          {info.isProfileComplete ? (
            <p className="bg-green-50 mt-4 p-3 border border-green-200 rounded-lg text-green-700 text-sm">
              ✅ Profile poori hai. Patients aapko Doctors list mein dekh sakte hain.
            </p>
          ) : (
            <p className="bg-amber-50 mt-4 p-3 border border-amber-200 rounded-lg text-amber-800 text-sm">
              ⚠️ Profile abhi adhuri hai. Neeche sab fields bharo, tabhi patients aapko Doctors list mein dekhenge.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-md mt-6 p-6 rounded-2xl">
            {error && (
              <p role="alert" className="bg-red-50 p-3 rounded-lg text-red-600 text-sm">{error}</p>
            )}
            {saved && (
              <p role="status" className="bg-green-50 p-3 rounded-lg text-green-700 text-sm">
                ✅ Profile save ho gayi
              </p>
            )}

            <div>
              <label htmlFor="specialization" className={labelCls}>Specialization</label>
              <input
                id="specialization" name="specialization" required maxLength={60}
                value={form.specialization} onChange={handleChange}
                placeholder="Jaise Cardiologist" className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="qualification" className={labelCls}>Qualification</label>
              <input
                id="qualification" name="qualification" required maxLength={100}
                value={form.qualification} onChange={handleChange}
                placeholder="Jaise MBBS, MD" className={inputCls}
              />
            </div>

            <div className="gap-4 grid sm:grid-cols-2">
              <div>
                <label htmlFor="experienceYears" className={labelCls}>Experience (saal)</label>
                <input
                  id="experienceYears" name="experienceYears" type="number" min="0" max="70" required
                  value={form.experienceYears} onChange={handleChange} className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="consultationFee" className={labelCls}>Consultation fee (₹)</label>
                <input
                  id="consultationFee" name="consultationFee" type="number" min="1" max="100000" required
                  value={form.consultationFee} onChange={handleChange} className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="availableTime" className={labelCls}>Available timing</label>

              <input
                id="availableTime" name="availableTime" required maxLength={80}
                value={form.availableTime} onChange={handleChange}
                placeholder="Mon-Sat, 10:00 AM - 5:00 PM" className={inputCls}
              />

              <div className="gap-4 grid sm:grid-cols-2">
  <div>
    <label htmlFor="hospital" className={labelCls}>Hospital / Clinic (optional)</label>
    <input
      id="hospital" name="hospital" maxLength={100}
      value={form.hospital} onChange={handleChange} className={inputCls}
    />
  </div>
  <div>
    <label htmlFor="phone" className={labelCls}>Phone (optional)</label>
    <input
      id="phone" name="phone" inputMode="numeric" maxLength={15}
      value={form.phone} onChange={handleChange}
      placeholder="10 digit mobile number" className={inputCls}
    />
  </div>
</div>
            </div>

            <div>
              <label htmlFor="image" className={labelCls}>Photo ka link (optional)</label>
              <input
                id="image" name="image" type="url"
                value={form.image} onChange={handleChange}
                placeholder="https://..." className={inputCls}
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  onError={(e) => (e.target.style.display = "none")}
                  className="mt-3 rounded-lg w-24 h-24 object-cover"
                />
              )}
            </div>

            <button
              type="submit" disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 py-3 rounded-lg w-full font-semibold text-white transition"
            >
              {saving ? "Save ho raha hai..." : "Profile save karo"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
