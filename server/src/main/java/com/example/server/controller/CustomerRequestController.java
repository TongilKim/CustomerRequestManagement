package com.example.server.controller;


import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.example.server.security.CurrentUser;
import com.example.server.security.UserPrincipal;
import com.example.server.service.CustomerRequestService;
import org.springframework.web.bind.annotation.PutMapping;


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
    public ApiResponse getAllCustomerRequests(@RequestParam(value = "customerId") String customerId) {
        List<CustomerRequest> allRequestList = customerRequestService.getAllSpecificCustomerRequests(customerId);
        if(allRequestList.isEmpty()) {
            return new ApiResponse(false, "조회 가능한 목록이 없습니다.", allRequestList);
        } else {
            return new ApiResponse(true, "문의가 성공적으로 접수 되었습니다.", allRequestList);
        }
        
    }

    @DeleteMapping
    public ApiResponse deleteCustomerRequest(@RequestParam(value = "requestId") Long requestId,
                                             @RequestParam(value = "customerId") String customerId) {

         Boolean deleteStatus = customerRequestService.deleteCustomerRequest(requestId);
         if(deleteStatus) {
            List<CustomerRequest> newRequestList = customerRequestService.getAllSpecificCustomerRequests(customerId);
            return new ApiResponse(true, "문의가 성공적으로 삭제 되었습니다.", newRequestList);        
         } else {
            return new ApiResponse(false, "삭제 하려는 데이터가 존재하지 않습니다.");
         }

    }

    @GetMapping("/allRequests")
    public ApiResponse getAllAvailableCustomerRequests() {
        List<CustomerRequest> allCustomerRequests = customerRequestService.getAllCustomerRequests();

        return new ApiResponse(true, "목록이 성공적으로 조회 되었습니다.", allCustomerRequests);
    }

    @PutMapping("/updateRequestSelected")
    public ApiResponse updateRequestSelected(@CurrentUser UserPrincipal currentUser, 
                                             @RequestParam(value = "requestId") Long requestId) {
        
        Boolean updateStatus = customerRequestService.updateCustomerRequestSelected(requestId, currentUser.getUsername(), currentUser.getId());

        if(updateStatus) {
            return new ApiResponse(true, "문의가 성공적으로 본인으로 지정되었습니다.");
        } else {
            return new ApiResponse(false, "이미 지정된 문의 입니다.");
        }
        
    }

}
