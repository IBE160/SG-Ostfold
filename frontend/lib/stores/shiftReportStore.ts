
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// --- Types ---

export interface AbsentEmployee {
  id: string;
  name: string;
  code: string;
  hours: number;
}

export interface HiredEmployee {
  id: string;
  name: string;
  shiftFrom: string;
  hours: number;
}

export interface HiredOutEmployee {
  id: string;
  name: string;
  shiftTo: string;
  hours: number;
}

export interface OvertimeEmployee {
  id: string;
  name: string;
  hours: number;
}

interface ShiftReportDraft {
  reportCriteria: {
    date: Date | null;
    shift: string | null;
  };
  staffing: {
    absentEmployees: AbsentEmployee[];
    hiredEmployees: HiredEmployee[];
    hiredOutEmployees: HiredOutEmployee[];
    overtimeEmployees: OvertimeEmployee[];
  };
  orderlines: {
    initialTotal: number | '';
    transitt: number | '';
    heis: number | '';
    hoytlager: number | '';
    osr: number | '';
    ute: number | '';
    rorhall: number | '';
  };
  moves: {
    pallelager: number | '';
    transitt: number | '';
    heis: number | '';
    hoytlager: number | '';
    osr: number | '';
    ute: number | '';
    rorhall: number | '';
  },
  hours: {
    pallelager: number | '';
    transitt: number | '';
    heis: number | '';
    hoytlager: number | '';
    osr: number | '';
    ute: number | '';
    rorhall: number | '';
  },
  efficiency: {
    // This will likely be calculated data, but we can store it
  },
  issues: {
    sampakkScans: number | '';
    sampakkHoursWorked: number | '';
    significantIssues: string;
  }
}

interface ShiftReportState {
  draft: ShiftReportDraft;
  setReportCriteria: (criteria: Partial<ShiftReportDraft['reportCriteria']>) => void;
  // Staffing setters
  setStaffingField: <K extends keyof ShiftReportDraft['staffing']>(field: K, value: ShiftReportDraft['staffing'][K]) => void;
  updateStaffingRow: <T extends { id: string }>(listName: keyof ShiftReportDraft['staffing'], id: string, field: keyof T, value: any) => void;
  addStaffingRow: (listName: keyof ShiftReportDraft['staffing'], defaultRow: Omit<any, 'id'>) => void;
  removeStaffingRow: (listName: keyof ShiftReportDraft['staffing'], id: string) => void;

  setOrderlines: (orderlines: Partial<ShiftReportDraft['orderlines']>) => void;
  setMoves: (moves: Partial<ShiftReportDraft['moves']>) => void;
  setHours: (hours: Partial<ShiftReportDraft['hours']>) => void;
  setIssues: (issues: Partial<ShiftReportDraft['issues']>) => void;
  resetDraft: () => void;
}

const initialDraftState: ShiftReportDraft = {
  reportCriteria: {
    date: new Date(),
    shift: 'evening',
  },
  staffing: {
    absentEmployees: [],
    hiredEmployees: [],
    hiredOutEmployees: [],
    overtimeEmployees: [],
  },
  orderlines: {
    initialTotal: '',
    transitt: '',
    heis: '',
    hoytlager: '',
    osr: '',
    ute: '',
    rorhall: '',
  },
  moves: {
    pallelager: '',
    transitt: '',
    heis: '',
    hoytlager: '',
    osr: '',
    ute: '',
    rorhall: '',
  },
  hours: {
    pallelager: '',
    transitt: '',
    heis: '',
    hoytlager: '',
    osr: '',
    ute: '',
    rorhall: '',
  },
  efficiency: {},
  issues: {
    sampakkScans: '',
    sampakkHoursWorked: '',
    significantIssues: '',
  }
};

export const useShiftReportStore = create<ShiftReportState>((set, get) => ({
  draft: initialDraftState,
  setReportCriteria: (criteria) => set((state) => ({
    draft: { ...state.draft, reportCriteria: { ...state.draft.reportCriteria, ...criteria } }
  })),
  setStaffingField: (field, value) => set(state => ({
    draft: { ...state.draft, staffing: { ...state.draft.staffing, [field]: value } }
  })),
  updateStaffingRow: (listName, id, field, value) => set(state => {
      const list = state.draft.staffing[listName] as Array<{id: string}>;
      const updatedList = list.map(row => (row.id === id ? { ...row, [field]: value } : row));
      return { draft: { ...state.draft, staffing: { ...state.draft.staffing, [listName]: updatedList }}};
  }),
  addStaffingRow: (listName, defaultRow) => set(state => {
      const list = state.draft.staffing[listName] as Array<any>;
      const newRow = { id: uuidv4(), ...defaultRow };
      return { draft: { ...state.draft, staffing: { ...state.draft.staffing, [listName]: [...list, newRow] }}};
  }),
  removeStaffingRow: (listName, id) => set(state => {
      const list = state.draft.staffing[listName] as Array<{id: string}>;
      const updatedList = list.filter(row => row.id !== id);
      return { draft: { ...state.draft, staffing: { ...state.draft.staffing, [listName]: updatedList }}};
  }),
  setOrderlines: (orderlines) => set((state) => ({
    draft: { ...state.draft, orderlines: { ...state.draft.orderlines, ...orderlines } }
  })),
  setMoves: (moves) => set((state) => ({
    draft: { ...state.draft, moves: { ...state.draft.moves, ...moves } }
  })),
  setHours: (hours) => set((state) => ({
    draft: { ...state.draft, hours: { ...state.draft.hours, ...hours } }
  })),
  setIssues: (issues) => set((state) => ({
    draft: { ...state.draft, issues: { ...state.draft.issues, ...issues } }
  })),
  resetDraft: () => set({ draft: initialDraftState }),
}));
