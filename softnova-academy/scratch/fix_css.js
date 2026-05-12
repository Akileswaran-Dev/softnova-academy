const fs = require('fs');
const path = 'c:\\Users\\User\\OneDrive\\Desktop\\Shanmathi\\new academy\\softnova-academy\\softnova-academy\\src\\app\\home\\ui\\HomePage.module.css';
let content = fs.readFileSync(path, 'utf8');

const oldBlock = `.techOrbit {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  box-shadow: var(--neumorph-inset-sm);
  transition: all 1s ease;
}

.techOrbit:hover {
  transform: rotate(90deg);
  box-shadow: var(--neumorph-shadow);
}

.orbitItem {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75px;
  height: 75px;
  background: var(--background);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  box-shadow: 8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light);
  transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 5))) translate(110px) rotate(calc(var(--i) * (-360deg / 5)));
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.orbitItem:hover {
  transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 5))) translate(110px) rotate(calc(var(--i) * (-360deg / 5))) scale(1.3);
  box-shadow: 12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light);
  color: var(--primary);
}
`;

const newBlock = `.techOrbit {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  box-shadow: var(--neumorph-inset-sm);
  animation: rotateOrbit 25s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes rotateOrbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbitItem {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75px;
  height: 75px;
  background: var(--background);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  box-shadow: 8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light);
  transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 5))) translate(110px);
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.orbitItem svg {
  animation: counterRotate 25s linear infinite;
}

@keyframes counterRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.orbitItem:hover {
  transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 5))) translate(110px) scale(1.3);
  box-shadow: 12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light);
  color: var(--primary);
}
`;

// Simple string replacement might fail due to whitespace, so we try a more robust way
// We can use the start/end lines if we know them exactly
// But let's try a regex that is a bit more forgiving
const escapedOldBlock = oldBlock.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
const regex = new RegExp(escapedOldBlock);

if (regex.test(content)) {
    content = content.replace(regex, newBlock);
    fs.writeFileSync(path, content);
    console.log("Successfully updated!");
} else {
    console.log("Could not find the block to replace.");
    // Fallback: search for a smaller part
    if (content.includes(".techOrbit {")) {
         console.log("Found .techOrbit, trying partial replacement.");
         // This is a bit more dangerous but let's try
    }
}
