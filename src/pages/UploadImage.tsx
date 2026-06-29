import { useState, useEffect } from 'react';
import { MOCK_PROJECTS } from '../data/mockProjects';
import type { ProjectIdea } from '../data/mockProjects';
import { ReuseCard } from '../components/ReuseCard';
import { UploadCloud, Cpu, RefreshCw, Sparkles, CheckCircle2, Info } from 'lucide-react';


interface UploadImageProps {
  savedIdeaIds: string[];
  completedIdeaIds: string[];
  onSaveToggle: (id: string) => void;
  onCompleteToggle: (id: string) => void;
  onShare: (idea: ProjectIdea) => void;
  showNotification: (msg: string, type: 'success' | 'info') => void;
}

// Mock waste objects with custom SVG representations or gradients
const MOCK_SCAN_EXAMPLES = [
  {
    id: 'ex-plastic',
    name: 'Plastic Water Bottle',
    material: 'Plastic Bottle',
    color: 'from-sky-200 to-sky-400 dark:from-sky-900/40 dark:to-sky-700/40',
    icon: '🥛',
    confidence: '99.4%',
    desc: 'Standard 500ml single-use PET beverage container.'
  },
  {
    id: 'ex-jar',
    name: 'Glass Jam Jar',
    material: 'Glass Jar',
    color: 'from-emerald-200 to-teal-400 dark:from-emerald-900/40 dark:to-teal-700/40',
    icon: '🏺',
    confidence: '98.7%',
    desc: 'Empty glass food vessel, highly durable silica construction.'
  },
  {
    id: 'ex-box',
    name: 'Cardboard Box',
    material: 'Cardboard Box',
    color: 'from-amber-200 to-amber-300 dark:from-amber-900/40 dark:to-amber-800/40',
    icon: '📦',
    confidence: '97.9%',
    desc: 'Corrugated kraft paper box, excellent structural integrity.'
  },
  {
    id: 'ex-shirt',
    name: 'Worn Cotton Shirt',
    material: 'Old T-Shirt',
    color: 'from-indigo-200 to-violet-300 dark:from-indigo-900/40 dark:to-violet-800/40',
    icon: '👕',
    confidence: '96.2%',
    desc: '100% natural cotton fiber fabric, worn out at seams.'
  }
];

export const UploadImage: React.FC<UploadImageProps> = ({
  savedIdeaIds,
  completedIdeaIds,
  onSaveToggle,
  onCompleteToggle,
  onShare,
  showNotification
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState<typeof MOCK_SCAN_EXAMPLES[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [scanResults, setScanResults] = useState<{
    objectName: string;
    material: string;
    confidence: string;
    details: string;
  } | null>(null);
  const [suggestedIdeas, setSuggestedIdeas] = useState<ProjectIdea[]>([]);

  // Scanning Stages Simulation
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>, timer2: ReturnType<typeof setTimeout>, timer3: ReturnType<typeof setTimeout>;
    
    if (isScanning) {
      setScanStage('Uploading image to neural node...');
      
      timer1 = setTimeout(() => {
        setScanStage('Detecting object contours & edges...');
      }, 800);

      timer2 = setTimeout(() => {
        setScanStage('Extracting material textures (PET/Cardboard/Glass)...');
      }, 1600);

      timer3 = setTimeout(() => {
        // Complete scan
        const detectedMaterial = selectedExample ? selectedExample.material : 'Plastic Bottle';
        const detectedName = selectedExample ? selectedExample.name : 'Unknown Plastic Container';
        const confidenceVal = selectedExample ? selectedExample.confidence : '91.2%';
        const descVal = selectedExample ? selectedExample.desc : 'Recyclable household container.';

        setScanResults({
          objectName: detectedName,
          material: detectedMaterial,
          confidence: confidenceVal,
          details: descVal
        });

        // Filter mock projects
        const matched = MOCK_PROJECTS.filter(
          p => p.material.toLowerCase() === detectedMaterial.toLowerCase()
        );
        setSuggestedIdeas(matched);
        setIsScanning(false);
        showNotification(`AI successfully identified: ${detectedName}!`, 'success');
      }, 2600);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isScanning, selectedExample]);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerScanner(file);
    }
  };

  const triggerScanner = (file: File) => {
    setSelectedExample(null);
    setScanResults(null);
    setSuggestedIdeas([]);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setIsScanning(true);
    };
    reader.readAsDataURL(file);
  };

  // Handle quick example click
  const handleExampleClick = (example: typeof MOCK_SCAN_EXAMPLES[0]) => {
    setPreviewUrl(null);
    setSelectedExample(example);
    setScanResults(null);
    setSuggestedIdeas([]);
    setIsScanning(true);
  };

  // Drag-and-Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      triggerScanner(file);
    } else {
      showNotification('Please drop a valid image file.', 'info');
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setSelectedExample(null);
    setScanResults(null);
    setSuggestedIdeas([]);
    setIsScanning(false);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-eco-blue-500/10 text-eco-blue-600 dark:text-eco-blue-400">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          AI Waste Vision Scanner
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Upload a photo of your trash, and our advanced object detection model will automatically recognize the item, determine its materials, and offer instant eco-projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SCANNING PORT (Left/Top) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/20 dark:border-slate-800/40 shadow-lg">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Scan Chamber</span>
              {isScanning && <RefreshCw className="w-3.5 h-3.5 text-eco-green-500 animate-spin" />}
            </h3>

            {/* DRAG ZONE / PREVIEW */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative w-full h-72 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-350 ${
                isScanning 
                  ? 'border-eco-green-500/40 bg-slate-50 dark:bg-slate-950/20' 
                  : previewUrl || selectedExample
                    ? 'border-slate-200 dark:border-slate-800'
                    : 'border-slate-300 dark:border-slate-800 hover:border-eco-green-400 dark:hover:border-eco-green-500 bg-white/50 dark:bg-slate-950/15'
              }`}
            >
              {/* Active Scan Laser Line Overlay */}
              {isScanning && (
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_12px_#4ade80] z-20 animate-scan pointer-events-none" />
              )}

              {/* View 1: Drag-and-drop Prompt */}
              {!isScanning && !previewUrl && !selectedExample && (
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-900/50 text-slate-400 border border-slate-200/40 dark:border-slate-800/30">
                    <UploadCloud className="w-8 h-8 text-eco-green-600 dark:text-eco-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Drag & drop waste photo here</p>
                    <p className="text-xs text-slate-400 mt-1">or click to browse files</p>
                  </div>
                </label>
              )}

              {/* View 2: Example selection preview */}
              {selectedExample && (
                <div className={`w-full h-full bg-gradient-to-br ${selectedExample.color} flex flex-col items-center justify-center text-white relative`}>
                  <span className="text-7xl animate-float-medium">{selectedExample.icon}</span>
                  <div className="absolute bottom-4 left-4 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
                    MOCK_IMAGE_SIMULATION.DAT
                  </div>
                </div>
              )}

              {/* View 3: Uploaded preview */}
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Waste preview" 
                  className="w-full h-full object-cover" 
                />
              )}

              {/* Scan Stage overlay when scanning */}
              {isScanning && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white space-y-3 z-10">
                  <Cpu className="w-8 h-8 text-eco-green-400 animate-pulse" />
                  <p className="text-xs font-mono tracking-wide text-eco-green-400">{scanStage}</p>
                </div>
              )}
            </div>

            {/* Control button */}
            {(previewUrl || selectedExample || scanResults) && !isScanning && (
              <button
                onClick={handleReset}
                className="w-full mt-4 inline-flex justify-center items-center gap-1.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350 text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Scan New Object</span>
              </button>
            )}
          </div>

          {/* QUICK EXAMPLES FOR USER TESTING */}
          {!previewUrl && !selectedExample && !isScanning && (
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                Quick-Click Test Mock Objects
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {MOCK_SCAN_EXAMPLES.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => handleExampleClick(ex)}
                    className="glass-card flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl hover:scale-[1.02] text-center sm:text-left border border-white/20 dark:border-slate-800/40"
                  >
                    <span className="text-3xl p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">{ex.icon}</span>
                    <div className="flex flex-col items-center sm:items-start">
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ex.name}</h5>
                      <span className="text-[10px] text-eco-green-600 dark:text-eco-green-400 font-bold font-mono">Confidence: {ex.confidence}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ANALYSIS RESULTS & SUGGESTIONS (Right/Bottom) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Analysis Card */}
          {scanResults ? (
            <div className="glass-panel rounded-3xl p-6 border border-white/20 dark:border-slate-800/40 shadow-lg space-y-5 animate-scaleUp">
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {scanResults.objectName}
                    </h3>
                    <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-200/50 font-mono font-bold">
                      {scanResults.confidence} Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Classified as: {scanResults.material} Category
                  </p>
                </div>
                <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/40 space-y-1">
                  <span className="text-slate-400 font-medium">Description</span>
                  <p className="text-slate-700 dark:text-slate-300 font-bold">{scanResults.details}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/40 space-y-1">
                  <span className="text-slate-400 font-medium">Primary Material</span>
                  <p className="text-slate-700 dark:text-slate-300 font-bold">{scanResults.material}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/15 border border-amber-200/30 text-xs flex gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-amber-800 dark:text-amber-400">Upcycling Feasibility Notes</span>
                  <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                    This material has high structural reuse potential. Ensure the item is thoroughly washed with soapy water and dried before commencing any DIY upcycling assembly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-12 text-center border border-white/20 dark:border-slate-800/40 flex flex-col items-center justify-center h-full min-h-[250px] text-slate-400 space-y-3">
              <UploadCloud className="w-12 h-12 text-slate-300 dark:text-slate-700 animate-pulse-slow" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300">Awaiting Waste Object</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Drag a photo or click one of our mock objects to begin. The AI scanner will analyze the item and reveal suitable eco-friendly upcycling designs.
              </p>
            </div>
          )}

          {/* Suggested Ideas Grid */}
          {scanResults && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-eco-green-600 dark:text-eco-green-400" />
                <h4 className="font-extrabold text-slate-800 dark:text-white">
                  AI Suggested Projects for Scanned Item
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestedIdeas.map((idea) => (
                  <ReuseCard
                    key={idea.id}
                    idea={idea}
                    isSaved={savedIdeaIds.includes(idea.id)}
                    isCompleted={completedIdeaIds.includes(idea.id)}
                    onSaveToggle={() => onSaveToggle(idea.id)}
                    onCompleteToggle={() => onCompleteToggle(idea.id)}
                    onShare={() => onShare(idea)}
                    onViewDetails={() => {
                      // We can alert or show the guide. Let's show details
                      showNotification(`Opening construction blueprint for: ${idea.title}`, 'info');
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
