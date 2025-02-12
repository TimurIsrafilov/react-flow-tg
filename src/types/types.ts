export type TypeUser = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  position: string;
  grade: number;
  bossId: number | null;
  photo?: string;
};

export type TypeUserTg = {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  language_code: string;
  last_name: string;
  photo_url: string;
  username: string;
};
