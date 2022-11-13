package com.example.server.model;

import java.time.Instant;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name = "customerRequests")
public class CustomerRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String contents;

    @NotNull
    private String customerId;

    @Value("")
    private Long counselorId;
    
    @Value("")
    private String counselorName;

    @Value("false")
    private Boolean deleted;

    @Value("false")
    private Boolean pending;

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

    public Long getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(Long counselorId) {
        this.counselorId = counselorId;
    }

    public String getCounselorName() {
        return counselorName;
    }

    public void setCounselorName(String counselorName) {
        this.counselorName = counselorName;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Boolean getPending() {
        return pending;
    }

    public void setPending(Boolean pending) {
        this.pending = pending;
    }

    public Instant getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Instant createdDateTime) {
        this.createdDateTime = createdDateTime;
    }


}
