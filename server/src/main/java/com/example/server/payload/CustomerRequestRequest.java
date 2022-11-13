package com.example.server.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CustomerRequestRequest {
    
    @NotBlank
    private String title;

    @NotBlank
    private String contents;

    @NotNull
    private String customerId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    
}
