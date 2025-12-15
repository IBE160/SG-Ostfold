'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useShiftReportStore } from '@/lib/stores/shiftReportStore';

export default function CreateShiftReportStep4Page() {
  const { moves, setMoves } = useShiftReportStore(state => ({
    moves: state.draft.moves,
    setMoves: state.setMoves,
  }));

  const handleInputChange = (field: keyof typeof moves, value: string) => {
    setMoves({ [field]: value === '' ? '' : Number(value) });
  };
  
  const parsedPallelager = typeof moves.pallelager === 'number' ? moves.pallelager : parseFloat(moves.pallelager as string) || 0;
  const parsedTransitt = typeof moves.transitt === 'number' ? moves.transitt : parseFloat(moves.transitt as string) || 0;
  const parsedHeis = typeof moves.heis === 'number' ? moves.heis : parseFloat(moves.heis as string) || 0;
  const parsedHoytlager = typeof moves.hoytlager === 'number' ? moves.hoytlager : parseFloat(moves.hoytlager as string) || 0;
  const parsedOsr = typeof moves.osr === 'number' ? moves.osr : parseFloat(moves.osr as string) || 0;
  const parsedUte = typeof moves.ute === 'number' ? moves.ute : parseFloat(moves.ute as string) || 0;
  const parsedRorhall = typeof moves.rorhall === 'number' ? moves.rorhall : parseFloat(moves.rorhall as string) || 0;

  const totalMovesPerformed = useMemo(() => {
    return parsedPallelager + parsedTransitt + parsedHeis + parsedHoytlager + parsedOsr + parsedUte + parsedRorhall;
  }, [parsedPallelager, parsedTransitt, parsedHeis, parsedHoytlager, parsedOsr, parsedUte, parsedRorhall]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap justify-between gap-3 mb-2">
        <p className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Moves by Area Entry</p>
      </div>
      <p className="text-text-secondary-dark text-base font-normal leading-normal mb-8">
        Enter the number of moves performed in each specific area for the current shift. The total will be calculated automatically.
      </p>
      <div className="bg-content-dark rounded-xl border border-border-dark p-6">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="pallelager-moves">Pallelager Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="pallelager-moves"
                placeholder="0"
                type="number"
                value={moves.pallelager}
                onChange={(e) => handleInputChange('pallelager', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="transitt-moves">Transitt Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="transitt-moves"
                placeholder="0"
                type="number"
                value={moves.transitt}
                onChange={(e) => handleInputChange('transitt', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="heis-moves">Heis Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="heis-moves"
                placeholder="0"
                type="number"
                value={moves.heis}
                onChange={(e) => handleInputChange('heis', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="hoytlager-moves">Høytlager Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="hoytlager-moves"
                placeholder="0"
                type="number"
                value={moves.hoytlager}
                onChange={(e) => handleInputChange('hoytlager', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="osr-moves">OSR Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="osr-moves"
                placeholder="0"
                type="number"
                value={moves.osr}
                onChange={(e) => handleInputChange('osr', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="ute-moves">Ute Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="ute-moves"
                placeholder="0"
                type="number"
                value={moves.ute}
                onChange={(e) => handleInputChange('ute', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text-primary-dark text-base font-medium leading-normal pb-2" htmlFor="rorhall-moves">Rørhall Moves</label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                id="rorhall-moves"
                placeholder="0"
                type="number"
                value={moves.rorhall}
                onChange={(e) => handleInputChange('rorhall', e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border-dark">
            <div className="flex justify-between items-center">
              <p className="text-text-primary-dark text-lg font-medium">Total Moves Performed</p>
              <p id="total-moves-display" className="text-primary text-3xl font-black">{totalMovesPerformed}</p>
            </div>
          </div>
        </form>
      </div>
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