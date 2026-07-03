import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://hexartask.onrender.com/api";
const SERVER_URL = "https://hexartask.onrender.com";

const TABS = ["banner", "about", "mission"];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("banner");
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]); // Stores the list of all entries
  const [editId, setEditId] = useState(null); // Track if we are editing an existing item

  // Form States
  const [banner, setBanner] = useState({
    title: "",
    subtitle: "",
    ctaText: "",
    image: null,
  });
  const [about, setAbout] = useState({
    heading: "",
    description: "",
    stats: "",
    image: null,
  });
  const [mission, setMission] = useState({
    missionTitle: "",
    missionDescription: "",
    visionTitle: "",
    visionDescription: "",
    image: null,
  });

  const token = localStorage.getItem("token");
  
  // 1. Fetch ALL data for the list
  const fetchAllEntries = async () => {
    try {
      const res = await axios.get(`${API_URL}/${activeTab}`);
      let data = res.data;

      // Safety check: Ensure we only keep actual objects, not nulls
      if (Array.isArray(data)) {
        setListData(data.filter((item) => item !== null));
      } else if (data) {
        setListData([data]);
      } else {
        setListData([]);
      }
    } catch (err) {
      console.error("Error fetching list");
    }
  };

  useEffect(() => {
    if (token) fetchAllEntries();
  }, [activeTab]);

  // 2. Handle Edit (Fill form with past data)
  const handleEdit = (item) => {
    setEditId(item._id);
    if (activeTab === "banner")
      setBanner({
        title: item.title,
        subtitle: item.subtitle,
        ctaText: item.ctaText,
        image: null,
      });
    if (activeTab === "about")
      setAbout({
        heading: item.heading,
        description: item.description,
        stats: JSON.stringify(item.stats),
        image: null,
      });
    if (activeTab === "mission")
      setMission({
        missionTitle: item.missionTitle,
        missionDescription: item.missionDescription,
        visionTitle: item.visionTitle,
        visionDescription: item.visionDescription,
        image: null,
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`${API_URL}/${activeTab}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllEntries();
    } catch (err) {
      alert("Delete failed");
    }
  };
    const showActivateButton = activeTab !== "banner";
  const handleSetActive = async (id) => {
    try {
      // This sends a request to your backend to mark this ID as the active one
      await axios.patch(`${API_URL}/${activeTab}/activate/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Portal Updated Successfully!");
      fetchAllEntries(); 
    } catch (err) {
      alert("Failed to update portal. Make sure you added the backend route.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (activeTab === "banner") {
      formData.append("title", banner.title);
      formData.append("subtitle", banner.subtitle);
      formData.append("ctaText", banner.ctaText);
      if (banner.image) formData.append("image", banner.image);
    } else if (activeTab === "about") {
      formData.append("heading", about.heading);
      formData.append("description", about.description);
      formData.append("stats", about.stats);
      if (about.image) formData.append("image", about.image);
    } else if (activeTab === "mission") {
      formData.append("missionTitle", mission.missionTitle);
      formData.append("missionDescription", mission.missionDescription);
      formData.append("visionTitle", mission.visionTitle);
      formData.append("visionDescription", mission.visionDescription);
      if (mission.image) formData.append("image", mission.image);
    }

    try {
      const url = editId
        ? `${API_URL}/${activeTab}/${editId}`
        : `${API_URL}/${activeTab}`;
      const method = editId ? "put" : "post";

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Success!`);
      setEditId(null);
      setBanner({ title: "", subtitle: "", ctaText: "", image: null });
      setAbout({ heading: "", description: "", stats: "", image: null });
      setMission({
        missionTitle: "",
        missionDescription: "",
        visionTitle: "",
        visionDescription: "",
        image: null,
      });
      fetchAllEntries(); // Refresh list
    } catch (err) {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Hexar CMS Portal</h1>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="text-red-500 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-200 p-1 rounded-xl w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setEditId(null);
              }}
              className={`px-8 py-2 rounded-lg capitalize transition ${activeTab === tab ? "bg-white shadow text-blue-600" : "text-gray-500"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: FORM (40%) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-6">
              {editId ? "Edit Entry" : "Create New Entry"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "banner" && (
                <>
                  <Field label="Title">
                    <input
                      className={inp}
                      value={banner.title}
                      onChange={(e) =>
                        setBanner({ ...banner, title: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Subtitle">
                    <textarea
                      className={inp}
                      value={banner.subtitle}
                      onChange={(e) =>
                        setBanner({ ...banner, subtitle: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Button Text">
                    <input
                      className={inp}
                      value={banner.ctaText}
                      onChange={(e) =>
                        setBanner({ ...banner, ctaText: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Image">
                    <input
                      type="file"
                      onChange={(e) =>
                        setBanner({ ...banner, image: e.target.files[0] })
                      }
                    />
                  </Field>
                </>
              )}
              {activeTab === "about" && (
                <>
                  <Field label="Heading">
                    <input
                      className={inp}
                      value={about.heading}
                      onChange={(e) =>
                        setAbout({ ...about, heading: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      rows="5"
                      className={inp}
                      value={about.description}
                      onChange={(e) =>
                        setAbout({ ...about, description: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="About Image">
                    <input
                      type="file"
                      onChange={(e) =>
                        setAbout({ ...about, image: e.target.files[0] })
                      }
                    />
                  </Field>
                </>
              )}
              {activeTab === "mission" && (
                <>
                  <Field label="Mission Title">
                    <input
                      className={inp}
                      value={mission.missionTitle}
                      onChange={(e) =>
                        setMission({ ...mission, missionTitle: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Mission Desc">
                    <textarea
                      className={inp}
                      value={mission.missionDescription}
                      onChange={(e) =>
                        setMission({
                          ...mission,
                          missionDescription: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="Vision Title">
                    <input
                      className={inp}
                      value={mission.visionTitle}
                      onChange={(e) =>
                        setMission({ ...mission, visionTitle: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Vision Desc">
                    <textarea
                      className={inp}
                      value={mission.visionDescription}
                      onChange={(e) =>
                        setMission({
                          ...mission,
                          visionDescription: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="Image">
                    <input
                      type="file"
                      onChange={(e) =>
                        setMission({ ...mission, image: e.target.files[0] })
                      }
                    />
                  </Field>
                </>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold"
                >
                  {loading ? "Saving..." : editId ? "Update Item" : "Post New"}
                </button>
                {editId && (
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-200 px-4 rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT: LIST OF PAST DATA (70%) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Past Entries ({listData.length})
            </h2>

            {listData.length === 0 && (
              <p className="text-gray-400">No data found in this section.</p>
            )}

            {listData.map((item) => {
              // SAFETY: If item is null for some reason, skip it
              if (!item) return null;

              return (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start"
                >
                  {/* Preview Image - Added Optional Chaining ?. */}
                  <img
                    src={`${SERVER_URL}${item?.imageUrl || item?.backgroundImage || ""}`}
                    className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/100")
                    }
                  />

                  {/* Content Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-800">
                        {item?.title ||
                          item?.heading ||
                          item?.missionTitle ||
                          "Untitled"}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 text-sm font-semibold hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 text-sm font-semibold hover:underline"
                        >
                          Delete
                        </button>

                        {showActivateButton && !item.isActive && (
              <button
                onClick={() => handleSetActive(item._id)}
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition"
              >
                Set as Active
              </button>
            )}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {item?.subtitle ||
                        item?.description ||
                        item?.missionDescription}
                    </p>
                    {item?.visionTitle && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-[10px] text-blue-700">
                        <b>Vision:</b> {item.visionTitle}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const inp =
  "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none";
function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}
