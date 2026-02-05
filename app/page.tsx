"use client";
import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(false);

  const jalankanAI = async () => {
    if (!text) return alert("Isi materinya dulu!");
    setLoading(true);
    try {
      const res = await fetch('/api/generate-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: text }),
      });
      const data = await res.json();
      setScenes(data.scenes || []);
    } catch (e) {
      alert("Terjadi kesalahan koneksi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f9ff', minHeight: '100vh', color: '#333' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#0369a1', margin: '0' }}>🩺 HealthEdu AI</h2>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Edukasi Kesehatan Reproduksi</p>
      </header>
      
      <textarea 
        style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '12px', border: '2px solid #bae6fd', fontSize: '16px', boxSizing: 'border-box' }}
        placeholder="Contoh: Jelaskan pentingnya menjaga kebersihan saat pubertas..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button 
        onClick={jalankanAI}
        disabled={loading}
        style={{ width: '100%', padding: '15px', marginTop: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? "⌛ Sedang Memproses..." : "✨ Buat Skrip Video"}
      </button>

      <div style={{ marginTop: '25px' }}>
        {scenes.map((s, i) => (
          <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderLeft: '6px solid #0ea5e9' }}>
            <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>Adegan {i+1}</span>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>{s.text}</p>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '8px' }}>
              <i style={{ fontSize: '12px', color: '#64748b' }}>🎬 Visual: {s.visual}</i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
