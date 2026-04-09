import { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const OutputTabs = ({ rewrittenResume, latexSource }) => {
  const [activeTab, setActiveTab] = useState('rewritten');

  const downloadLatex = () => {
    const blob = new Blob([latexSource], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <div className="border-b flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('rewritten')}
          className={`pb-2 px-1 ${activeTab === 'rewritten' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Rewritten Resume
        </button>
        <button
          onClick={() => setActiveTab('latex')}
          className={`pb-2 px-1 ${activeTab === 'latex' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          LaTeX Source
        </button>
      </div>

      {activeTab === 'rewritten' && (
        <div>
          <div className="flex justify-end mb-2">
            <button
              onClick={() => copyToClipboard(rewrittenResume)}
              className="text-sm text-blue-600 hover:underline"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm">
            {rewrittenResume}
          </div>
        </div>
      )}

      {activeTab === 'latex' && (
        <div>
          <div className="flex justify-end gap-2 mb-2">
            <button
              onClick={() => copyToClipboard(latexSource)}
              className="text-sm text-blue-600 hover:underline"
            >
              Copy
            </button>
            <button
              onClick={downloadLatex}
              className="text-sm text-blue-600 hover:underline"
            >
              Download .tex
            </button>
          </div>
          <SyntaxHighlighter language="latex" style={docco} className="rounded-lg text-sm">
            {latexSource}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default OutputTabs;
