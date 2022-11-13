package com.example.server.service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.model.CustomerRequest;
import com.example.server.payload.CustomerRequestRequest;
import com.example.server.repository.CustomerRequestRepository;

@Service
public class CustomerRequestService {
 
    @Autowired
    private CustomerRequestRepository customerRequestRepository;
    
    private static final Logger logger = LoggerFactory.getLogger(CustomerRequestService.class);

    public CustomerRequest createCustomerRequest(CustomerRequestRequest customerRequestRequest) {
        CustomerRequest customerRequest = new CustomerRequest();

        customerRequest.setCustomerId(customerRequestRequest.getCustomerId());
        customerRequest.setContents(customerRequestRequest.getContents());
        customerRequest.setTitle(customerRequestRequest.getTitle());
        customerRequest.setDeleted(false);
        customerRequest.setPending(false);

        Instant now = Instant.now();
        customerRequest.setCreatedDateTime(now);

        return customerRequestRepository.save(customerRequest);
    }

    public List<CustomerRequest> getAllSpecificCustomerRequests(String customerId) {
        
        List<CustomerRequest> customerRequests = customerRequestRepository.findByCustomerId(customerId);

        return customerRequests;
    }
}
