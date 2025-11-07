import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Copy, CheckCircle, Info, ArrowLeft } from 'lucide-react';

const API_URL = 'https://hook.us2.make.com/krhoot7d1vkdghc02i127pz990rmtg8e';
const API_KEY = '4a0e9dd9-7a12-487b-94ae-e7dd07879714';
const FILLOUT_BASE_URL = 'https://drjuliaray.fillout.com/t/uxQBKJHWkyus';

function RecordsRequest() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    dob: '',
    requestingFrom: '',
    phone: '',
    fax: ''
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate URL whenever form data changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (formData.patientName.trim()) params.append('patientName', formData.patientName.trim());
    if (formData.dob.trim()) params.append('DOB', formData.dob.trim());
    if (formData.phone.trim()) params.append('phone', formData.phone.trim());
    if (formData.requestingFrom.trim()) params.append('requestingFrom', formData.requestingFrom.trim());
    if (formData.fax.trim()) params.append('fax', formData.fax.trim());
    
    // Always add allRecords=true
    params.append('allRecords', 'true');

    const url = `${FILLOUT_BASE_URL}${params.toString() ? '?' + params.toString() : ''}`;
    setGeneratedUrl(url);
  }, [formData]);

  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) {
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const response = await fetch(`${API_URL}?name=${encodeURIComponent(term)}`, {
        headers: {
          'x-make-apikey': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const results = await response.json();
      setSearchResults(results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search patients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({
      ...prev,
      patientName: patient['Full Name'] || '',
      dob: patient.DOB || ''
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = generatedUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-5 px-5">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>
          <h1 className="text-center text-gray-800 mb-6 text-3xl font-semibold">
            Medical Records Request
          </h1>
        </header>

        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 mb-5 shadow-sm border border-gray-200">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Search for patient in Airtable to auto-populate form fields
            </p>
          </div>
          
          <div className="flex gap-2.5 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for patient by name..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              autoComplete="off"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-5 py-2.5 border-none rounded-lg text-base font-medium cursor-pointer transition-all inline-flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 mb-5">
            {error}
          </div>
        )}

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {/* Left Column: Search Results */}
          <div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 max-h-[500px] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-3.5 text-gray-800">
                Search Results
              </h2>
              
              <div>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">
                    Searching...
                  </div>
                ) : searchResults.length === 0 && !loading ? (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-5xl mb-4">🔍</div>
                    <div className="text-base">
                      Search for a patient to see results here
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {searchResults.map((patient, index) => {
                      const isSelected = selectedPatient === patient;
                      const dob = patient.DOB || 'No DOB';
                      const phone = patient.Phone || 'No Phone';
                      
                      return (
                        <div
                          key={index}
                          onClick={() => handlePatientSelect(patient)}
                          className={`flex items-center p-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="patient"
                            id={`patient-${index}`}
                            checked={isSelected}
                            onChange={() => handlePatientSelect(patient)}
                            className="mr-3 w-4.5 h-4.5 cursor-pointer"
                          />
                          <label
                            htmlFor={`patient-${index}`}
                            className="flex-1 text-base cursor-pointer"
                          >
                            {patient['Full Name']} - DOB: {dob} - Phone: {phone}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Column: Form and URL */}
          <div className="flex flex-col gap-5">
            {/* Manual Input Form */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-3.5 text-gray-800">
                Patient Information
              </h2>
              
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium text-gray-700 text-sm" htmlFor="patientName">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      placeholder="Enter patient name"
                      className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium text-gray-700 text-sm" htmlFor="dob">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-medium text-gray-700 text-sm" htmlFor="requestingFrom">
                    Requesting From
                  </label>
                  <input
                    type="text"
                    id="requestingFrom"
                    value={formData.requestingFrom}
                    onChange={(e) => handleInputChange('requestingFrom', e.target.value)}
                    placeholder="Who are we requesting the records from?"
                    className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium text-gray-700 text-sm" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter office phone"
                      className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium text-gray-700 text-sm" htmlFor="fax">
                      Fax
                    </label>
                    <input
                      type="tel"
                      id="fax"
                      value={formData.fax}
                      onChange={(e) => handleInputChange('fax', e.target.value)}
                      placeholder="Enter office fax"
                      className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Generated URL Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Generated Fillout URL
              </h2>
              
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 break-all font-mono text-xs mb-3 text-gray-600">
                {generatedUrl}
              </div>
              
              <button
                onClick={handleCopyToClipboard}
                className="px-5 py-2.5 border-none rounded-lg text-base font-medium cursor-pointer transition-all inline-flex items-center gap-2 bg-green-500 text-white hover:bg-green-600"
              >
                <Copy className="w-5 h-5" />
                Copy to Clipboard
              </button>
              
              <span
                className={`inline-block text-green-600 text-sm ml-2.5 transition-opacity duration-300 ${
                  copySuccess ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Copied!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordsRequest;

