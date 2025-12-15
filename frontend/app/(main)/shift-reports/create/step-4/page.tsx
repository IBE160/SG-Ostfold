
'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function CreateShiftReportStep4Page() {
  const [pallelagerMoves, setPallelagerMoves] = useState<number | ''>(0);
  const [transittMoves, setTransittMoves] = useState<number | ''>(0);
  const [heisMoves, setHeisMoves] = useState<number | ''>(0);
  const [hoytlagerMoves, setHoytlagerMoves] = useState<number | ''>(0);
  const [osrMoves, setOsrMoves] = useState<number | ''>(0);
  const [uteMoves, setUteMoves] = useState<number | ''>(0);
  const [rorhallMoves, setRorhallMoves] = useState<number | ''>(0);

  const parsedPallelager = typeof pallelagerMoves === 'number' ? pallelagerMoves : parseFloat(pallelagerMoves as string) || 0;
  const parsedTransitt = typeof transittMoves === 'number' ? transittMoves : parseFloat(transittMoves as string) || 0;
  const parsedHeis = typeof heisMoves === 'number' ? heisMoves : parseFloat(heisMoves as string) || 0;
  const parsedHoytlager = typeof hoytlagerMoves === 'number' ? hoytlagerMoves : parseFloat(hoytlagerMoves as string) || 0;
  const parsedOsr = typeof osrMoves === 'number' ? osrMoves : parseFloat(osrMoves as string) || 0;
  const parsedUte = typeof uteMoves === 'number' ? uteMoves : parseFloat(uteMoves as string) || 0;
  const parsedRorhall = typeof rorhallMoves === 'number' ? rorhallMoves : parseFloat(rorhallMoves as string) || 0;

  const totalMovesPerformed = useMemo(() => {
    return parsedPallelager + parsedTransitt + parsedHeis + parsedHoytlager + parsedOsr + parsedUte + parsedRorhall;
  }, [parsedPallelager, parsedTransitt, parsedHeis, parsedHoytlager, parsedOsr, parsedUte, parsedRorhall]);

  return (
    <div className="mx-auto max-w-4xl">
      {/* PageHeading */}
      <div className="flex flex-wrap justify-between gap-3 mb-2">
        <p className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Moves by Area Entry</p>
      </div>
      {/* BodyText */}
      <p className="text-text-secondary-dark text-base font-normal leading-normal mb-8">
        Enter the number of moves performed in each specific area for the current shift. The total will be calculated automatically.
      </p>
      {/* Main Content Card */}
      <div className="bg-content-dark rounded-xl border border-border-dark p-6">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pallelager Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="pallelager-moves">Pallelager Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="pallelager-moves"
                placeholder="0"
                type="number"
                value={pallelagerMoves}
                onChange={(e) => setPallelagerMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            {/* Transitt Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="transitt-moves">Transitt Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="transitt-moves"
                placeholder="0"
                type="number"
                value={transittMoves}
                onChange={(e) => setTransittMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            {/* Heis Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="heis-moves">Heis Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="heis-moves"
                placeholder="0"
                type="number"
                value={heisMoves}
                onChange={(e) => setHeisMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            {/* Høytlager Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="hoytlager-moves">Høytlager Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="hoytlager-moves"
                placeholder="0"
                type="number"
                value={hoytlagerMoves}
                onChange={(e) => setHoytlagerMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            {/* OSR Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="osr-moves">OSR Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="osr-moves"
                placeholder="0"
                type="number"
                value={osrMoves}
                onChange={(e) => setOsrMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            {/* Ute Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="ute-moves">Ute Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="ute-moves"
                placeholder="0"
                type="number"
                value={uteMoves}
                onChange={(e) => setUteMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            {/* Rørhall Moves */}
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="rorhall-moves">Rørhall Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="rorhall-moves"
                placeholder="0"
                type="number"
                value={rorhallMoves}
                onChange={(e) => setRorhallMoves(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
          {/* Divider and Total */}
          <div className="mt-8 pt-6 border-t border-border-dark">
            <div className="flex justify-between items-center">
              <p className="text-text-primary-dark text-lg font-medium">Total Moves Performed</p>
              <p id="total-moves-display" className="text-primary text-3xl font-black">{totalMovesPerformed}</p>
            </div>
          </div>
        </form>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-3"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports/create/step-5"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
