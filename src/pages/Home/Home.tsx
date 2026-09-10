import { useToggle } from '@/shared/hooks/useToggle';
import { cn } from '@/shared/lib';
import { fetchUserData } from '@/shared/lib/userData';
import { Box, Button, ErrorUI, LoadingUI } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';

export function Home() {
  const [isClicked, toggleClick] = useToggle(true);
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserData,
  });

  return (
    <>
      {isLoading && <LoadingUI />}
      {isError && <ErrorUI text={error.message} />}
      <Button onClick={() => refetch()} disabled={isLoading} title="Refetch" className="mb-4" />
      <div className="grid grid-cols-2 max-w-2xl">
        {data &&
          data.map((user) => (
            <Box
              size={200}
              tabIndex={0}
              role="button"
              onClick={toggleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleClick();
                }
              }}
              className={cn(
                'cursor-pointer transition-colors duration-300 my-5',
                isClicked ? 'bg-green-500' : 'bg-red-500',
              )}
              text={user.name}
            />
          ))}
      </div>
    </>
  );
}
