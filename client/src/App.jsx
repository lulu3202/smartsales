import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

// Common BNS sections for quick selection
const commonCharges = [
  { section: '103', description: 'Murder', type: 'BNS' },
  { section: '115', description: 'Voluntarily causing hurt', type: 'BNS' },
  { section: '303', description: 'Theft', type: 'BNS' },
  { section: '308', description: 'Extortion', type: 'BNS' },
  { section: '318', description: 'Cheating', type: 'BNS' },
  { section: '351', description: 'Criminal intimidation', type: 'BNS' },
  { section: '64', description: 'Rape', type: 'BNS' },
  { section: '79', description: 'Dowry death', type: 'BNS' }
];

function App() {
  const [selectedCharges, setSelectedCharges] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      caseNumber: `FIR/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000)}`,
      policeStation: '',
      district: '',
      complainant: {
        name: '',
        fatherName: '',
        age: '',
        address: '',
        phone: ''
      },
      incident: {
        date: new Date().toISOString().split('T')[0],
        time: '',
        place: '',
        description: ''
      },
      accused: {
        name: '',
        age: '',
        address: ''
      }
    }
  });

  const addCharge = (charge) => {
    if (!selectedCharges.find(c => c.section === charge.section)) {
      setSelectedCharges([...selectedCharges, charge]);
    }
  };

  const removeCharge = (section) => {
    setSelectedCharges(selectedCharges.filter(c => c.section !== section));
  };

  const onSubmit = async (data) => {
    if (selectedCharges.length === 0) {
      alert('Please select at least one charge');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-fir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          charges: selectedCharges
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FIR_${data.caseNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to generate FIR. Please check if server is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              FIR Charge Sheet Generator
            </h1>
            <p className="text-gray-600">Generate First Information Report under BNS 2023</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Details */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Basic Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FIR Number *
                  </label>
                  <input
                    {...register('caseNumber', { required: 'FIR number is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.caseNumber && <p className="text-red-500 text-sm mt-1">{errors.caseNumber.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Police Station *
                  </label>
                  <input
                    {...register('policeStation', { required: 'Police station is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.policeStation && <p className="text-red-500 text-sm mt-1">{errors.policeStation.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District *
                  </label>
                  <input
                    {...register('district', { required: 'District is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                </div>
              </div>
            </div>

            {/* Complainant Details */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-900">Complainant Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...register('complainant.name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.complainant?.name && <p className="text-red-500 text-sm mt-1">{errors.complainant.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    {...register('complainant.fatherName', { required: 'Father\'s name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.complainant?.fatherName && <p className="text-red-500 text-sm mt-1">{errors.complainant.fatherName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    {...register('complainant.age', { 
                      required: 'Age is required',
                      min: { value: 1, message: 'Age must be at least 1' },
                      max: { value: 120, message: 'Age must be less than 120' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.complainant?.age && <p className="text-red-500 text-sm mt-1">{errors.complainant.age.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    {...register('complainant.phone', { 
                      required: 'Phone number is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.complainant?.phone && <p className="text-red-500 text-sm mt-1">{errors.complainant.phone.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    {...register('complainant.address', { required: 'Address is required' })}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.complainant?.address && <p className="text-red-500 text-sm mt-1">{errors.complainant.address.message}</p>}
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-yellow-900">Incident Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    {...register('incident.date', { required: 'Date is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {errors.incident?.date && <p className="text-red-500 text-sm mt-1">{errors.incident.date.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    {...register('incident.time', { required: 'Time is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {errors.incident?.time && <p className="text-red-500 text-sm mt-1">{errors.incident.time.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Place of Occurrence *
                  </label>
                  <input
                    {...register('incident.place', { required: 'Place is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {errors.incident?.place && <p className="text-red-500 text-sm mt-1">{errors.incident.place.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description of Incident *
                  </label>
                  <textarea
                    {...register('incident.description', { required: 'Description is required' })}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Provide detailed description of the incident..."
                  />
                  {errors.incident?.description && <p className="text-red-500 text-sm mt-1">{errors.incident.description.message}</p>}
                </div>
              </div>
            </div>

            {/* Accused Details */}
            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-red-900">Accused Details (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    {...register('accused.name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Unknown if not identified"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    {...register('accused.age')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Unknown if not identified"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    {...register('accused.address')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Unknown if not identified"
                  />
                </div>
              </div>
            </div>

            {/* Charges Selection */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-purple-900">BNS Charges *</h2>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Common Charges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {commonCharges.map((charge) => (
                    <button
                      key={charge.section}
                      type="button"
                      onClick={() => addCharge(charge)}
                      className="text-left p-3 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
                    >
                      <span className="font-medium">BNS {charge.section}:</span> {charge.description}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCharges.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Selected Charges</h3>
                  <div className="space-y-2">
                    {selectedCharges.map((charge) => (
                      <div key={charge.section} className="flex items-center justify-between bg-white p-3 rounded-md border">
                        <span>
                          <strong>{charge.type} {charge.section}:</strong> {charge.description}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeCharge(charge.section)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                {isGenerating ? 'Generating FIR...' : 'Generate FIR PDF'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;