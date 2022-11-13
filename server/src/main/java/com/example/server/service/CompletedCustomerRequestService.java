package com.example.server.service;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.model.CompletedCustomerRequest;
import com.example.server.payload.CompletedCustomerRequestRequest;
import com.example.server.repository.CompletedCustomerRequestRepository;

@Service
public class CompletedCustomerRequestService {
    
    @Autowired
    private CompletedCustomerRequestRepository completedCustomerRequestRepository;

    public CompletedCustomerRequest createCompletedCustomerRequest(CompletedCustomerRequestRequest completedCustomerRequestRequest) {
        CompletedCustomerRequest completedCustomerRequest = new CompletedCustomerRequest();

        completedCustomerRequest.setCustomerId(completedCustomerRequestRequest.getCustomerId());
        completedCustomerRequest.setContents(completedCustomerRequestRequest.getContents());
        completedCustomerRequest.setTitle(completedCustomerRequestRequest.getTitle());
        completedCustomerRequest.setRequestOriginDatetime(completedCustomerRequestRequest.getRequestOriginDatetime());
        completedCustomerRequest.setAnsweredContents(completedCustomerRequestRequest.getAnsweredContents());
        completedCustomerRequest.setCounselorId(completedCustomerRequest.getCounselorId());
        completedCustomerRequest.setCounselorName(completedCustomerRequest.getCounselorName());
        
        Instant now = Instant.now();
        completedCustomerRequest.setCreatedDateTime(now);
        
        return completedCustomerRequestRepository.save(completedCustomerRequest);
    }
}
