package com.example.server.controller;


import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.server.model.CustomerRequest;
import com.example.server.payload.ApiResponse;
import com.example.server.payload.CustomerRequestRequest;
import com.example.server.repository.CustomerRequestRepository;
import com.example.server.service.CustomerRequestService;

@RestController
@RequestMapping("/api/customerRequests")
public class CustomerRequestController {
    
    @Autowired
    private CustomerRequestRepository customerRequestRepository;

    @Autowired
    private CustomerRequestService customerRequestService;
    
    private static final Logger logger = LoggerFactory.getLogger(CustomerRequestController.class);

    @PostMapping
    public ResponseEntity<?> createCustomerRequest(@Valid @RequestBody CustomerRequestRequest customerRequestRequest) {
        CustomerRequest customerRequest = customerRequestService.createCustomerRequest(customerRequestRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{customerId}")
                .buildAndExpand(customerRequest.getCustomerId()).toUri();

                return ResponseEntity.created(location)
                .body(new ApiResponse(true, "문의가 성공적으로 접수 되었습니다."));
    }

    @GetMapping
    public List<CustomerRequest> getAllCustomerRequests(@RequestParam(value = "customerId") String customerId) {
        
        return customerRequestService.getAllSpecificCustomerRequests(customerId);
    }
}
