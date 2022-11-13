package com.example.server.payload;

import java.time.Instant;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CompletedCustomerRequestRequest {
    

    @NotBlank
    private String title;

    @NotBlank
    private String contents;

    @NotBlank
    private String customerId;

    @NotBlank
    private String requestOriginDatetime;

    @NotBlank
    private String answeredContents;

    @NotBlank
    private String counselorName;

    @NotNull
    private Long counselorId;


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

    public String getRequestOriginDatetime() {
        return requestOriginDatetime;
    }

    public void setRequestOriginDatetime(String requestOriginDatetime) {
        this.requestOriginDatetime = requestOriginDatetime;
    }

    public String getAnsweredContents() {
        return answeredContents;
    }

    public void setAnsweredContents(String answeredContents) {
        this.answeredContents = answeredContents;
    }

    public String getCounselorName() {
        return counselorName;
    }

    public void setCounselorName(String counselorName) {
        this.counselorName = counselorName;
    }

    public Long getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(Long counselorId) {
        this.counselorId = counselorId;
    }    

}
