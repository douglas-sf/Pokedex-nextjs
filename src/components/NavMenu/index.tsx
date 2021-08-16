import { createRange } from '../../helpers/createRange';
import { getEndPosition, getStartPosition } from '../../helpers/getPagePosition';

type NavMenuProps = {
  currentPage: number;
  count: number;
  buttons: number;
  limit: number;
  setCurrentPage: (page: number) => void;
};

export function NavMenu({ currentPage, buttons, count, limit, setCurrentPage }: NavMenuProps) {
  const maxPages = Math.ceil(count / limit);

  const hasPrevious = currentPage <= 1;
  const hasNext = currentPage >= maxPages;

  const start = getStartPosition(currentPage, maxPages, buttons);
  const end = getEndPosition(currentPage, maxPages, buttons);

  const range = createRange(start, end);

  function setPageHandler(page: number) {
    setCurrentPage(page);
  }

  function firstPageHandle() {
    setCurrentPage(1);
  }

  return (
    <footer>
      <nav>
        <ul>
          <li>
            <button disabled={hasPrevious}>&lt;&lt;</button>
          </li>

          <li>
            <button onClick={firstPageHandle}>First Page</button>
          </li>

          {range.map((page) => (
            <li key={page}>
              <button onClick={() => setPageHandler(page)}>{page}</button>
            </li>
          ))}

          <li>
            <button>Last Page</button>
          </li>

          <li>
            <button disabled={hasNext}>&gt;&gt;</button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
