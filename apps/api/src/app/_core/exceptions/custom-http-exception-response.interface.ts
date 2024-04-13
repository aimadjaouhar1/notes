import { HttpExceptionResponse } from "./http-exception.interface";

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    path: string;
    method: string;
    timestamp: Date;
}