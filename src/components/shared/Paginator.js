import React from 'react';
import { map } from 'lodash/collection';

function Paginator({ total = 5, current, onPageSelected }) {
  const renderInline = total <= 5;

  const Pages = () => (
    <>
      {map(new Array(total), (item, index) => (
        <li key={index}>
          <a
            className={`pagination-link ${
              current === index ? 'is-current' : ''
            }`}
            aria-label="Goto page 1"
            onClick={() => onPageSelected(index)}
          >
            {index + 1}
          </a>
        </li>
      ))}
    </>
  );
  return (
    <nav
      className="pagination mt-3 is-centered"
      role="navigation"
      aria-label="pagination"
    >
      {!renderInline && (
        <>
          <a className="pagination-previous">Previous</a>
          <a className="pagination-next">Next page</a>
        </>
      )}
      <ul className="pagination-list">
        <Pages />
        {/* <li>
          <a className="pagination-link" aria-label="Goto page 1">
            1
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 45">
            45
          </a>
        </li>
        <li>
          <a
            className="pagination-link is-current"
            ariaLabel="Page 46"
            ariaCurrent="page"
          >
            46
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 47">
            47
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 86">
            86
          </a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Paginator;
