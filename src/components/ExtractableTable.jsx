// GEO — reusable, semantic comparison/data table.
//
// A real <table> with <thead>/<tbody> so AI engines and crawlers can extract
// structured rows cleanly. Used by comparison, industry, and service+location
// pages (problem→solution, A-vs-B, deliverables, etc.).

import React from 'react';

const ExtractableTable = ({ caption, columns = [], rows = [], className = '' }) => {
  if (!columns.length || !rows.length) return null;

  return (
    <div className={`overflow-x-auto liquid-glass rounded-[2rem] border border-white/5 ${className}`}>
      <table className="w-full text-left border-collapse">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="text-red-500 text-[10px] uppercase font-bold tracking-[0.2em] px-5 md:px-7 py-5 align-bottom"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5 last:border-0 align-top">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={
                    ci === 0
                      ? 'text-white text-sm md:text-base font-normal px-5 md:px-7 py-5 w-1/4'
                      : 'text-white/55 text-sm font-light leading-relaxed px-5 md:px-7 py-5'
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExtractableTable;
