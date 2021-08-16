import { createRange } from '../../helpers/createRange';
import { getEndPosition, getStartPosition } from '../../helpers/getPagePosition';

import styles from './NavMenu.module.scss';

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

  function previousPageHandler() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function firstPageHandle() {
    setCurrentPage(1);
  }

  function lastPageHandle() {
    setCurrentPage(maxPages);
  }

  function nextPageHandler() {
    if (currentPage < maxPages) setCurrentPage(currentPage + 1);
  }

  function setPageHandler(page: number) {
    setCurrentPage(page);
  }

  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <button onClick={previousPageHandler} disabled={hasPrevious}>
              &lt;
            </button>
          </li>

          <li>
            <button onClick={firstPageHandle} disabled={currentPage === 1}>
              First
            </button>
          </li>

          {range.map((page) => (
            <li key={page}>
              <button
                className={`${currentPage === page ? styles.active : ''}`}
                onClick={() => setPageHandler(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button onClick={lastPageHandle} disabled={currentPage === maxPages}>
              Last
            </button>
          </li>

          <li>
            <button disabled={hasNext} onClick={nextPageHandler}>
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
