export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type GetDataOptions = {
  sortByTitleLength?: boolean;
};

export async function getData(
  url: string,
  options: GetDataOptions = { sortByTitleLength: true },
): Promise<Todo[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Network response was not ok: ${response.status} ${response.statusText}`,
    );
  }

  const data: Todo[] = await response.json();

  if (options.sortByTitleLength) {
    return data.sort((a, b) => a.title.length - b.title.length);
  }

  return data;
}
