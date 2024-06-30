import { Button } from "@mui/material";
import { ChangeEvent, FC, useRef } from "react";

interface ImportButtonProps {
  onFileSelect: (file: File) => void;
}

const ImportButton: FC<ImportButtonProps> = ({ onFileSelect }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (inputFileRef.current !== null) {
      inputFileRef.current.click();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleImportClick}>
        Import
      </Button>
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
