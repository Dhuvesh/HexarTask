import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../component/Banner';
import About from '../component/About';
import Mission from '../component/Mission';

const API_URL = 'https://hexartask.onrender.com/api';

export default function Home() {
  // Initialize banner as an empty array
  const [data, setData] = useState({ banner: [], about: null, mission: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b, a, m] = await Promise.all([
          axios.get(`${API_URL}/banner`),
          axios.get(`${API_URL}/about`),
          axios.get(`${API_URL}/mission`)
        ]);

        setData({ 
          // 1. Banners: Filter for ALL active banners (for the slider)
          banner: Array.isArray(b.data) ? b.data : (b.data ? [b.data] : []), 
          
          // 2. About/Mission: Find the ONE item that is active
          about: Array.isArray(a.data) 
            ? a.data.find(item => item.isActive) || a.data[0] // Fallback to first if none active
            : a.data, 

          mission: Array.isArray(m.data) 
            ? m.data.find(item => item.isActive) || m.data[0] 
            : m.data 
        });

      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-xl">Loading Hexar...</div>;
  }

  return (
    <main>
      {/* Banner receives the full array of data to map through the slider */}
      <Banner data={data.banner} />
      
      {/* About and Mission safely receive a single object OR null */}
      <About data={data.about} />
      <Mission data={data.mission} />
    </main>
  );
}