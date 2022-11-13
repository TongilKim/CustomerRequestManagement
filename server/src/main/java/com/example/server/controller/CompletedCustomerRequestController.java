package com.example.server.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.server.model.CompletedCustomerRequest;
import com.example.server.payload.ApiResponse;
import com.example.server.payload.CompletedCustomerRequestRequest;
import com.example.server.repository.CompletedCustomerRequestRepository;
import com.example.server.service.CompletedCustomerRequestService;

@RestController
@RequestMapping("/api/completedCustomerRequests")
public class CompletedCustomerRequestController {
    
    @Autowired
    private CompletedCustomerRequestRepository completedCustomerRequestRepository;

    @Autowired
    private CompletedCustomerRequestService completedCustomerRequestService;

    @PostMapping
    public ResponseEntity<?> createCompletedCustomerRequest(@Valid @RequestBody CompletedCustomerRequestRequest completedCustomerRequestRequest) {
        CompletedCustomerRequest completedCustomerRequest = completedCustomerRequestService.createCompletedCustomerRequest(completedCustomerRequestRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{counselorId}")
                .buildAndExpand(completedCustomerRequest.getCounselorId()).toUri();
        
                return ResponseEntity.created(location)
                .body(new ApiResponse(true, "문의가 성공적으로 답변 되었습니다."));
    }
    
}
