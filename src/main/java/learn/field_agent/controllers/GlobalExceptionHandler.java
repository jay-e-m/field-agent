package learn.field_agent.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.NoSuchElementException;

import learn.field_agent.domain.Result;
import learn.field_agent.domain.ResultType;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleInvalidData(Exception ex) {
        Result<Object> result = new Result<>();
        result.addMessage("Invalid data input.", ResultType.INVALID);
        return ErrorResponse.build(result);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleNotFound(Exception ex) {
        Result<Object> result = new Result<>();
        result.addMessage("Resource not found: " + ex.getMessage(), ResultType.NOT_FOUND);
        return ErrorResponse.build(result);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        Result<Object> result = new Result<>();
        result.addMessage("An unexpected error occurred. Please try again.", ResultType.INVALID);
        return ErrorResponse.build(result);
    }
}
