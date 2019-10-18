import { ApiResponse, ApisauceInstance } from 'apisauce';
import { Project } from '../../../types';
import { getGeneralApiProblem } from '../api-problem';
import {
  deleteProjectResult,
  getProjectResult,
  postProjectResult,
  ProblemKind,
  ProjectRequest,
  ServerError,
  updateProjectResult
} from '../types';

/**
 * Manages all project requests to the API.
 */
export class Projects {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * The logout method from `keycloakContext`.
   * - redirects to the login page
   */
  logout: () => void = () => {};

  /**
   * Creates the api from the already initiated parent.
   *
   * @param apisauce The apisauce instance.
   */
  constructor(apisauce: ApisauceInstance, logout: () => void) {
    this.apisauce = apisauce;
    this.logout = logout;
  }

  /**
   * Gets a list of associated projects
   */
  async getProjects(): Promise<getProjectResult> {
    // make the api call
    const response: ApiResponse<
      Project[],
      ServerError
    > = await this.apisauce.get(`/projects`);
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
      const projects = response.data as Project[];
      return { kind: 'ok', projects };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Deletes a project
   * @param projectId
   */
  async deleteProject(projectId: number): Promise<deleteProjectResult> {
    // make the api call
    const response: ApiResponse<
      undefined,
      ServerError
    > = await this.apisauce.delete(`/projects/${projectId}`);
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
   * Create a new project
   * @param name
   * @param thresholdHc
   * @param thresholdLc
   */
  async postProject(
    name: string,
    thresholdHc: number,
    thresholdLc: number
  ): Promise<postProjectResult> {
    // compile data
    const request: ProjectRequest = {
      name,
      thresholdHc,
      thresholdLc
    };
    // make the api call
    const response: ApiResponse<
      Project,
      ServerError
    > = await this.apisauce.post(`/projects`, request);
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
      const project = response.data as Project;
      return { kind: 'ok', project };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Update an existing project
   * @param name
   * @param thresholdHc
   * @param thresholdLc
   * @param projectId
   */
  async updateProject(
    name: string,
    thresholdHc: number,
    thresholdLc: number,
    projectId: number
  ): Promise<updateProjectResult> {
    // compile data
    const request: ProjectRequest = {
      name,
      thresholdHc,
      thresholdLc
    };
    // make the api call
    const response: ApiResponse<Project, ServerError> = await this.apisauce.put(
      `/projects/${projectId}`,
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
      const project = response.data as Project;
      return { kind: 'ok', project };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Generate a new project secret
   * @param projectId
   */
  async updateSecret(projectId: number): Promise<postProjectResult> {
    // make the api call
    const response: ApiResponse<
      Project,
      ServerError
    > = await this.apisauce.post(`/projects/${projectId}/secret`);
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
      const project = response.data as Project;
      return { kind: 'ok', project };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }
}
