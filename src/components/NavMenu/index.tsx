import { createRange } from '../../helpers/createRange';
import { getEndPosition, getStartPosition } from '../../helpers/getPagePosition';

import { usePagination } from '../../hooks/usePagination';

import styles from './NavMenu.module.scss';

type NavMenuProps = {
  buttons: number;
};

export function NavMenu({ buttons }: NavMenuProps) {
  const { currentPage, maxPages, changePage } = usePagination();

  const hasPrevious = currentPage <= 1;
  const hasNext = currentPage >= maxPages;

  const start = getStartPosition(currentPage, maxPages, buttons);
  const end = getEndPosition(currentPage, maxPages, buttons);

  const range = createRange(start, end);

  async function previousPageHandler() {
    if (currentPage < 1) {
      await changePage(currentPage - 1);
    }
  }

  async function firstPageHandler() {
    await changePage(1);
  }

  async function lastPageHandler() {
    await changePage(maxPages);
  }

  async function nextPageHandler() {
    if (currentPage < maxPages) {
      await changePage(currentPage + 1);
    }
  }

  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <button disabled={hasPrevious} onClick={previousPageHandler}>
              &lt;
            </button>
          </li>

          <li>
            <button disabled={currentPage === 1} onClick={firstPageHandler}>
              First
            </button>
          </li>

          {range.map((page) => (
            <li key={page}>
              <button
                className={`${currentPage === page ? styles.active : ''}`}
                disabled={currentPage === page}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button disabled={currentPage === maxPages} onClick={lastPageHandler}>
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
