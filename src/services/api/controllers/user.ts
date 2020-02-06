import { ApiResponse, ApisauceInstance } from 'apisauce';
import { getGeneralApiProblem } from '../api-problem';
import { ProblemKind, resetPasswordResult, ServerError } from '../types';
import { ParentApi } from './parent-api';

/**
 * Manages all user requests to the API.
 */
export class User extends ParentApi {
  /**
   * Creates the api from the already initiated parent.
   * @param apisauce The apisauce instance.
   * @param logout parent method coming from keycloak
   */
  constructor(apisauce: ApisauceInstance, logout: () => void) {
    super(apisauce, logout);
  }

  /**
   * Resets the current user's password
   */
  async resetPassword(): Promise<resetPasswordResult> {
    // make the api call
    const response: ApiResponse<
      undefined,
      ServerError
    > = await this.apisauce.post(`/reset-password`);
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
