const name = 'John Doe';
const age = 30;
const isDev = true;
const skills = ['React.js', 'TypeScript', 'Node.js'];

function getUserInfo(name: string, age: number, isDev: boolean, skills: string[]) {
  return {
    name,
    age,
    isDev,
    skills,
    environment: 'Backend',
  };
}

console.log(getUserInfo(name, age, isDev, skills));

function getSystemInfo() {
  console.log(process.version);
  console.log(process.platform);
  console.log(process.cwd());
}

getSystemInfo();
