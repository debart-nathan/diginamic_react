import { BehaviorSubject } from "rxjs";

class ErrorService {
    private static instance: ErrorService;
    private _errorMessage = new BehaviorSubject<string | null>(null);

    private constructor() {}

    public static getInstance(): ErrorService {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService();
        }
        return ErrorService.instance;
    }

    // Observable string streams
    errorMessage$ = this._errorMessage.asObservable();

    // Service message commands
    setErrorMessage(message: string) {
        this._errorMessage.next(message);
    }
}


export default ErrorService.getInstance();
