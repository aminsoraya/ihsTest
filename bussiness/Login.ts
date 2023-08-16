export interface IToken {
  token: string;
  refreshToken: string;
  userId?: string;
}
export interface ILoginResponse {
  statusCode?: StatusCode;
  statusTitle?: string;
  message?: string;
  data?: string | IToken;
  loading?: boolean;
  mobile?: string;
}

//Actions
interface IActionType extends ILoginResponse {
  type: FormState;
}

export enum FormState {
  Initial,
  Loading,
  Success,
  Error,
}

export enum StatusCode {
  Success = 200,
  WrongMobile = 6,
  WrongCode = 1,
  TimerExpired,
}

export const HandlInitialReducer = (
  state: ILoginResponse,
  action: IActionType
): ILoginResponse => {
  switch (action.type) {
    case FormState.Loading:
      return {
        loading: true,
      };
    case FormState.Success:
    case FormState.Error:
      return {
        loading: false,
        data: action?.data,
        message: action?.message,
        statusCode: action?.statusCode,
        statusTitle: action?.statusTitle,
        mobile: action?.mobile,
      };
    default:
      return {
        loading: false,
      };
  }
};
