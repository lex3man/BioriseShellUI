import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

const CellsAction = () => {
  const [consoleOutput, setConsoleOutput] = useState<string>("");

  const handleClick = async (i: number) => {
    const result: string = await invoke<string>("drive_action", {
      i,
    });
    setConsoleOutput(result);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${4}, 1fr)`,
          gap: 8,
          width: 320,
          margin: "0 auto",
        }}
      >
        {Array.from({ length: 4 * 4 }, (_, i) => (
          <button key={i} onClick={() => handleClick(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <div>
        <p style={{ whiteSpace: 'pre-line' }}>{consoleOutput}</p>
      </div>
    </div>
  )
}

export default CellsAction;

