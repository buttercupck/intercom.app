import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function Court() {
  const [court, setCourt] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('court').select('*')
      if (error) {
        console.error('Error fetching court:', error)
      } else {
        setCourt(data)
      }
    }

    fetchData()
  }, [])

  return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Courts Table</h2>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-left">Zoom Link</th>
            </tr>
          </thead>
          <tbody>
            {court.map((court) => (
              <tr key={court.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{court.id}</td>
                <td className="border px-4 py-2">{court.name}</td>
                <td className="border px-4 py-2">{court.location}</td>
                <td className="border px-4 py-2 text-blue-600 underline">
                  <a href={court.zoom_url} target="_blank" rel="noopener noreferrer">
                    Join Zoom
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default Court