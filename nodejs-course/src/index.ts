const name = 'Node.js';
const version = 1;

function getInfo(name: string, version: number) {
  return {
    name,
    version,
    environment: 'Backend',
  };
}

const result = getInfo(name, version);

console.log(result);
