import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import {
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiClipboard,
  FiCode,
  FiFile,
  FiFileText,
  FiFolder,
  FiHash,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from 'react-icons/fi';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

const SUPPORTED_EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'css', 'json', 'md'];
const MAX_FILE_SIZE = 1_500_000;

type SourceFile = {
  name: string;
  size: number;
  lastModified: number;
  extension: string;
  content: string;
};

type SourceInsights = {
  totalLines: number;
  nonEmptyLines: number;
  commentLines: number;
  imports: number;
  exports: number;
  functions: number;
  components: number;
  todos: number;
  longestLine: number;
};

type InsightCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  helper: string;
};

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

function createFileKey(file: Pick<SourceFile, 'name' | 'size' | 'lastModified'>) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function analyzeSource(content: string): SourceInsights {
  const lines = content.split(/\r?\n/);

  const nonEmptyLines = lines.filter((line) => line.trim().length > 0).length;

  const commentLines = lines.filter((line) => /^\s*(\/\/|\/\*|\*|\*\/)/.test(line)).length;

  const imports = lines.filter((line) => /^\\s*import\\s/.test(line)).length;
  const exports = lines.filter((line) => /^\\s*export\\s/.test(line)).length;
  const todos = (content.match(/\b(TODO|FIXME|HACK)\b/gi) ?? []).length;

  const functions = (
    content.match(
      /\bfunction\s+[A-Za-z_$][\w$]*|\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/g,
    ) ?? []
  ).length;

  const components = (
    content.match(
      /\bfunction\s+[A-Z][\w$]*|\b(?:const|let)\s+[A-Z][\w$]*\s*=\s*(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/g,
    ) ?? []
  ).length;

  const longestLine = Math.max(0, ...lines.map((line) => line.length));

  return {
    totalLines: lines.length,
    nonEmptyLines,
    commentLines,
    imports,
    exports,
    functions,
    components,
    todos,
    longestLine,
  };
}

function createReport(sourceFile: SourceFile, insights: SourceInsights) {
  return `# Local Code Notebook

## ${sourceFile.name}

- Формат: .${sourceFile.extension}
- Размер: ${formatBytes(sourceFile.size)}
- Всего строк: ${insights.totalLines}
- Непустых строк: ${insights.nonEmptyLines}
- Строк комментариев: ${insights.commentLines}
- Import: ${insights.imports}
- Export: ${insights.exports}
- Функций: ${insights.functions}
- React-компонентов: ${insights.components}
- TODO / FIXME / HACK: ${insights.todos}
- Самая длинная строка: ${insights.longestLine} символов
`;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();

  document.execCommand('copy');

  textarea.remove();
}

export function LocalCodeNotebook() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [sourceFile, setSourceFile] = useState<SourceFile | null>(null);

  const [notes, setNotes] = useLocalStorage<Record<string, string>>(
    'local-code-notebook-notes',
    {},
  );

  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const insights = useMemo(
    () => (sourceFile ? analyzeSource(sourceFile.content) : null),
    [sourceFile],
  );

  const currentFileKey = sourceFile ? createFileKey(sourceFile) : '';
  const currentNote = currentFileKey ? (notes[currentFileKey] ?? '') : '';

  const displayedLines = useMemo(() => {
    if (!sourceFile) {
      return [];
    }

    const normalizedSearch = searchValue.trim().toLowerCase();

    return sourceFile.content.split(/\r?\n/).map((line, index) => ({
      number: index + 1,
      content: line,
      matches: normalizedSearch ? line.toLowerCase().includes(normalizedSearch) : false,
    }));
  }, [searchValue, sourceFile]);

  function readFile(file: File) {
    const extension = getFileExtension(file.name);

    if (!SUPPORTED_EXTENSIONS.includes(extension)) {
      setFileError(`Поддерживаются: ${SUPPORTED_EXTENSIONS.map((item) => `.${item}`).join(', ')}.`);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Файл больше 1.5 MB. Выбери небольшой исходный файл для быстрого анализа.');
      return;
    }

    void file.text().then((content) => {
      setSourceFile({
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        extension,
        content,
      });

      setSearchValue('');
      setFileError('');
    });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const [file] = Array.from(event.target.files ?? []);

    if (file) {
      readFile(file);
    }

    event.target.value = '';
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsDragging(false);

    const [file] = Array.from(event.dataTransfer.files);

    if (file) {
      readFile(file);
    }
  }

  function clearFile() {
    setSourceFile(null);
    setSearchValue('');
    setFileError('');
  }

  function updateNote(value: string) {
    if (!currentFileKey) {
      return;
    }

    setNotes((currentNotes) => ({
      ...currentNotes,
      [currentFileKey]: value,
    }));
  }

  async function copyReport() {
    if (!sourceFile || !insights) {
      return;
    }

    try {
      await copyText(createReport(sourceFile, insights));

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setFileError('Не удалось скопировать отчёт. Проверь разрешение на доступ к буферу обмена.');
    }
  }

  return (
    <main className="mx-auto max-w-7xl pb-12">
      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.24em] text-blue-300 uppercase">
          Browser file tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Local Code Notebook</h1>

        <p className="leading-7 text-white/60">
          Открой исходный файл прямо из браузера, посмотри его структуру, найди TODO и сохрани
          заметки. Файл не отправляется на сервер и не сохраняется в приложении.
        </p>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-6 xl:sticky xl:top-24">
          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blue-300/10 text-blue-100">
                <FiFolder size={20} />
              </span>

              <div>
                <p className="font-semibold">Открыть файл</p>

                <p className="mt-1 text-xs leading-5 text-white/45">
                  .ts, .tsx, .js, .jsx, .css, .json или .md до 1.5 MB
                </p>
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={SUPPORTED_EXTENSIONS.map((extension) => `.${extension}`).join(',')}
              onChange={handleInputChange}
              className="sr-only"
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`mt-5 grid w-full place-items-center rounded-2xl border border-dashed px-5 py-8 text-center transition ${
                isDragging
                  ? 'border-blue-300/70 bg-blue-300/10'
                  : 'border-white/15 bg-black/20 hover:border-white/30 hover:bg-white/4'
              }`}
            >
              <FiUploadCloud className="text-blue-200" size={27} />

              <span className="mt-3 text-sm font-medium text-white">Выбрать или перетащить</span>

              <span className="mt-1 text-xs text-white/40">
                Файл прочитается только в текущей вкладке
              </span>
            </button>

            {fileError && <p className="mt-4 text-xs leading-5 text-rose-200">{fileError}</p>}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-blue-200" size={18} />
              <p className="font-semibold">Структура файла</p>
            </div>

            {insights ? (
              <dl className="mt-5 space-y-3">
                <MetricRow label="Строк всего" value={insights.totalLines} />
                <MetricRow label="Непустых" value={insights.nonEmptyLines} />
                <MetricRow label="Комментариев" value={insights.commentLines} />
                <MetricRow
                  label="Import / export"
                  value={`${insights.imports} / ${insights.exports}`}
                />
                <MetricRow label="Функций" value={insights.functions} />
                <MetricRow label="Компонентов" value={insights.components} />
                <MetricRow
                  label="TODO / FIXME"
                  value={insights.todos}
                  accent={insights.todos > 0}
                />
                <MetricRow label="Длинная строка" value={`${insights.longestLine} симв.`} />
              </dl>
            ) : (
              <EmptyState
                icon={<FiBarChart2 size={26} />}
                text="Метрики появятся после выбора файла."
              />
            )}
          </section>
        </aside>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black/25 text-blue-100">
                  <FiFile size={18} />
                </span>

                <div className="min-w-0">
                  <p className="wrap-break-word font-medium text-white">
                    {sourceFile?.name ?? 'Файл не выбран'}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {sourceFile
                      ? `.${sourceFile.extension} · ${formatBytes(sourceFile.size)}`
                      : 'Выбери файл слева или перетащи его в зону загрузки'}
                  </p>
                </div>
              </div>

              {sourceFile && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copyReport}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs text-white/75 transition hover:border-white/35 hover:text-white"
                  >
                    {copied ? <FiCheck size={15} /> : <FiClipboard size={15} />}
                    {copied ? 'Скопировано' : 'Копировать отчёт'}
                  </button>

                  <button
                    type="button"
                    onClick={clearFile}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/45 transition hover:bg-white/10 hover:text-rose-100"
                  >
                    <FiX size={16} />
                    Закрыть
                  </button>
                </div>
              )}
            </div>

            {sourceFile ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-5 py-3">
                  <label className="relative block min-w-56 flex-1 sm:max-w-sm">
                    <FiSearch
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/35"
                      size={15}
                    />

                    <input
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      placeholder="Найти в коде…"
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-2 pr-3 pl-9 text-xs text-white outline-hidden transition placeholder:text-white/30 focus:border-blue-300/60"
                    />
                  </label>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-white/50">
                    <FiHash size={13} />
                    {displayedLines.length} строк
                  </span>
                </div>

                <div className="max-h-152.5 overflow-auto bg-[#090909] p-0">
                  <pre className="min-w-max py-4 text-xs leading-6 text-white/75">
                    {displayedLines.map((line) => (
                      <code
                        key={line.number}
                        className={`grid grid-cols-[4rem_minmax(0,1fr)] bg-transparent px-0 py-0 text-inherit ${
                          line.matches ? 'bg-amber-300/12' : ''
                        }`}
                      >
                        <span className="select-none border-r border-white/8 px-4 text-right text-white/28">
                          {line.number}
                        </span>

                        <span className="wrap-break-word px-4 text-inherit">
                          {line.content || ' '}
                        </span>
                      </code>
                    ))}
                  </pre>
                </div>
              </>
            ) : (
              <div className="grid min-h-115 place-items-center p-6">
                <EmptyState
                  icon={<FiCode size={31} />}
                  text="Открой файл, чтобы увидеть нумерованный preview и мини-анализ."
                />
              </div>
            )}
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2">
                <FiFileText className="text-blue-200" size={18} />

                <div>
                  <p className="font-semibold">Заметки к файлу</p>

                  <p className="mt-1 text-xs text-white/45">
                    Сохраняются локально по имени, размеру и дате файла.
                  </p>
                </div>
              </div>

              <textarea
                value={currentNote}
                onChange={(event) => updateNote(event.target.value)}
                disabled={!sourceFile}
                rows={10}
                placeholder="Например: проверить зависимости useEffect, вынести повторяющийся UI в компонент…"
                className="mt-5 w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-7 text-white outline-hidden transition placeholder:text-white/30 focus:border-blue-300/60 disabled:cursor-not-allowed disabled:opacity-40"
              />

              <p className="mt-3 text-xs text-white/40">
                {sourceFile ? `${currentNote.length} символов` : 'Сначала открой файл'}
              </p>
            </section>

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-black/25 shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-semibold">Быстрые подсказки</p>

                <p className="mt-1 text-xs text-white/45">Мини-проверка перед рефакторингом.</p>
              </div>

              {insights ? (
                <div className="space-y-3 p-4">
                  <Hint
                    tone={insights.todos > 0 ? 'warning' : 'success'}
                    text={
                      insights.todos > 0
                        ? `Есть ${insights.todos} отметок TODO / FIXME / HACK.`
                        : 'Явных TODO / FIXME / HACK не найдено.'
                    }
                  />

                  <Hint
                    tone={insights.longestLine > 120 ? 'warning' : 'neutral'}
                    text={
                      insights.longestLine > 120
                        ? `Самая длинная строка — ${insights.longestLine} символов. Возможно, её стоит разбить.`
                        : 'Длина строк выглядит компактно для чтения.'
                    }
                  />

                  <Hint
                    tone={insights.components > 4 ? 'warning' : 'neutral'}
                    text={
                      insights.components > 4
                        ? `В одном файле найдено ${insights.components} компонентов. Проверь, не пора ли разделить модуль.`
                        : 'Количество React-компонентов в файле выглядит умеренным.'
                    }
                  />
                </div>
              ) : (
                <div className="grid min-h-60 place-items-center p-6">
                  <EmptyState
                    icon={<FiBookOpen size={27} />}
                    text="Подсказки появятся после анализа файла."
                  />
                </div>
              )}
            </section>
          </section>
        </div>
      </section>

      {insights && sourceFile && (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            icon={<FiCode size={18} />}
            label="Функции"
            value={insights.functions}
            helper="По простым паттернам объявления"
          />

          <InsightCard
            icon={<FiFileText size={18} />}
            label="Экспорт"
            value={insights.exports}
            helper="Строки, начинающиеся с export"
          />

          <InsightCard
            icon={<FiSearch size={18} />}
            label="Заметки"
            value={currentNote.length}
            helper="Символов в локальной заметке"
          />

          <InsightCard
            icon={<FiTrash2 size={18} />}
            label="Данные файла"
            value="Не хранятся"
            helper="Содержимое исчезнет после обновления"
          />
        </section>
      )}
    </main>
  );
}

function MetricRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-3">
      <dt className="text-sm text-white/45">{label}</dt>

      <dd className={`font-mono text-sm ${accent ? 'text-amber-100' : 'text-white'}`}>{value}</dd>
    </div>
  );
}

function Hint({ text, tone }: { text: string; tone: 'success' | 'warning' | 'neutral' }) {
  const toneClass = {
    success: 'border-emerald-300/25 bg-emerald-300/8 text-emerald-100',
    warning: 'border-amber-300/25 bg-amber-300/8 text-amber-100',
    neutral: 'border-white/10 bg-white/3 text-white/65',
  }[tone];

  return <p className={`rounded-2xl border p-3 text-sm leading-6 ${toneClass}`}>{text}</p>;
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="max-w-xs text-center text-white/45">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/20 text-white/35">
        {icon}
      </div>

      <p className="mt-4 text-sm leading-6">{text}</p>
    </div>
  );
}

function InsightCard({ icon, label, value, helper }: InsightCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div className="text-blue-200">{icon}</div>

      <p className="mt-3 text-xs text-white/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-white/35">{helper}</p>
    </article>
  );
}
