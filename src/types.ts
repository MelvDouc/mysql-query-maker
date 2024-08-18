// ===== ===== ===== ===== =====
// MAIN
// ===== ===== ===== ===== =====

export type SqlScalar = string | number | boolean | null;
export type SqlRecord = {
  [key: string]: SqlScalar;
};

// ===== ===== ===== ===== =====
// UTILS
// ===== ===== ===== ===== =====

export type StringRecord = {
  [key: string]: string;
};