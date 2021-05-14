// import { IQuestionDetails } from '@guorou/tiku-hub';

// export * from '@guorou/tiku-hub/lib/type-question';
// export * from '@guorou/tiku-hub/lib/const';

// /** 答案正确或者错误 */
// export enum IsCorrect {
//   /** 错误 */
//   Wrong = 0,
//   /** 正确 */
//   Right = 1,
// }

// /** 获取题目详情 */
// export type IGetQuestionDetails = {
//   params: {
//     questionId: string;
//   };
//   response: IQuestionDetails;
// };

// /** 选择题题目或者填空题返回数据 */
// export type IQuestionCount = { isCorrect: IsCorrect; num: number; value: string };

// /** 获取选择题题目答案数量统计 */
// export type IGetQuestionAnswerCount = {
//   params: {
//     questionId: string;
//   };
//   response: IQuestionCount[];
// };

// export type IBaseQuestionParams = {
//   questionId: string;
//   answerNo?: number;
//   isCorrect: IsCorrect;
//   value: string;
// };

// /** 改判题目 */
// export type IChangeQuestionAnswer = {
//   params: IBaseQuestionParams;
//   response: null;
// };

// export type IFillQuestionParams = {
//   answerNo: number;
//   pageIndex: number;
//   pageSize: number;
//   questionId?: string;
//   showType?: number; // 新增按照正确与错误来选择题目
// };

// /** 填空题数量统计分页查询 */
// export type IGetSelectQuestionByPage = {
//   params: IFillQuestionParams;
//   response: {
//     list: IQuestionCount[];
//     total?: number;
//   };
// };

// export type IGetFillQuestionAnswerReturn = {
//   questionId?: string;
//   answerNo?: number;
//   id?: string;
//   value?: string;
// };

// /** 查询填空题某空的答案集 */
// export type IGetFillQuestionAnswer = {
//   params: IFillQuestionParams;
//   response: IGetFillQuestionAnswerReturn[];
// };

// export type IChangeAnswerSetParams = {
//   answerNo: number;
//   questionId: string;
//   value: string;
// };

// /** 新增填空题某空的答案集 */
// export type IAddAnswerSet = {
//   params: IChangeAnswerSetParams;
//   response: null;
// };

// /** 删除填空题某空的答案集 */
// export type IDeleteAnswerSet = {
//   params: IChangeAnswerSetParams;
//   response: null;
// };
