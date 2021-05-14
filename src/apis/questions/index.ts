/**
 * 果肉题目相关
 */
import { learnapiRequest, tikuserveRequest } from '../util';
import {
  IAddAnswerSet,
  IChangeQuestionAnswer,
  IDeleteAnswerSet,
  IGetFillQuestionAnswer,
  IGetQuestionAnswerCount,
  IGetQuestionDetails,
  IGetSelectQuestionByPage,
} from './schema';

export interface ApiTypes {
  'GET questions/:questionId': IGetQuestionDetails;
  'GET correct-backstage/stu-answer/count/options': IGetQuestionAnswerCount;
  'POST correct-backstage/modify-answer': IChangeQuestionAnswer;
  'POST correct-backstage/stu-answer/count/blank/paging': IGetSelectQuestionByPage;
  'POST answers/get': IGetFillQuestionAnswer;
  'POST answers/add': IAddAnswerSet;
  'POST answers/delete': IDeleteAnswerSet;
}

export default {
  /** 查询题目详情 */

  getQuestionDetails: (params: IGetQuestionDetails['params'], notificationError = false) =>
    tikuserveRequest('GET questions/:questionId', params, notificationError),

  /** 查询选择题答案详情 */
  getQuestionAnswerCount: (params: IGetQuestionAnswerCount['params']) =>
    learnapiRequest('GET correct-backstage/stu-answer/count/options', params),

  /** 修改题目答案 */
  postChangeQuestionAnswerCount: (params: IChangeQuestionAnswer['params']) =>
    learnapiRequest('POST correct-backstage/modify-answer', params),

  /** 查询填空题答案数量详情 */
  getFillQuestionAnswerCount: (params: IGetSelectQuestionByPage['params']) =>
    learnapiRequest('POST correct-backstage/stu-answer/count/blank/paging', params),

  /** 查询填空题某空答案集 */
  getFillQuestionAnswerSet: (params: IGetFillQuestionAnswer['params']) =>
    tikuserveRequest('POST answers/get', params),

  /** 新增某空答案集 */
  postFillAnswerSet: (params: IAddAnswerSet['params']) =>
    tikuserveRequest('POST answers/add', params),

  /** 删除某空答案集 */
  deleteFillAnswerSet: (params: IDeleteAnswerSet['params']) =>
    tikuserveRequest('POST answers/delete', params),
};
