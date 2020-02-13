import { ApisauceInstance } from 'apisauce';
import { DataSet as IDataSet, FilterParams, Transcriber } from '../../../types';
import { getGeneralApiProblem } from '../api-problem';
import { AssignTranscribersToDataSetRequest, assignTranscribersToDataSetResult, getAllResult, PostDataSetRequest, postDataSetResult, ProblemKind, removeTranscriberFromDataSetResult, ServerError } from '../types';
import { ParentApi } from './parent-api';

/**
 * Manages all data set requests to the API.
 */
export class DataSet extends ParentApi {
  /**
   * Creates the api from the already initiated parent.
   * @param apisauce The apisauce instance.
   * @param logout parent method coming from keycloak
   */
  constructor(
    apisauce: ApisauceInstance,
    logout: () => void
  ) {
    super(apisauce, logout);
  }

  /**
   * Gets all data sets
   * @param projectId
   */
  async getAll(projectId: string): Promise<getAllResult> {
    const response = await this.apisauce.get<IDataSet[], ServerError>(
      this.getPathWithOrganization(`/projects/${projectId}/data-sets`)
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          this.logout();
        }
        return problem;
      }
    }
    // transform the data into the format we are expecting
    try {
      const dataSets = response.data as IDataSet[];
      return { kind: 'ok', dataSets };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Creates a new data set
   * @param name
   * @param projectId
   * @param filterParams
   */
  async postDataSet(
    name: string,
    projectId: string,
    filterParams: FilterParams
  ): Promise<postDataSetResult> {
    // build the request
    const request: PostDataSetRequest = {
      name,
      filterParams,
    };
    const response = await this.apisauce.post<undefined, ServerError>(
      this.getPathWithOrganization(`/projects/${projectId}/data-sets`),
      request
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          this.logout();
        }
        return problem;
      }
    }
    return { kind: 'ok' };
  }

  /**
   * Assign transcribers to a data set
   * @param projectId
   * @param dataSetId
   * @param transcriberIds
   */
  async assignTranscribersToDataSet(
    projectId: string,
    dataSetId: string,
    transcriberIds: string[]
  ): Promise<assignTranscribersToDataSetResult> {
    // build the request
    const request: AssignTranscribersToDataSetRequest = {
      transcribers: transcriberIds,
    };
    const response = await this.apisauce.post<Transcriber, ServerError>(
      this.getPathWithOrganization(
        `/projects/${projectId}/data-sets/${dataSetId}`
      ),
      request
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          this.logout();
        }
        return problem;
      }
    }
    // transform the data into the format we are expecting
    try {
      const transcribers = response.data as Transcriber[];
      return { kind: 'ok', transcribers };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Assign transcribers to a data set
   * @param projectId
   * @param dataSetId
   * @param transcriberId
   */
  async removeTranscriberFromDataSet(
    projectId: string,
    dataSetId: string,
    transcriberId: string
  ): Promise<removeTranscriberFromDataSetResult> {
    const response = await this.apisauce.delete<undefined, ServerError>(
      this.getPathWithOrganization(
        `/projects/${projectId}/data-sets/${dataSetId}/transcribers/${transcriberId}`
      )
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          this.logout();
        }
        return problem;
      }
    }
    return { kind: 'ok' };
  }
}