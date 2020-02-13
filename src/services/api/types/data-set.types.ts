import { FilterParams, Transcriber } from '../../../types';
import { DataSet } from '../../../types/';
import { GeneralApiProblem } from './api-problem.types';

//////////////
// REQUESTS //
//////////////

export interface PostDataSetRequest {
  name: string;
  filterParams: FilterParams;
}

export interface AssignTranscribersToDataSetRequest {
  transcribers: string[];
}

/////////////
// RESULTS //
/////////////

export type getAllResult =
  | { kind: 'ok'; dataSets: DataSet[] }
  | GeneralApiProblem;

export type postDataSetResult = { kind: 'ok' } | GeneralApiProblem;

export type assignTranscribersToDataSetResult =
  | { kind: 'ok'; transcribers: Transcriber[] }
  | GeneralApiProblem;

export type removeTranscriberFromDataSetResult =
  | { kind: 'ok' }
  | GeneralApiProblem;