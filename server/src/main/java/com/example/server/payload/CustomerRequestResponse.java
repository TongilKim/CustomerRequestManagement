package com.example.server.payload;

public class CustomerRequestResponse {
    private Long id;
    private String title;
    private String contents;
    private String createdBy;
    private String createdDateTime;
    private String pending;

    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
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
    public String getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public String getCreatedDateTime() {
        return createdDateTime;
    }
    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
    public String getPending() {
        return pending;
    }
    public void setPending(String pending) {
        this.pending = pending;
    }

    
}
