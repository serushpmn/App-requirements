'use client'

import React, { useState, useEffect } from 'react';
import { Search, HardDrive, Cpu, MemoryStick, Monitor, Disc, CheckCircle, XCircle, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for Windows software and their requirements
// In a real application, this data would come from an API or database.
const softwareData = [
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'Graphic Design',
    versions: [
      {
        version: '2025',
        min: { os: 'Windows 10 (64-bit)', ram: 8, cpu: 'Intel Core i5 (8th Gen) or AMD Ryzen 5', gpu: 'NVIDIA GeForce GTX 1050 (4GB)', disk: 4 },
        recommended: { ram: 16, cpu: 'Intel Core i7 (10th Gen) or AMD Ryzen 7', gpu: 'NVIDIA GeForce RTX 2060 (8GB)' },
      },
      {
        version: '2024',
        min: { os: 'Windows 10 (64-bit)', ram: 8, cpu: 'Intel Core i5 (7th Gen) or AMD Ryzen 5', gpu: 'NVIDIA GeForce GTX 1050 (4GB)', disk: 4 },
        recommended: { ram: 16, cpu: 'Intel Core i7 (9th Gen) or AMD Ryzen 7', gpu: 'NVIDIA GeForce RTX 2060 (8GB)' },
      },
      {
        version: '2021',
        min: { os: 'Windows 10 (64-bit)', ram: 4, cpu: 'Intel Core i3 (4th Gen) or AMD FX-4300', gpu: 'NVIDIA GeForce GTX 750 (2GB)', disk: 3 },
        recommended: { ram: 8, cpu: 'Intel Core i5 (6th Gen) or AMD Ryzen 5', gpu: 'NVIDIA GeForce GTX 1050 (4GB)' },
      },
    ],
  },
  {
    id: 'sketchup',
    name: 'SketchUp Pro',
    category: 'Engineering',
    versions: [
      {
        version: '2025',
        min: { os: 'Windows 10 (64-bit)', ram: 8, cpu: 'Intel Core i5 (8th Gen) or AMD Ryzen 5', gpu: 'NVIDIA GeForce GTX 1050 (4GB)', disk: 2 },
        recommended: { ram: 16, cpu: 'Intel Core i7 (10th Gen) or AMD Ryzen 7', gpu: 'NVIDIA GeForce RTX 2060 (8GB)' },
      },
      {
        version: '2023',
        min: { os: 'Windows 10 (64-bit)', ram: 4, cpu: 'Intel Core i3 (6th Gen) or AMD Ryzen 3', gpu: 'NVIDIA GeForce GTX 750 (2GB)', disk: 1 },
        recommended: { ram: 8, cpu: 'Intel Core i5 (8th Gen) or AMD Ryzen 5', gpu: 'NVIDIA GeForce GTX 1050 (4GB)' },
      },
    ],
  },
  {
    id: 'premierepro',
    name: 'Adobe Premiere Pro',
    category: 'Video Editing',
    versions: [
      {
        version: '2025',
        min: { os: 'Windows 10 (64-bit)', ram: 16, cpu: 'Intel Core i7 (8th Gen) or AMD Ryzen 7', gpu: 'NVIDIA GeForce GTX 1660 (6GB)', disk: 8 },
        recommended: { ram: 32, cpu: 'Intel Core i9 (10th Gen) or AMD Ryzen 9', gpu: 'NVIDIA GeForce RTX 3070 (8GB)' },
      },
      {
        version: '2023',
        min: { os: 'Windows 10 (64-bit)', ram: 8, cpu: 'Intel Core i5 (7th Gen) or AMD Ryzen 5', gpu: 'NVIDIA GeForce GTX 1060 (6GB)', disk: 6 },
        recommended: { ram: 16, cpu: 'Intel Core i7 (9th Gen) or AMD Ryzen 7', gpu: 'NVIDIA GeForce RTX 2060 (8GB)' },
      },
    ],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    category: 'Gaming',
    versions: [
      {
        version: '2.1',
        min: { os: 'Windows 10 (64-bit)', ram: 12, cpu: 'Intel Core i7-6700 or AMD Ryzen 5 1600', gpu: 'NVIDIA GeForce GTX 1060 (6GB) or AMD Radeon RX 580 (8GB)', disk: 70 },
        recommended: { ram: 16, cpu: 'Intel Core i7-12700 or AMD Ryzen 7 7800X3D', gpu: 'NVIDIA GeForce RTX 3070 (8GB) or AMD Radeon RX 6800 XT (16GB)' },
      },
    ],
  },
  {
    id: 'microsoftoffice',
    name: 'Microsoft Office',
    category: 'Office',
    versions: [
      {
        version: '2021',
        min: { os: 'Windows 10', ram: 4, cpu: '1.6 GHz Dual Core', gpu: 'DirectX 9 or later', disk: 4 },
        recommended: { ram: 8, cpu: '2.0 GHz Quad Core' },
      },
    ],
  },
];

// Helper function to parse RAM string (e.g., '8GB' to 8)
const parseRam = (ramStr: any) => {
  if (typeof ramStr === 'number') return ramStr;
  const match = ramStr.match(/(\d+)\s*GB/i);
  return match ? parseInt(match[1], 10) : 0;
};

// Helper function to assign a simplified score to CPU for comparison
const getCpuScore = (cpuStr: string) => {
  if (!cpuStr) return 0;
  const lowerCpu = cpuStr.toLowerCase();
  if (lowerCpu.includes('i9') || lowerCpu.includes('ryzen 9')) return 5;
  if (lowerCpu.includes('i7') || lowerCpu.includes('ryzen 7')) return 4;
  if (lowerCpu.includes('i5') || lowerCpu.includes('ryzen 5')) return 3;
  if (lowerCpu.includes('i3') || lowerCpu.includes('ryzen 3')) return 2;
  return 1; // Basic/older CPUs
};

// Helper function to assign a simplified score to GPU for comparison
const getGpuScore = (gpuStr: string) => {
  if (!gpuStr) return 0;
  const lowerGpu = gpuStr.toLowerCase();
  if (lowerGpu.includes('rtx 40') || lowerGpu.includes('rx 70')) return 5;
  if (lowerGpu.includes('rtx 30') || lowerGpu.includes('rx 60')) return 4;
  if (lowerGpu.includes('rtx 20') || lowerGpu.includes('gtx 16') || lowerGpu.includes('rx 50')) return 3;
  if (lowerGpu.includes('gtx 10') || lowerGpu.includes('rx 40')) return 2;
  return 1; // Older GPUs
};

// Function to estimate performance based on user's specs and software requirements
const estimatePerformance = (userSpecs: any, softwareReqs: any) => {
  if (!userSpecs || !softwareReqs) return { status: 'نامشخص', color: 'text-gray-500' };

  const userRam = parseRam(userSpecs.ram);
  const userCpuScore = getCpuScore(userSpecs.cpu);
  const userGpuScore = getGpuScore(userSpecs.gpu);

  const minRam = parseRam(softwareReqs.min.ram);
  const minCpuScore = getCpuScore(softwareReqs.min.cpu);
  const minGpuScore = getGpuScore(softwareReqs.min.gpu);

  const recommendedRam = parseRam(softwareReqs.recommended?.ram || softwareReqs.min.ram);
  const recommendedCpuScore = getCpuScore(softwareReqs.recommended?.cpu || softwareReqs.min.cpu);
  const recommendedGpuScore = getGpuScore(softwareReqs.recommended?.gpu || softwareReqs.min.gpu);

  let status = 'Unusable'; // Unusable
  let color = 'text-red-600';

  // Check against recommended
  if (userRam >= recommendedRam && userCpuScore >= recommendedCpuScore && userGpuScore >= recommendedGpuScore) {
    status = 'Smooth'; // Smooth
    color = 'text-green-600';
  }
  // Check against minimum
  else if (userRam >= minRam && userCpuScore >= minCpuScore && userGpuScore >= minGpuScore) {
    status = 'Acceptable'; // Acceptable
    color = 'text-emerald-600';
  }
  // Below minimum but might still run (e.g., slightly less RAM)
  else if (userRam >= minRam * 0.75 && userCpuScore >= minCpuScore * 0.75 && userGpuScore >= minGpuScore * 0.75) {
    status = 'Slow'; // Slow
    color = 'text-orange-600';
  }

  return { status, color };
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedSoftware, setExpandedSoftware] = useState<string | null>(null);
  const [selectedSoftwareForComparison, setSelectedSoftwareForComparison] = useState(softwareData[0] || null);
  const [selectedVersionForComparison, setSelectedVersionForComparison] = useState(softwareData[0]?.versions[0] || null);

  const [userSpecs, setUserSpecs] = useState({
    ram: 8,
    cpu: 'Intel Core i5',
    gpu: 'NVIDIA GeForce GTX 1050',
  });

  const [system1Specs, setSystem1Specs] = useState({
    ram: 8,
    cpu: 'Intel Core i5',
    gpu: 'NVIDIA GeForce GTX 1050',
  });

  const [system2Specs, setSystem2Specs] = useState({
    ram: 16,
    cpu: 'Intel Core i7',
    gpu: 'NVIDIA GeForce RTX 2060',
  });

  // Filtered software list based on search term and category
  const filteredSoftware = softwareData.filter(software => {
    const matchesSearch = software.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || software.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(softwareData.map(s => s.category)))];

  // Handle software selection for comparison
  const handleSoftwareSelectForComparison = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const softwareId = e.target.value;
    const software = softwareData.find(s => s.id === softwareId);
    setSelectedSoftwareForComparison(software || null);
    if (software && software.versions.length > 0) {
      setSelectedVersionForComparison(software.versions[0]); // Select the first version by default
    } else {
      setSelectedVersionForComparison(null);
    }
  };

  // Handle version selection for comparison
  const handleVersionSelectForComparison = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const version = e.target.value;
    const selected = selectedSoftwareForComparison?.versions.find(v => v.version === version);
    setSelectedVersionForComparison(selected || null);
  };

  // Ensure selectedVersionForComparison is updated when selectedSoftwareForComparison changes
  useEffect(() => {
    if (selectedSoftwareForComparison && selectedSoftwareForComparison.versions.length > 0) {
      setSelectedVersionForComparison(selectedSoftwareForComparison.versions[0]);
    } else {
      setSelectedVersionForComparison(null);
    }
  }, [selectedSoftwareForComparison]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 font-inter text-slate-800">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 space-y-8 border border-white/20">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Windows Software Performance Comparison Platform
          </h1>
          <p className="text-lg text-slate-600">
            Comprehensive software information and system performance estimation
          </p>
        </header>

        {/* Search and Filter Section */}
        <section className="bg-gradient-to-r from-violet-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-violet-100">
          <h2 className="text-2xl font-bold text-violet-700 mb-4 flex items-center">
            <Search className="mr-2" /> Search and Filter Software
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search for software..."
              className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800 placeholder-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Software List Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-violet-700 mb-4 flex items-center">
            <Info className="mr-2" /> Comprehensive Software Information
          </h2>
          {filteredSoftware.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No software found.</p>
          ) : (
            filteredSoftware.map(software => (
              <div
                key={software.id}
                className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer hover:scale-[1.02]"
                onClick={() => setExpandedSoftware(expandedSoftware === software.id ? null : software.id)}
              >
                <div className="flex justify-between items-center p-4 sm:p-5 bg-gradient-to-r from-violet-50 to-indigo-50">
                  <h3 className="text-xl font-semibold text-violet-700">{software.name}</h3>
                  {expandedSoftware === software.id ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-indigo-600" />}
                </div>
                {expandedSoftware === software.id && (
                  <div className="p-4 sm:p-5 border-t border-slate-200">
                    <h4 className="text-lg font-bold mb-3 text-slate-800">Versions and Requirements:</h4>
                    {software.versions.map((versionInfo, index) => (
                      <div key={index} className="mb-4 last:mb-0 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                        <p className="font-semibold text-md text-violet-700 mb-2">Version: {versionInfo.version}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-slate-700 mb-2">Minimum System Requirements:</p>
                            <ul className="list-disc list-inside space-y-2 text-slate-700">
                              <li><Monitor className="inline w-4 h-4 mr-2 text-indigo-500" /> OS: {versionInfo.min.os}</li>
                              <li><MemoryStick className="inline w-4 h-4 mr-2 text-indigo-500" /> RAM: {versionInfo.min.ram}GB</li>
                              <li><Cpu className="inline w-4 h-4 mr-2 text-indigo-500" /> CPU: {versionInfo.min.cpu}</li>
                              {versionInfo.min.gpu && <li><Monitor className="inline w-4 h-4 mr-2 text-indigo-500" /> GPU: {versionInfo.min.gpu}</li>}
                              <li><Disc className="inline w-4 h-4 mr-2 text-indigo-500" /> Disk Space: {versionInfo.min.disk}GB</li>
                            </ul>
                          </div>
                          {versionInfo.recommended && (
                            <div>
                              <p className="font-medium text-slate-700 mb-2">Recommended System for Better Performance:</p>
                              <ul className="list-disc list-inside space-y-2 text-slate-700">
                                <li><MemoryStick className="inline w-4 h-4 mr-2 text-indigo-500" /> RAM: {versionInfo.recommended.ram}GB</li>
                                <li><Cpu className="inline w-4 h-4 mr-2 text-indigo-500" /> CPU: {versionInfo.recommended.cpu}</li>
                                {versionInfo.recommended.gpu && <li><Monitor className="inline w-4 h-4 mr-2 text-indigo-500" /> GPU: {versionInfo.recommended.gpu}</li>}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </section>

        {/* Hardware Performance Comparison Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-lg border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
            <HardDrive className="mr-2" /> Your Hardware Performance Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="userRam" className="block text-sm font-medium text-slate-700 mb-2">RAM (GB):</label>
              <input
                type="number"
                id="userRam"
                className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                value={userSpecs.ram}
                onChange={(e) => setUserSpecs({ ...userSpecs, ram: parseInt(e.target.value, 10) || 0 })}
              />
            </div>
            <div>
              <label htmlFor="userCpu" className="block text-sm font-medium text-slate-700 mb-2">CPU (e.g., Intel i5):</label>
              <input
                type="text"
                id="userCpu"
                className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                value={userSpecs.cpu}
                onChange={(e) => setUserSpecs({ ...userSpecs, cpu: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="userGpu" className="block text-sm font-medium text-slate-700 mb-2">GPU (e.g., GTX 1650):</label>
              <input
                type="text"
                id="userGpu"
                className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                value={userSpecs.gpu}
                onChange={(e) => setUserSpecs({ ...userSpecs, gpu: e.target.value })}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-3">Estimated Performance for Each Software:</h3>
          <div className="space-y-3">
            {softwareData.map(software => (
              <div key={software.id} className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                <span className="font-semibold text-slate-800">{software.name} ({software.versions[0].version})</span>
                {software.versions[0] && (
                  <div className={`font-bold text-lg ${estimatePerformance(userSpecs, software.versions[0]).color}`}>
                    {estimatePerformance(userSpecs, software.versions[0]).status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* System-to-System Comparison Section */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl shadow-lg border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
            <HardDrive className="mr-2" /> Compare Two Systems for One Software
          </h2>
          <div className="mb-6">
            <label htmlFor="compareSoftware" className="block text-sm font-medium text-slate-700 mb-2">
              Software for comparison:
            </label>
            <select
              id="compareSoftware"
              className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
              value={selectedSoftwareForComparison?.id || ''}
              onChange={handleSoftwareSelectForComparison}
            >
              {softwareData.map(software => (
                <option key={software.id} value={software.id}>{software.name}</option>
              ))}
            </select>
            {selectedSoftwareForComparison && selectedSoftwareForComparison.versions.length > 1 && (
              <div className="mt-4">
                <label htmlFor="compareVersion" className="block text-sm font-medium text-slate-700 mb-2">
                  Software Version:
                </label>
                <select
                  id="compareVersion"
                  className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                  value={selectedVersionForComparison?.version || ''}
                  onChange={handleVersionSelectForComparison}
                >
                  {selectedSoftwareForComparison.versions.map(version => (
                    <option key={version.version} value={version.version}>
                      {version.version}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedVersionForComparison && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System 1 Input */}
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-amber-700 mb-4">System 1</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label htmlFor="sys1Ram" className="block text-sm font-medium text-slate-700 mb-2">RAM (GB):</label>
                    <input
                      type="number"
                      id="sys1Ram"
                      className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                      value={system1Specs.ram}
                      onChange={(e) => setSystem1Specs({ ...system1Specs, ram: parseInt(e.target.value, 10) || 0 })}
                    />
                  </div>
                  <div>
                    <label htmlFor="sys1Cpu" className="block text-sm font-medium text-slate-700 mb-2">CPU:</label>
                    <input
                      type="text"
                      id="sys1Cpu"
                      className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                      value={system1Specs.cpu}
                      onChange={(e) => setSystem1Specs({ ...system1Specs, cpu: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="sys1Gpu" className="block text-sm font-medium text-slate-700 mb-2">GPU:</label>
                    <input
                      type="text"
                      id="sys1Gpu"
                      className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                      value={system1Specs.gpu}
                      onChange={(e) => setSystem1Specs({ ...system1Specs, gpu: e.target.value })}
                    />
                  </div>
                </div>
                <div className={`text-center font-bold text-xl p-3 rounded-xl ${estimatePerformance(system1Specs, selectedVersionForComparison).color} bg-opacity-10`}>
                  {estimatePerformance(system1Specs, selectedVersionForComparison).status}
                </div>
              </div>

              {/* System 2 Input */}
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-amber-700 mb-4">System 2</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label htmlFor="sys2Ram" className="block text-sm font-medium text-slate-700 mb-2">RAM (GB):</label>
                    <input
                      type="number"
                      id="sys2Ram"
                      className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                      value={system2Specs.ram}
                      onChange={(e) => setSystem2Specs({ ...system2Specs, ram: parseInt(e.target.value, 10) || 0 })}
                    />
                  </div>
                  <div>
                    <label htmlFor="sys2Cpu" className="block text-sm font-medium text-slate-700 mb-2">CPU:</label>
                    <input
                      type="text"
                      id="sys2Cpu"
                      className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                      value={system2Specs.cpu}
                      onChange={(e) => setSystem2Specs({ ...system2Specs, cpu: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="sys2Gpu" className="block text-sm font-medium text-slate-700 mb-2">GPU:</label>
                    <input
                      type="text"
                      id="sys2Gpu"
                      className="p-3 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-800"
                      value={system2Specs.gpu}
                      onChange={(e) => setSystem2Specs({ ...system2Specs, gpu: e.target.value })}
                    />
                  </div>
                </div>
                <div className={`text-center font-bold text-xl p-3 rounded-xl ${estimatePerformance(system2Specs, selectedVersionForComparison).color} bg-opacity-10`}>
                  {estimatePerformance(system2Specs, selectedVersionForComparison).status}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-600 text-sm mt-8">
          <p>
            Performance estimates provided are based on sample data and may differ from actual performance.
          </p>
        </footer>
      </div>
    </div>
  );
} 