package com.example.server.model;

import java.time.Instant;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name = "completedCustomerRequests")
public class CompletedCustomerRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @NotNull
    private Instant createdDateTime;

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

    public Instant getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Instant createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    
}
