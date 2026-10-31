import { Card, CodeBlock, Typography } from '@/shared/ui';

interface UserProps {
  name: string;
  dev: string;
  countProject: number;
  isActive: boolean;
}

const age = 23;
const name = 'User';
const isDeveloper = false;
const email: string | null = 'frontenddev747@gmail.com';

export function TypeScriptPage() {
  return (
    <Card title="TypeScript" border="2px" maxWidth="2xl">
      <div className="flex justify-center gap-3 border-2 rounded-2xl p-1 max-w-35">
        <Typography text={age} />
      </div>
      <CodeBlock title={name} codeL={email} />
      <CodeBlock title={name} codeL={isDeveloper ? 'Admin' : 'User'} />
      <UserCard name="Ramazan" countProject={5} dev="Frontend" isActive={false} />
    </Card>
  );
}

function UserCard({ name, dev, countProject, isActive }: UserProps) {
  return (
    <>
      <div className="flex justify-center gap-3 border-2 rounded-2xl p-1 max-w-35">
        <Typography text={isActive ? 'Online' : 'Offline'} />
      </div>
      <CodeBlock title={name} codeL={dev} codeR={countProject} />
    </>
  );
}
