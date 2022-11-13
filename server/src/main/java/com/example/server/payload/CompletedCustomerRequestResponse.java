package com.example.server.payload;

public class CompletedCustomerRequestResponse {
    private String title;
    private String contents;
    private String customerId;
    private String requestOriginDatetime;
    private String answeredContents;
    private String counselorName;
    private Long counselorId;
    private String createdDateTime;

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

    public String getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
