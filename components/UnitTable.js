import React, { useState } from 'react';

export default function UnitTable() {
  const [units, setUnits] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // إضافة سطر جديد
  const addRow = () => {
    setUnits([...units, { name: '', code: '', status: '', location: '' }]);
  };

  // تحديث بيانات الصف
  const updateRow = (index, key, value) => {
    const updated = [...units];
    updated[index][key] = value;
    setUnits(updated);
  };

  // استخراج النتيجة
  const extractResult = () => {
    let formatted = "📌 استلام العمليات 📌\n\n";
    units.forEach(u => {
      if (u.name && u.code) {
        const status = u.status ? ` (${u.status})` : '';
        const location = u.location ? ` - (${u.location})` : '';
        formatted += `${u.name} ${u.code}${status}${location}\n`;
      }
    });
    setResult(formatted);
    navigator.clipboard.writeText(formatted);
    alert("✅ تم نسخ النتيجة!");
  };

  // رفع صورة
  const handleUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    alert("📸 جارٍ قراءة الصورة (محاكاة)");
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* الأزرار */}
      <div className="flex gap-3">
        <button onClick={addRow}>➕ إضافة سطر</button>
        <button onClick={extractResult}>📋 استخراج ونسخ</button>
        <label className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded cursor-pointer">
          📤 رفع صورة
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* الجدول */}
      <table className="w-full text-sm bg-gray-900/80 rounded-lg border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-blue-300">
            <th>الاسم</th>
            <th>الكود</th>
            <th>الحالة</th>
            <th>الموقع</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u, i) => (
            <tr key={i}>
              <td><input value={u.name} onChange={e => updateRow(i, 'name', e.target.value)} /></td>
              <td><input value={u.code} onChange={e => updateRow(i, 'code', e.target.value)} /></td>
              <td><input value={u.status} onChange={e => updateRow(i, 'status', e.target.value)} /></td>
              <td><input value={u.location} onChange={e => updateRow(i, 'location', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* النتيجة */}
      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded border border-blue-700">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      {loading && <p className="text-yellow-400">⏳ جارٍ المعالجة...</p>}
    </div>
  );
}
