export enum UserRole {
  /** 普通教研老师 */
  RegularTeacher = 602,
  /** 产研 */
  Developer = 11,
}

export const rolesMap = {
  /** 人类就能看 */
  human: Array.from({ length: 1000 }).map((e, i) => i),
  /** 所有中台相关人员 */
  all: [UserRole.RegularTeacher, UserRole.Developer],
};
