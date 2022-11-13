package com.example.server.service;


import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
        customerRequest.setPending(false);
        customerRequest.setAnswered(false);

        Instant now = Instant.now();
        customerRequest.setCreatedDateTime(now);

        return customerRequestRepository.save(customerRequest);
    }

    public List<CustomerRequest> getAllCustomerRequests() {

        return customerRequestRepository.findAll();
    }

    public List<CustomerRequest> getAllSpecificCustomerRequests(String customerId) {
    
        return customerRequestRepository.findByCustomerId(customerId);
    }
    
    public Boolean deleteCustomerRequest(Long requestId) {
        try {
            customerRequestRepository.deleteById(requestId);
            return true;
        }catch(EmptyResultDataAccessException error) {
            logger.info("삭제 하려는 데이터가 존재하지 않습니다. REQUEST ID = {}", requestId);
            return false;
        }
    }

    public void updateCustomerRequestAnsweredProperty(Long requestId) {
        try {
            CustomerRequest customerRequestToUpdate = customerRequestRepository.findById(requestId).orElse(null);

            if(customerRequestToUpdate != null && customerRequestToUpdate.getPending()) {
                customerRequestToUpdate.setAnswered(true);
                
                customerRequestRepository.save(customerRequestToUpdate);
            } 
            
        } catch(EmptyResultDataAccessException error) {
            logger.info("업데이트 하려는 데이터가 존재하지 않습니다. REQUEST ID = {}", requestId);
        }
    }
    public Boolean updateCustomerRequestSelected(Long requestId, String currentUserName, Long currentUserId) {
        try {
            CustomerRequest customerRequestToUpdate = customerRequestRepository.findById(requestId).orElse(null);
            
            if(customerRequestToUpdate != null && !customerRequestToUpdate.getPending()) {
                customerRequestToUpdate.setPending(true);
                customerRequestToUpdate.setCounselorId(currentUserId);
                customerRequestToUpdate.setCounselorName(currentUserName);
                
                customerRequestRepository.save(customerRequestToUpdate);
                return true;
            } else {
                return false;
            }
            
        }catch(EmptyResultDataAccessException error) {
            logger.info("업데이트 하려는 데이터가 존재하지 않습니다. REQUEST ID = {}", requestId);
            return false;
        }
    }
}
