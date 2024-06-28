import { useRef } from "react";

const ImportButton = ({ onFileSelect }) => {
  const inputFileRef = useRef(null);

  const handleImportClick = () => {
    inputFileRef.current.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <button onClick={handleImportClick}>Import</button>
      <input
        ref={inputFileRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ImportButton;
