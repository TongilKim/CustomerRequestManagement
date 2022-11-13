package com.example.server.payload;

import java.util.List;

import com.example.server.model.CompletedCustomerRequest;
import com.example.server.model.CustomerRequest;

public class ApiResponse {
    private Boolean success;
    private String message;
    private List<?> resultData;
    
    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public ApiResponse(Boolean success, String message, List<?> resultData) {
        this.success = success;
        this.message = message;
        this.resultData = resultData;
    }
    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<?> getResultData() {
        return resultData;
    }

    public void setResultData(List<?> resultData) {
        this.resultData = resultData;
    }

    
}